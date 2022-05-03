import * as React from 'react';
import { Placeholder, PlaceholderProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { PlaceholderControls } from './PlaceholderControls';
import { usePlaceholderProps } from './usePlaceholderProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props: PlaceholderProps) => {
  return (
    '<Placeholder' +
    (props.size ? ` size="${props.size}"` : '') +
    (props.isLoaded ? ` isLoaded={${props.isLoaded}}` : '') +
    ' />'
  );
};

const defaultPlaceholderProps = {};

export const PlaceholderDemo = () => {
  const placeholderProps = usePlaceholderProps(
    demoState.get(Placeholder.displayName) || defaultPlaceholderProps
  );

  React.useEffect(() => {
    demoState.set(Placeholder.displayName, placeholderProps);
  });

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
