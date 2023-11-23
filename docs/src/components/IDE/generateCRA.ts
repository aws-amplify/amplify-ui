export function generateCRA({ title, code }) {
  const dependencies = {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    '@aws-amplify/ui-react': 'latest',
    'aws-amplify': 'latest',
  };
  const devDependencies = {
    'react-scripts': 'latest',
  };
  const packageJSON = JSON.stringify(
    {
      name: title,
      private: true,
      version: '0.0.0',
      type: 'module',
      main: 'index.jsx',
      scripts: {
        start: 'react-scripts start',
      },
      dependencies,
      devDependencies,
    },
    null,
    2
  );

  return {
    indexHTML: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap"
  />
</head>
<body>
  <div id="root"></div>
</body>
</html>
`,
    indexJS: `import * as React from 'react';
import ReactDOM from 'react-dom/client'
import '@aws-amplify/ui-react/styles.css'
import Example from './Example'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
)`,
    exampleJS: `import * as React from 'react';\n${code}`,
    packageJSON,
    dependencies,
    devDependencies,
  };
}
