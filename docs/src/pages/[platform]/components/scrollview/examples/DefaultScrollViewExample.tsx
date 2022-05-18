import { Image, ScrollView } from '@aws-amplify/ui-react';

export const DefaultScrollViewExample = () => {
  return (
    <ScrollView height="300px" width="400px" maxWidth="100%">
      <Image
        width="800px"
        maxWidth="800px"
        src="/amplify-logo.svg"
        alt="Amplify-logo"
      />
    </ScrollView>
  );
};
