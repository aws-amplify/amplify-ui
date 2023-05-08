import * as React from 'react';
import {
  Badge,
  Card,
  Flex,
  Heading,
  Image,
  Text,
  View,
} from '@aws-amplify/ui-react';

export const GetLivenessResultCard = ({
  getLivenessResponse,
}: {
  getLivenessResponse: {
    isLive: boolean;
    confidenceScore: number;
    auditImageBytes: any;
  };
}) => {
  if (!getLivenessResponse) return null;

  const { isLive, confidenceScore, auditImageBytes } = getLivenessResponse;

  return (
    <Flex margin="1rem 0" alignItems="center" justifyContent="center">
      <Card variation="elevated" padding={0}>
        <Flex direction="row">
          <View width="300px" height="300px">
            <Image
              width="100%"
              height="100%"
              src={`data:image/jpeg;base64,${auditImageBytes}`}
              alt="Audit image"
            />
          </View>

          <Flex direction="column" padding="0.5rem">
            <Heading level={4}>Liveness Results</Heading>

            <Text as="span" style={{ whiteSpace: 'nowrap' }}>
              Confidence Score
              <Badge variation={isLive ? 'success' : 'error'} margin="0 0.5rem">
                {confidenceScore}
              </Badge>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
