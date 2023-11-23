import * as React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { generateCRA } from './generateCRA';

export default function addHiddenInput(
  form: HTMLFormElement,
  name: string,
  value: string
) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function openStackblitz({ code, title }) {
  const { indexHTML, indexJS, exampleJS, dependencies, devDependencies } =
    generateCRA({ title, code });
  // https://developer.stackblitz.com/docs/platform/post-api/
  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=src/Example.js`;
  addHiddenInput(form, 'project[template]', 'create-react-app');
  addHiddenInput(form, 'project[title]', title);
  addHiddenInput(form, 'project[description]', `# ${title}\n`);
  addHiddenInput(form, 'project[dependencies]', JSON.stringify(dependencies));
  addHiddenInput(
    form,
    'project[devDependencies]',
    JSON.stringify(devDependencies)
  );
  addHiddenInput(form, `project[files][public/index.html]`, indexHTML);
  addHiddenInput(form, `project[files][src/index.js]`, indexJS);
  addHiddenInput(form, `project[files][src/Example.js]`, exampleJS);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export const StackBlitzButton = ({ code, title = 'example', ...rest }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleStackBlitz = () => {
    setIsLoading(true);
    openStackblitz({ code, title });
    setIsLoading(false);
  };

  return (
    <Button
      variation="link"
      {...rest}
      isLoading={isLoading}
      onClick={handleStackBlitz}
    >
      StackBlitz
    </Button>
  );
};
