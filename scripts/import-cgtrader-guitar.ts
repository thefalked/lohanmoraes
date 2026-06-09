/**
 * Import RedGreg "Acoustic guitar PBR Game Ready" from CGTrader:
 * https://www.cgtrader.com/free-3d-models/interior/other/acoustic-guitar-pbr-game-ready
 *
 * 1. Log in on CGTrader → Free download → wait for the zip
 * 2. Place the zip (or extracted folder with .fbx + textures) in:
 *    assets/guitar-cgtrader/source/
 * 3. Run: bun run assets:guitar-cgtrader
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import convert from "fbx2gltf";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "assets/guitar-cgtrader/source");
const outputGlb = join(root, "public/models/acoustic-guitar.glb");
const workDir = join(root, "assets/guitar-cgtrader/.work");

function findFbx(dir: string): string | null {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = findFbx(full);
      if (nested) {
        return nested;
      }
      continue;
    }
    if (entry.isFile() && extname(entry.name).toLowerCase() === ".fbx") {
      return full;
    }
  }
  return null;
}

function extractZip(zipPath: string, dest: string): void {
  const result = spawnSync("unzip", ["-oq", zipPath, "-d", dest], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`Failed to unzip ${zipPath}`);
  }
}

function resolveSourceInput(): string {
  const arg = process.argv[2];
  if (arg) {
    return resolve(arg);
  }
  return sourceDir;
}

async function main(): Promise<void> {
  const input = resolveSourceInput();

  if (!existsSync(input)) {
    mkdirSync(sourceDir, { recursive: true });
    console.error(`
Missing CGTrader source files.

Download the free model (FBX + PBR textures) from:
https://www.cgtrader.com/free-3d-models/interior/other/acoustic-guitar-pbr-game-ready

Then either:
  • Drop the zip or extracted folder into: ${sourceDir}
  • Or run: bun run assets:guitar-cgtrader /path/to/download.zip
`);
    process.exit(1);
  }

  rmSync(workDir, { recursive: true, force: true });
  mkdirSync(workDir, { recursive: true });

  let searchRoot = input;
  if (statSync(input).isFile() && extname(input).toLowerCase() === ".zip") {
    extractZip(input, workDir);
    searchRoot = workDir;
  }

  const fbxPath = findFbx(searchRoot);
  if (!fbxPath) {
    console.error(`
No .fbx found. Download the free model from:
https://www.cgtrader.com/free-3d-models/interior/other/acoustic-guitar-pbr-game-ready

Place the zip or extracted folder in:
  ${sourceDir}
`);
    process.exit(1);
  }

  console.log(`Converting ${fbxPath} → ${outputGlb}`);
  mkdirSync(dirname(outputGlb), { recursive: true });

  const converted = await convert(fbxPath, outputGlb, ["--embed"]);
  console.log(`Wrote ${converted}`);

  rmSync(workDir, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
