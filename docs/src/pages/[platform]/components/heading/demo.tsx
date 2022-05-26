import * as React from 'react';
import { Heading, HeadingLevel } from '@aws-amplify/ui-react';

import { HeadingPropControls } from './HeadingPropControls';
import { Demo } from '@/components/Demo';

const propsToCode = (level: HeadingLevel) => {
  return `<Heading level={${level}}>Heading</Heading>`;
};
export const HeadingDemo = () => {
  const [level, setLevel] = React.useState<HeadingLevel>(6);

  return (
    <Demo
      code={propsToCode(level)}
      propControls={<HeadingPropControls level={level} setLevel={setLevel} />}
    >
      <Heading level={level}>Heading</Heading>
    </Demo>
  );
};
