import * as React from 'react';
import { Heading, HeadingLevel } from '@aws-amplify/ui-react';

import { HeadingPropControls } from './HeadingPropControls';
import { Demo } from '@/components/Demo';
import { useHeadingProps } from './useHeadingProps';
import { demoState } from '@/utils/demoState';

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

const defaultHeadingProps = {
  value: 'Heading text',
  level: 6,
};

export const HeadingDemo = () => {
  const { level, setLevel, isTruncated, setIsTruncated, value, setValue } =
    useHeadingProps(demoState.get(Heading.displayName) || defaultHeadingProps);

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
