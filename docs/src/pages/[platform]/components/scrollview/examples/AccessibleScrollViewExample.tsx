import { ScrollView, Card } from '@aws-amplify/ui-react';

export const AccessibleScrollViewExample = () => {
  return (
    <ScrollView
      width="400px"
      maxWidth="100%"
      tabIndex={0}
      aria-label="Accessible Scrollview"
    >
      <Card width="600px" backgroundColor="neutral.10">
        This scrollview is keyboard focusable and has an accessible label.
      </Card>
    </ScrollView>
  );
};
