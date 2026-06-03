import { readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const PHOTOS_DIR = "public/photos";
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const PNG_COMPRESSION = 9;
const PHOTO_PNG_TO_JPEG = new Set(["hero-lohan.png", "lohan-performance.png"]);

function resizedPipeline(filePath: string) {
  return sharp(filePath).resize({
    width: MAX_WIDTH,
    fit: "inside",
    withoutEnlargement: true,
  });
}

async function writeTempToTarget(tempPath: string, targetPath: string): Promise<void> {
  await Bun.write(targetPath, await Bun.file(tempPath).arrayBuffer());
  await Bun.file(tempPath).delete();
}

async function compressAsJpeg(filePath: string, base: string): Promise<void> {
  const tempPath = `${filePath}.tmp`;
  const jpegPath = filePath.replace(/\.png$/i, ".jpeg");
  await resizedPipeline(filePath).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tempPath);
  await writeTempToTarget(tempPath, jpegPath);
  if (PHOTO_PNG_TO_JPEG.has(base)) {
    await Bun.file(filePath).delete();
  }
}

async function compressAsPng(filePath: string): Promise<void> {
  const tempPath = `${filePath}.tmp`;
  await resizedPipeline(filePath)
    .png({ compressionLevel: PNG_COMPRESSION })
    .toFile(tempPath);
  await writeTempToTarget(tempPath, filePath);
}

async function compressFile(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath);

  if (ext === ".jpeg" || ext === ".jpg" || PHOTO_PNG_TO_JPEG.has(base)) {
    await compressAsJpeg(filePath, base);
    return;
  }

  if (ext === ".png") {
    await compressAsPng(filePath);
  }
}

async function main() {
  const entries = await readdir(PHOTOS_DIR);
  const targets = entries.filter((name) => /\.(png|jpe?g)$/i.test(name));

  for (const name of targets) {
    const filePath = path.join(PHOTOS_DIR, name);
    await compressFile(filePath);
    const size = (await Bun.file(filePath).size) / 1024;
    console.log(`${name}: ${Math.round(size)} KB`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
