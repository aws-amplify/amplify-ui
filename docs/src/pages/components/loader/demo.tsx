import * as React from 'react';
import { Loader, LoaderProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { useLoaderProps } from './useLoaderProps';
import { LoaderPropControls } from './LoaderPropControls';
import { demoState } from '@/utils/demoState';

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

const defaultLoaderProps = {};

export const LoaderDemo = () => {
  const props = useLoaderProps(
    demoState.get(Loader.displayName) || defaultLoaderProps
  );

  React.useEffect(() => {
    demoState.set(Loader.displayName, props);
  });

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
