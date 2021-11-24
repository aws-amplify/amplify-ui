import {
  createCanvas,
  Image,
  loadImage,
  NodeCanvasRenderingContext2D,
} from 'canvas';
import fs from 'fs';
import path from 'path';
import { UI_DOCS_REFERENCE } from '../data/links';
import {
  PREVIEW_BACKGROUND_COLOR,
  PREVIEW_HEIGHT,
  PREVIEW_LINK_COLOR,
  PREVIEW_MARGIN,
  PREVIEW_TEXT_COLOR,
  PREVIEW_WIDTH,
} from '../data/preview';
import { getContentPaths } from './getContentPaths';
import { getPageFromSlug } from './getPageFromSlug';
import { getImagePath } from './previews';

type DrawTextOptions = {
  font: string;
  fillStyle: string;
  maxWidth?: number;
  positionX: number;
  positionY: number;
};

export const drawText = (
  context: NodeCanvasRenderingContext2D,
  text: string,
  options: DrawTextOptions
) => {
  const lines = [];
  const maxWidth = options.maxWidth || context.canvas.width;

  context.font = options.font;
  context.fillStyle = options.fillStyle;

  let currentLine = '';

  text.split(' ').forEach((word) => {
    const textMetrics = context.measureText(currentLine + ' ' + word);

    if (textMetrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine + ' ' + word;
    }
  });

  // Add last remaining line
  lines.push(currentLine);

  // Draw lines
  lines.forEach((line, index) => {
    context.fillText(
      line.trim(),
      options.positionX,
      options.positionY + 35 * index
    );
  });
};

export const drawSocialPreview = async (
  title: string,
  description: string | undefined,
  url: string,
  backgroundImage?: Image
) => {
  const canvas = createCanvas(PREVIEW_WIDTH, PREVIEW_HEIGHT);
  const context = canvas.getContext('2d');

  // Paint Preview background
  context.fillStyle = PREVIEW_BACKGROUND_COLOR;
  context.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);

  // Draw Preview background (if provided)
  if (backgroundImage) {
    context.drawImage(backgroundImage, 0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
  }

  // Draw Preview title
  drawText(context, title, {
    positionX: 60,
    positionY: 360,
    font: 'bold 64pt Inter',
    fillStyle: '#000',
    maxWidth: PREVIEW_WIDTH - PREVIEW_MARGIN * 2,
  });

  // Draw Preview description
  if (description) {
    drawText(context, description, {
      positionX: 67,
      positionY: 420,
      font: 'light 20pt Inter',
      fillStyle: PREVIEW_TEXT_COLOR,
      maxWidth: PREVIEW_WIDTH - PREVIEW_MARGIN * 6,
    });
  }

  // Draw Preview URL
  drawText(context, url, {
    positionX: 67,
    positionY: 550,
    font: 'light 20pt Inter',
    fillStyle: PREVIEW_LINK_COLOR,
    maxWidth: PREVIEW_WIDTH - PREVIEW_MARGIN * 2,
  });

  return canvas;
};

const main = async () => {
  const paths = await getContentPaths();
  const pages = await Promise.all(paths.map(getPageFromSlug));

  for (const page of pages) {
    const {
      frontmatter: { title, description, slug },
      href,
    } = page;

    const url = UI_DOCS_REFERENCE + href;

    const backgroundImage = await loadImage('./public/preview-background.png');
    const canvas = await drawSocialPreview(
      title,
      description,
      url,
      backgroundImage
    );

    const buffer = canvas.toBuffer('image/png');
    const imagePath = getImagePath(slug);

    console.info(`Generating social preview: ${slug}`);

    const filePath = path.resolve(__dirname, '../../public' + imagePath);
    await fs.promises.writeFile(filePath, buffer);
  }
};

if (require.main) {
  main();
}
