import stackBlitz from '@stackblitz/sdk';

interface StackBlitzProps {
  title?: string;
  description?: string;
  name?: string;
  text?: string;
}

export const openReactStackBlitz = ({
  title = 'Amplify UI',
  description = 'Amplify UI example',
  name,
  text,
}: StackBlitzProps) => {
  const fileName = `src/${name}.js`;

  stackBlitz.openProject(
    {
      files: {
        [fileName]: `import * as React from 'react';\n${text}`,
        'public/index.html': `<div id="root"></div>`,
        'src/index.js': `import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import { ${name} } from './${name}';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <AmplifyProvider>
      <${name} />
    </AmplifyProvider>
  </StrictMode>
);
`,
      },
      title,
      description,
      template: 'create-react-app',
      dependencies: {
        '@aws-amplify/ui-react': 'latest',
        // 'aws-amplify': 'latest',
        '@fontsource/inter': 'latest',
      },
    },
    {
      openFile: fileName,
    }
  );
};
