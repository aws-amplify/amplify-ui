#!/usr/bin/env node

const sass = require('sass');
const fs = require('fs-extra');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const result = sass.renderSync({ file: `src/theme/css/styles.scss` });
postcss([autoprefixer])
  .process(result.css, { from: undefined })
  .then((result) => {
    result.warnings().forEach((warn) => {
      console.warn(warn.toString());
    });
    fs.mkdirpSync('dist');
    fs.writeFileSync(`dist/styles.css`, result.css);
  });
