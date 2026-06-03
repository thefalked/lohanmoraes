import sharp from "sharp";

const LOGO_SOURCE = "imgs/logo.jpeg";
const LOGO_PUBLIC = "public/photos/lohan-logo.png";
const SURFACE = { r: 10, g: 10, b: 10, alpha: 1 };
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const BLACK_THRESHOLD = 25;
const FAVICON_SIZE = 192;

async function loadInvertedLogoPng(): Promise<Buffer> {
  return sharp(LOGO_SOURCE).negate({ alpha: false }).png().toBuffer();
}

async function removeNearBlackBackground(input: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    } else if (luminance < 128) {
      data[i + 3] = Math.round(((luminance - BLACK_THRESHOLD) / (128 - BLACK_THRESHOLD)) * 255);
    } else {
      data[i + 3] = 255;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function main() {
  const invertedLogo = await loadInvertedLogoPng();
  await sharp(await removeNearBlackBackground(invertedLogo)).toFile(LOGO_PUBLIC);

  const meta = await sharp(invertedLogo).metadata();
  const width = meta.width ?? 300;
  const height = meta.height ?? 168;

  async function logoOgImage() {
    const maxW = 920;
    const scale = maxW / width;
    const resized = await sharp(invertedLogo)
      .resize(Math.round(width * scale), Math.round(height * scale))
      .png()
      .toBuffer();

    return sharp({
      create: { width: OG_WIDTH, height: OG_HEIGHT, channels: 4, background: SURFACE },
    })
      .composite([{ input: resized, gravity: "center" }])
      .jpeg({ quality: 88, mozjpeg: true });
  }

  const ogBuffer = await (await logoOgImage()).toBuffer();
  await sharp(ogBuffer).toFile("public/og-image.jpg");

  async function logoOnSquare(size: number, paddingRatio = 0.04) {
    const inner = size * (1 - paddingRatio * 2);
    const scale = Math.min(inner / width, inner / height);
    const resized = await sharp(invertedLogo)
      .resize(Math.round(width * scale), Math.round(height * scale))
      .png()
      .toBuffer();

    return sharp({
      create: { width: size, height: size, channels: 4, background: SURFACE },
    }).composite([{ input: resized, gravity: "center" }]);
  }

  const iconBase = 512;
  const squareBuffer = await (await logoOnSquare(iconBase)).png().toBuffer();

  await sharp(squareBuffer).resize(FAVICON_SIZE, FAVICON_SIZE).png().toFile("public/favicon.png");
  await sharp(squareBuffer).resize(180, 180).png().toFile("public/apple-touch-icon.png");

  console.log(
    "Generated public/photos/lohan-logo.png (transparent), public/favicon.png, public/apple-touch-icon.png, public/og-image.jpg",
  );
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
