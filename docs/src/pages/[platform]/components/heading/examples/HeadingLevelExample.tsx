import * as React from 'react';
import { Heading } from '@aws-amplify/ui-react';

export const HeadingLevelExample = () => {
  return (
    <>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
      <Heading>Default (level 6)</Heading>
    </>
  );
};
