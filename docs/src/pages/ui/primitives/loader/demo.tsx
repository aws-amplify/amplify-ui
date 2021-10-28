import * as React from 'react';

import { Flex, Loader } from '@aws-amplify/ui-react';

import { useLoaderProps } from '@/components/useLoaderProps';
import { LoaderPropControls } from '@/components/LoaderPropControls';

export const LoaderDemo = () => {
  const props = useLoaderProps({});
  return (
    <Flex direction="column">
      <LoaderPropControls {...props} />
      <Loader
        size={props.size}
        variation={props.variation}
        emptyColor={props.emptyColor}
        filledColor={props.filledColor}
      />
    </Flex>
  );
};
