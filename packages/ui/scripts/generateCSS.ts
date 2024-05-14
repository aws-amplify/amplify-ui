import sass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import fs from 'fs-extra';
import { globSync } from 'glob';
import { createTheme } from '../src/theme';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

fs.ensureDirSync('dist/styles');
fs.writeFileSync(
  'dist/theme.css',
  // Note: replacing the default selector with the global variable scope
  // to be in line with what Style Dictionary was building previously
  createTheme().cssText.replace(
    '[data-amplify-theme="default-theme"]',
    CSS_VARIABLE_SCOPE
  )
);

function writeCSS(props: {
  file: string;
  outputPath: string;
  layerName?: string;
}) {
  const { file, outputPath, layerName = 'amplify' } = props;
  const result = sass.renderSync({ file });
  postcss([autoprefixer])
    .process(result.css, { from: undefined })
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });
      fs.writeFileSync(`dist/${outputPath}.css`, result.css);
      fs.writeFileSync(
        `dist/${outputPath}.layer.css`,
        `@layer ${layerName} {\n${result.css}\n}`
      );
    });
}

writeCSS({
  file: `src/theme/css/styles.scss`,
  outputPath: 'styles',
});

writeCSS({
  file: `src/theme/css/reset.scss`,
  outputPath: `styles/reset`,
  layerName: 'amplify.reset',
});

writeCSS({
  file: `src/theme/css/base.scss`,
  outputPath: `styles/base`,
  layerName: 'amplify.base',
});

// get all files ending with .scss in src/theme/component directory using glob
const componentFiles: string[] = globSync('src/theme/css/component/*.scss');

// loop through files and compile each one
for (const file of componentFiles) {
  writeCSS({
    file,
    outputPath: `styles/${file.split('/').pop()?.replace('.scss', '')}`,
    layerName: 'amplify.components',
  });
}

// TODO: handle connected components
// any directory inside css/component should have an index.scss file,
// we will use that for connected component stylesheets
const connectedComponentFiles: string[] = globSync(
  'src/theme/css/component/**/index.scss'
);

for (const file of connectedComponentFiles) {
  writeCSS({
    file,
    outputPath: `styles/${file.replace('/index.scss', '').split('/').pop()}`,
    layerName: 'amplify.components',
  });
}
