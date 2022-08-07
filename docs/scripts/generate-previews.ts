import {
  createCanvas,
  Image,
  loadImage,
  CanvasRenderingContext2D,
  registerFont,
} from 'canvas';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv-safe';
import {
  PREVIEW_BACKGROUND_COLOR,
  PREVIEW_HEIGHT,
  PREVIEW_LINK_COLOR,
  PREVIEW_MARGIN,
  PREVIEW_TEXT_COLOR,
  PREVIEW_WIDTH,
} from '../src/data/preview';
import { getContentPaths } from '../src/utils/getContentPaths';
import { getPageFromSlug } from '../src/utils/getPageFromSlug';
import { getImagePath } from '../src/utils/previews';
import { getAllPaths } from '../src/utils/getAllPaths';
import { FRAMEWORKS } from '../src/data/frameworks';
import { getPagesManifest } from '../src/utils/getPagesManifest';
import { META_INFO } from '../src/data/meta';
import { SITE_NAME } from '../src/data/general';

try {
  registerFont(path.join(__dirname, `../public/fonts/Inter-Regular.otf`), {
    family: 'Inter',
  });

  registerFont(
    path.join(__dirname, `../public/fonts/SourceCodePro-Regular.ttf`),
    {
      family: 'SourceCodePro',
    }
  );
} catch (error) {
  console.log('⚠️ Error loading fonts!');
}

dotenv.config();

type DrawTextOptions = {
  font: string;
  fillStyle: string;
  maxWidth?: number;
  positionX: number;
  positionY: number;
};

export const drawText = (
  context: CanvasRenderingContext2D,
  text: string,
  options: DrawTextOptions
) => {
  const lines = [];
  const maxWidth = options.maxWidth || context.canvas.width;

  context.font = options.font;
  context.fillStyle = options.fillStyle;

  let currentLine = '';
  let textMetrics;

  text.split(' ').forEach((word) => {
    textMetrics = context.measureText(currentLine + ' ' + word);

    if (textMetrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine + ' ' + word;
    }
  });

  const lineHeight =
    (textMetrics.emHeightAscent + textMetrics.emHeightDescent) * 1.25;

  // Add last remaining line
  lines.push(currentLine);
  // Draw lines
  // (only take the first 3 lines and add ellipsis if longer)
  lines.slice(0, 3).forEach((line, index) => {
    context.fillText(
      line.trim() + (index === 2 ? '...' : ''),
      options.positionX,
      options.positionY + lineHeight * index
    );
  });
};

export const drawSocialPreview = async (
  title: string,
  description: string | undefined,
  text?: string,
  backgroundImage?: Image
) => {
  const canvas = createCanvas(PREVIEW_WIDTH, PREVIEW_HEIGHT);
  const context = canvas.getContext('2d');
  title = title === 'Home' ? SITE_NAME : title;

  // Paint Preview background
  context.fillStyle = PREVIEW_BACKGROUND_COLOR;
  context.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);

  // Draw Preview background (if provided)
  if (backgroundImage) {
    context.drawImage(backgroundImage, 0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
  }

  // Draw Preview title
  drawText(context, title, {
    positionX: PREVIEW_MARGIN,
    positionY: 300,
    font: '64pt Inter, Microsoft Sans Serif, sans-serif',
    fillStyle: '#0D1A26',
    maxWidth: PREVIEW_WIDTH - PREVIEW_MARGIN * 2,
  });

  // Draw Preview description
  if (description) {
    drawText(context, description, {
      positionX: PREVIEW_MARGIN,
      positionY: 360,
      font: '24pt Inter, Microsoft Sans Serif, sans-serif',
      fillStyle: PREVIEW_TEXT_COLOR,
      maxWidth: PREVIEW_WIDTH - PREVIEW_MARGIN * 2,
    });
  }

  // Draw Preview URL
  drawText(context, text, {
    positionX: PREVIEW_MARGIN,
    positionY: 520,
    font: '24pt SourceCodePro, mono',
    fillStyle: PREVIEW_LINK_COLOR,
    maxWidth: PREVIEW_WIDTH - PREVIEW_MARGIN * 2,
  });

  return canvas;
};

const writeSocialPreview = async ({
  asHref,
  asSlug,
  allPaths,
  frontmatter,
}) => {
  if (allPaths.includes(asHref)) {
    const imagePath = getImagePath(asSlug);
    const filePath = path.resolve(__dirname, '../public' + imagePath);

    // Special preview images for homepage
    if (FRAMEWORKS.includes(asSlug)) {
      const img = await fs.promises.readFile(
        path.join(__dirname, `../public/${asSlug}-preview.png`)
      );

      fs.promises.writeFile(filePath, img);
    } else {
      const { title, metaTitle, description, metaDescription } = frontmatter;

      let text = process.env.SITE_URL + asHref;

      // For component pages let's do something special
      // in the future we could do a bit more...
      if (asHref.includes('/react/components/')) {
        text = `import { ${title} } from '@aws-amplify/ui-react';`;
      }

      const backgroundImage = await loadImage(
        path.join(__dirname, '../public/preview.png')
      );
      const canvas = await drawSocialPreview(
        metaTitle ?? title,
        metaDescription ?? description,
        text,
        backgroundImage
      );

      const buffer = canvas.toBuffer('image/png');

      console.info(`Generating social preview: ${asSlug}`);
      await fs.promises.writeFile(filePath, buffer);
    }
  }
};

const main = async () => {
  const allPaths = await getAllPaths();
  const manifest = await getPagesManifest(
    getContentPaths,
    getPageFromSlug,
    META_INFO
  );

  Object.entries(manifest).forEach(async ([filepath, manifestVal]) => {
    const { frontmatter, slug } = manifestVal;

    if (filepath.includes('[platform]')) {
      FRAMEWORKS.forEach(async (framework) => {
        const asHref = filepath.replace('[platform]', framework);
        const asSlug = slug.replace('[platform]', framework);
        writeSocialPreview({ asHref, asSlug, allPaths, frontmatter });
      });
    } else {
      writeSocialPreview({
        asHref: filepath,
        asSlug: slug,
        allPaths,
        frontmatter,
      });
    }
  });
};

if (require.main) {
  main();
}
