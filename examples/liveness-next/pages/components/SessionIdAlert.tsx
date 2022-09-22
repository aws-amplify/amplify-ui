import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert, Button, Flex, Icon, Text } from '@aws-amplify/ui-react';

export const SessionIdAlert = ({ sessionId }) => {
  return (
    <Alert role="none">
      <Flex alignItems="center">
        <Text color="font.primary">
          SessionId: <strong>{sessionId}</strong>
        </Text>
        <CopyToClipboard text={sessionId} marginLeft="auto">
          <Button size="small">
            <Icon>
              <path
                d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                fill="currentColor"
              ></path>
            </Icon>
          </Button>
        </CopyToClipboard>
      </Flex>
    </Alert>
  );
};
