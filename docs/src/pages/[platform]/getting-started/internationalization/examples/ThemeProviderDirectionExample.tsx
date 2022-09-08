import { Alert, Text, ThemeProvider } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const ThemeProviderDirectionExample = () => {
  return (
    <>
      <ThemeProvider>
        <Alert
          variation="info"
          isDismissible={false}
          hasIcon={true}
          heading="Left to Right"
        >
          <Text>
            This paragraph is in English, so it should go from left to right.
          </Text>
        </Alert>
      </ThemeProvider>
      <ThemeProvider direction="rtl">
        <Alert
          variation="success"
          isDismissible={false}
          hasIcon={true}
          heading="Right to Left"
        >
          <Text>
            هذه الفقرة باللغة العربية ، لذا يجب الانتقال من اليمين إلى اليسار.
          </Text>
        </Alert>
      </ThemeProvider>
    </>
  );
};
