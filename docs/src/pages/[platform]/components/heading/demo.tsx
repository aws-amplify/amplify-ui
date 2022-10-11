import * as React from 'react';
import { Heading, HeadingLevel, HeadingProps } from '@aws-amplify/ui-react';

import { HeadingPropControls } from './HeadingPropControls';
import { Demo } from '@/components/Demo';

const propsToCode = (
  level: HeadingLevel,
  isTruncated: boolean,
  value: string
) => {
  return `<Heading
  width='30vw'
  level={${level}} ${isTruncated ? `\n  isTruncated={true}` : ''}
>
   ${value}
</Heading>`;
};
export const HeadingDemo = () => {
  const [level, setLevel] = React.useState<HeadingLevel>(6);
  const [isTruncated, setIsTruncated] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('Hello World!');
  return (
    <Demo
      code={propsToCode(level, isTruncated, value)}
      propControls={
        <HeadingPropControls
          level={level}
          setLevel={setLevel}
          isTruncated={isTruncated}
          setIsTruncated={setIsTruncated}
          value={value}
          setValue={setValue}
        />
      }
    >
      <Heading width="30vw" level={level} isTruncated={isTruncated}>
        {value}
      </Heading>
    </Demo>
  );
};
