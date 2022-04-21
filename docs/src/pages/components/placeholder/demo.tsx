import * as React from 'react';
import { Placeholder, PlaceholderProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { PlaceholderControls } from './PlaceholderControls';
import { usePlaceholderProps } from './usePlaceholderProps';

const propsToCode = (props: PlaceholderProps) => {
  return (
    '<Placeholder' +
    (props.size ? ` size="${props.size}"` : '') +
    (props.isLoaded ? ` isLoaded={${props.isLoaded}}` : '') +
    ' />'
  );
};

export const PlaceholderDemo = () => {
  const placeholderProps = usePlaceholderProps({});

  return (
    <Demo
      code={propsToCode(placeholderProps)}
      propControls={<PlaceholderControls {...placeholderProps} />}
    >
      <Placeholder
        isLoaded={placeholderProps.isLoaded}
        size={placeholderProps.size}
      />
    </Demo>
  );
};
