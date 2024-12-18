import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { View, Heading, Alert } from '@aws-amplify/ui-react';

export function CustomizationComponents() {
  const [showLiveness, setShowLiveness] = React.useState(false);
  React.useEffect(() => {
    setShowLiveness(true);
  }, []);
  return showLiveness ? (
    <FaceLivenessDetector
      sessionId={'sessionId'}
      region={'us-east-1'}
      onAnalysisComplete={async () => {}}
      components={{
        PhotosensitiveWarning: (): React.JSX.Element => {
          return (
            <Alert
              variation="warning"
              isDismissible={false}
              hasIcon={true}
              heading="Caution"
            >
              This check displays colored lights. Use caution if you are
              photosensitive.
            </Alert>
          );
        },
        ErrorView: ({ children }) => {
          return (
            <View flex="1" backgroundColor="white">
              <Heading color="black">My Custom Error View</Heading>
              {children}
            </View>
          );
        },
      }}
    />
  ) : null;
}
