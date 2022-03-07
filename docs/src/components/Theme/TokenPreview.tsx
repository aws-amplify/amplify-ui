import * as React from 'react';
import { View, useTheme, Icon, Text } from '@aws-amplify/ui-react';

interface TokenPreviewInterface {
  ({ value: string }): JSX.Element;
}

const ColorTokenPreview: TokenPreviewInterface = ({ value }) => (
  <View className="docs-theme-token-preview--color" backgroundColor={value} />
);

const FontSizeTokenPreview: TokenPreviewInterface = ({ value }) => (
  <Text fontSize={value}>Aa</Text>
);

export const TokenPreview = ({
  name,
  path,
  value,
  original,
}: {
  name: string;
  path: string[];
  value: string;
  original: string;
}) => {
  const { tokens } = useTheme();
  if (name.endsWith('color')) {
    return <ColorTokenPreview value={value} />;
  }
  if (name.endsWith('font-size')) {
    return <FontSizeTokenPreview value={value} />;
  }
  if (name.endsWith('font-weight')) {
    return <Text fontWeight={value}>Aa</Text>;
  }
  if (name.endsWith('border-radius')) {
    return (
      <View
        width={tokens.space.xl}
        height={tokens.space.xl}
        borderWidth={tokens.borderWidths.medium}
        borderColor={tokens.colors.border.primary}
        borderStyle="solid"
        borderRadius={value}
      />
    );
  }
  if (name.endsWith('padding-horizontal')) {
    return (
      <View
        width={value}
        height={tokens.borderWidths.medium}
        backgroundColor={tokens.colors.border.primary}
      />
    );
  }
  if (name.endsWith('padding-vertical')) {
    return (
      <View
        height={value}
        width={tokens.borderWidths.medium}
        backgroundColor={tokens.colors.border.primary}
      />
    );
  }
  return null;
};
