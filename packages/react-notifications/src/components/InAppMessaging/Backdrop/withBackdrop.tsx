import React from 'react';

import { Flex, View } from '@aws-amplify/ui-react';

import { Backdrop } from './Backdrop';
import type { BackdropProps } from './types';

export function withBackdrop<Props>(
  Content: (props: Props) => React.JSX.Element,
  options: BackdropProps = {}
): (props: Props) => React.JSX.Element {
  return function ContentWithBackdrop(props: Props) {
    return (
      <>
        <Backdrop {...options} />
        <Flex className="amplify-inappmessaging-backdrop-content-container">
          <View className="amplify-inappmessaging-backdrop-content">
            <Content {...(props as Props & React.JSX.IntrinsicAttributes)} />
          </View>
        </Flex>
      </>
    );
  };
}
