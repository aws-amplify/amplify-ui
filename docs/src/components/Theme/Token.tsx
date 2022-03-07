import * as React from 'react';
import { Flex, Text, View } from '@aws-amplify/ui-react';

import { TokenPreview } from './TokenPreview';

export const Token = (token) => {
  return (
    <Flex direction="row" className="docs-theme-token">
      <View className="docs-theme-token__preview">
        <TokenPreview {...token} />
      </View>
      <Flex direction="column" className="docs-theme-token__info">
        <Text className="docs-theme-token__name">{token.title}</Text>
        <Text className="docs-theme-token__value">{token.original}</Text>
      </Flex>
    </Flex>
  );
};
