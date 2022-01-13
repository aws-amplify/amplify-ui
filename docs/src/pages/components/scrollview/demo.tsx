import { Flex, Image, ScrollView } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { useScrollViewProps } from '@/components/useScrollViewProps';
import { ScrollViewPropControls } from '@/components/ScrollViewPropControls';

export const ScrollViewDemo = () => {
  const scrollViewProps = useScrollViewProps({});
  return (
    <Flex direction="column">
      <ScrollViewPropControls {...scrollViewProps} />
      <Example>
        <Flex justifyContent="center">
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
        </Flex>
      </Example>
    </Flex>
  );
};
