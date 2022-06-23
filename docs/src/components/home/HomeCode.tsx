import { Card, FlexProps, View } from '@aws-amplify/ui-react';

interface HomeCodeProps extends FlexProps {
  fileName?: string;
  className?: string;
  children: React.ReactNode;
}

export const HomeCode = ({
  fileName,
  className = '',
  children,
  ...rest
}: HomeCodeProps) => (
  <Card className="docs-home-code-card" {...rest}>
    {fileName ? (
      <View className="docs-home-code-card__header">{fileName}</View>
    ) : null}
    <View className={`docs-home-code ${className}`}>{children}</View>
  </Card>
);
