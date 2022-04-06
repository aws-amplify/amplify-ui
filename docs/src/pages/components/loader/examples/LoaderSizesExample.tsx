import { Flex, Loader } from '@aws-amplify/ui-react';

export const LoaderSizesExample = () => {
  return (
    <Flex alignItems="center">
      <Loader size="small" />
      <Loader />
      <Loader size="large" />
    </Flex>
  );
};
