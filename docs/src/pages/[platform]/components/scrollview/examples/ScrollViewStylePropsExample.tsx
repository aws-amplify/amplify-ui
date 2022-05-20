import { ScrollView, useTheme } from '@aws-amplify/ui-react';

export const ScrollViewStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <ScrollView
      height="100px"
      width="200px"
      backgroundColor={tokens.colors.blue[40]}
    >
      {
        "Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth."
      }
    </ScrollView>
  );
};
