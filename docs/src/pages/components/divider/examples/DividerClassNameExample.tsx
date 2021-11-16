import { Flex, Divider } from '@aws-amplify/ui-react';

const css = `.custom-divider {
  border-style: dashed;
}`;

export const DividerClassNameExample = () => (
  <Flex direction="column">
    <style>{css}</style>
    <Divider className="custom-divider" />
  </Flex>
);
