import * as React from 'react';
import { Loader, LoaderProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { useLoaderProps } from './useLoaderProps';
import { LoaderPropControls } from './LoaderPropControls';

const propsToCode = (props: LoaderProps) => {
  return (
    `<Loader \n` +
    (props.size ? ` size="${props.size}"\n` : '') +
    (props.variation ? ` variation="${props.variation}"\n` : '') +
    (props.emptyColor ? ` emptyColor="${props.emptyColor}"\n` : '') +
    (props.filledColor ? ` filledColor="${props.filledColor}"\n` : '') +
    (props.percentage ? ` percentage={${props.percentage}}\n` : '') +
    (props.isDeterminate ? ` isDeterminate\n` : '') +
    (props.isPercentageTextHidden ? ` isPercentageTextHidden\n` : '') +
    '/>'
  );
};

export const LoaderDemo = () => {
  const props = useLoaderProps({});
  return (
    <Demo
      code={propsToCode(props)}
      propControls={<LoaderPropControls {...props} />}
    >
      <Loader
        // 100% width will cause the percentage text(100%) hidden by code example
        width={props.variation === 'linear' ? '95%' : undefined}
        size={props.size}
        variation={props.variation}
        emptyColor={props.emptyColor}
        filledColor={props.filledColor}
        percentage={props.percentage}
        isDeterminate={props.isDeterminate}
        isPercentageTextHidden={props.isPercentageTextHidden}
      />
    </Demo>
  );
};
