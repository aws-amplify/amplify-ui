import { ScrollView } from '@aws-amplify/ui-react';

export const ScrollViewVerticalExample = () => {
  return (
    <ScrollView height="100px" width="200px" orientation="vertical">
      {`Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's
      Inn Hall. Implacable November weather. As much mud in the streets as if
      the waters had but newly retired from the face of the earth.`}
    </ScrollView>
  );
};
