import { Image, ScrollView, ScrollViewProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { useScrollViewProps } from './useScrollViewProps';
import { ScrollViewPropControls } from './ScrollViewPropControls';

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

export const ScrollViewDemo = () => {
  const scrollViewProps = useScrollViewProps({ orientation: 'horizontal' });
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
