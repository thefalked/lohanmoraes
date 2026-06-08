import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";

const SOURCE_DIRS = ["public/photos", "public/stage"] as const;
const OUTPUT_DIR = "public/cutout";
const CUTOUT_BASENAMES = new Set([
  "hero-lohan",
  "lohan-1819",
  "lohan-3864",
  "lohan-performance",
  "DSC09046",
  "DSC09078",
  "FOTO-LOHAN-2",
]);

const force = process.argv.includes("--force");

async function collectSources(): Promise<string[]> {
  const files: string[] = [];
  for (const dir of SOURCE_DIRS) {
    const entries = await readdir(dir);
    for (const name of entries) {
      if (!/\.jpe?g$/i.test(name)) continue;
      const base = path.basename(name, path.extname(name));
      if (!CUTOUT_BASENAMES.has(base)) continue;
      files.push(path.join(dir, name));
    }
  }
  return files.sort();
}

async function optimizePng(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
}

async function processFile(sourcePath: string): Promise<void> {
  const base = path.basename(sourcePath, path.extname(sourcePath));
  const outputPath = path.join(OUTPUT_DIR, `${base}.png`);

  if (!force && (await Bun.file(outputPath).exists())) {
    console.log(`skip ${base}.png (exists, use --force)`);
    return;
  }

  console.log(`processing ${sourcePath}...`);
  const input = sourcePath;
  const blob = await removeBackground(input, {
    model: "medium",
    output: { format: "image/png" },
  });
  const optimized = await optimizePng(Buffer.from(await blob.arrayBuffer()));
  await Bun.write(outputPath, optimized);
  console.log(`wrote ${outputPath} (${Math.round(optimized.length / 1024)} KB)`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const sources = await collectSources();
  if (sources.length !== CUTOUT_BASENAMES.size) {
    console.warn(`expected ${CUTOUT_BASENAMES.size} sources, found ${sources.length}`);
  }
  for (const source of sources) {
    await processFile(source);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
