import { Card, View } from '@aws-amplify/ui-react';

export const HomeCode = ({ children, props = {} }) => (
  <Card className="docs-home-code-card" {...props}>
    <View className="docs-home-code">{children}</View>
  </Card>
);
