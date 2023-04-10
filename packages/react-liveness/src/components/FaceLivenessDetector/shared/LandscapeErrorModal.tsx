import * as React from 'react';

import { Flex, Button, Text } from '@aws-amplify/ui-react';
import { getLandscapeMediaQuery } from '../utils/device';
interface LandscapeErrorModalProps {
  onRetry: () => void;
  header: string;
  portraitMessage: string;
  landscapeMessage: string;
  tryAgainText: string;
}

export const LandscapeErrorModal: React.FC<LandscapeErrorModalProps> = (
  props
) => {
  const { onRetry, header, portraitMessage, landscapeMessage, tryAgainText } =
    props;
  const [isLandscape, setIsLandscape] = React.useState<boolean | undefined>(
    true
  );

  React.useLayoutEffect(() => {
    // Get orientation: landscape media query
    const landscapeMediaQuery = getLandscapeMediaQuery();

    // Set ui state for initial orientation
    setIsLandscape(landscapeMediaQuery.matches);

    // Listen for future orientation changes
    landscapeMediaQuery.addEventListener('change', (e) => {
      setIsLandscape(e.matches);
    });

    // Remove matchMedia event listener
    return () => {
      landscapeMediaQuery.removeEventListener('change', (e) =>
        setIsLandscape(e.matches)
      );
    };
  }, []);

  return (
    <Flex
      backgroundColor="background.primary"
      direction="column"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={isLandscape ? 'auto' : 480}
    >
      <Text fontSize="large" fontWeight="bold">
        {header}
      </Text>
      <Text>{isLandscape ? landscapeMessage : portraitMessage}</Text>
      {!isLandscape ? (
        <Flex justifyContent="center">
          <Button variation="primary" type="button" onClick={onRetry}>
            {tryAgainText}
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
};
