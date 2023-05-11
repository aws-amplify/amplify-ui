import React from 'react';

import { Flex, View } from '@aws-amplify/ui-react';

import { Backdrop } from './Backdrop';
import { BackdropProps } from './types';

export function withBackdrop<Props>(
  Content: (props: Props) => JSX.Element,
  options: BackdropProps = {}
): (props: Props) => JSX.Element {
  return function ContentWithBackdrop(props: Props) {
    return (
      <>
        <Backdrop {...options} />
        <Flex className="amplify-inappmessaging-backdrop-content-container">
          <View className="amplify-inappmessaging-backdrop-content">
            <Content {...(props as Props & JSX.IntrinsicAttributes)} />
          </View>
        </Flex>
      </>
    );
  };
}
