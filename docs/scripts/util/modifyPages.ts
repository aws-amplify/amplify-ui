import fs from 'fs';
import path from 'path';
import { globbyStream } from 'globby';

const modifyPages = async () => {
  for await (const filePath of globbyStream(
    path.join(__dirname, '../../src/pages/[platform]/components/**/react.mdx')
  )) {
    const regex = /src\/pages\/\[platform\]\/components\/(\w*)\/react\.mdx/;
    const componentName = (filePath as string).match(regex)[1];
    console.log('🍰', componentName);

    // new file
    fs.writeFile(
      path.join(
        __dirname,
        `../../src/pages/[platform]/components/${componentName}/props-table.mdx`
      ),
      '🐙',
      (err) => {
        if (err) throw err;
        console.log('File is created successfully.');
      }
    );

    // Prepend
    const data = fs.readFileSync(filePath);
    const fd = fs.openSync(filePath, 'w+');
    const insert = Buffer.from(
      `import { Fragment } from '@/components/Fragment'; \n`
    );
    fs.writeSync(fd, insert, 0, insert.length, 0);
    fs.writeSync(fd, data, 0, data.length, insert.length);
    fs.close(fd, (err) => {
      if (err) throw err;
      console.log('Prepend!');
    });

    // Append
    fs.appendFile(
      filePath,
      `

<Fragment>
  {({ platform }) => import('./props-table.mdx')}
</Fragment>

`,
      function (err) {
        if (err) throw err;
        console.log(filePath, 'Saved!');
      }
    );
  }
};

modifyPages();
