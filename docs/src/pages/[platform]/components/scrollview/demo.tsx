import { Image, ScrollView, useTheme } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';

const demoCode = `
<ScrollView width="100%" height="300px" maxWidth="580px">
  <Image
    width="800px"
    maxWidth="800px"
    src="/amplify-logo.svg"
    alt="Amplify-logo"
  />
</ScrollView>`;

export const ScrollViewDemo = () => {
  const {
    tokens: { colors },
  } = useTheme();
  return (
    <Demo code={demoCode}>
      <ScrollView
        width="100%"
        height="300px"
        maxWidth="580px"
        backgroundColor={colors.neutral[10]}
      >
        <Image
          width="800px"
          maxWidth="800px"
          src="/amplify-logo.svg"
          alt="Amplify-logo"
        />
      </ScrollView>
    </Demo>
  );
};
