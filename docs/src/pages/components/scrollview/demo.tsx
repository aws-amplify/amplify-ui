import * as React from 'react';
import { Image, ScrollView, ScrollViewProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { useScrollViewProps } from './useScrollViewProps';
import { ScrollViewPropControls } from './ScrollViewPropControls';
import { demoState } from '@/utils/demoState';

const propsToCode = (props: ScrollViewProps) => {
  return `<ScrollView
  orientation="${props.orientation}"
  height="300px"
  width="400px"
>
  <Image
    width="800px"
    maxWidth="800px"
    src="/amplify-logo.svg"
    alt="Amplify-logo"
  />
</ScrollView>`;
};

const defaultScrollViewProps = { orientation: 'horizontal' };

export const ScrollViewDemo = () => {
  const scrollViewProps = useScrollViewProps(
    demoState.get(ScrollView.displayName) || defaultScrollViewProps
  );

  React.useEffect(() => {
    demoState.set(ScrollView.displayName, scrollViewProps);
  });

  return (
    <Demo
      code={propsToCode(scrollViewProps)}
      propControls={<ScrollViewPropControls {...scrollViewProps} />}
    >
      <ScrollView
        orientation={scrollViewProps.orientation}
        height="300px"
        width="400px"
      >
        <Image
          width="800px"
          maxWidth="800px"
          src="/amplify-logo.svg"
          alt="Amplify-logo"
        />
      </ScrollView>
    </Demo>
  );
};
