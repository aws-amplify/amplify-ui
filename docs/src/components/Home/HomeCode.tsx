import { Card, View } from '@aws-amplify/ui-react';

export const HomeCode = ({ className = '', children, ...rest }) => (
  <Card className="docs-home-code-card" {...rest}>
    <View className={`docs-home-code ${className}`}>{children}</View>
  </Card>
);
