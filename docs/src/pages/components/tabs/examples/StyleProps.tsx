import { Tabs, TabItem, useTheme } from '@aws-amplify/ui-react';

export const StyleProps = () => {
  const { tokens } = useTheme();
  return (
    <Tabs backgroundColor={tokens.colors.neutral[10]}>
      <TabItem
        title="Tab 1"
        color={tokens.colors.font.secondary}
        backgroundColor="transparent"
      >
        Content of Tab 1
      </TabItem>
      <TabItem
        title="Tab 2"
        color={tokens.colors.brand.secondary[60]}
        backgroundColor="transparent"
      >
        Content of Tab 2
      </TabItem>
    </Tabs>
  );
};
