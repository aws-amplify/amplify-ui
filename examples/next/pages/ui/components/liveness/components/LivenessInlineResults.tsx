import { View, Flex, Text, Image } from '@aws-amplify/ui-react';
import { Badge, Button } from '@aws-amplify/ui-react';

function truncateNumber(number, digitsAfterDot) {
  const str = `${number}`;
  const truncated = str.slice(0, str.indexOf('.') + digitsAfterDot + 1);
  return Math.max(parseFloat(truncated), 0.0001);
}

export default function LivenessInlineResults({
  getLivenessResponse,
  onUserCancel,
}) {
  const { isLive, confidenceScore, auditImageBytes } = getLivenessResponse;

  const displayScore = truncateNumber(confidenceScore, 4);
  return (
    <>
      <Flex as="span" style={{ whiteSpace: 'nowrap' }}>
        <Text>Liveness result:</Text>
        <Text fontWeight="bold" margin="0 0.5rem">
          {isLive ? 'Check successful' : 'Check unsuccessful'}
        </Text>
      </Flex>

      <Text as="span" style={{ whiteSpace: 'nowrap' }}>
        Confidence score:
        <Badge variation={isLive ? 'success' : 'error'} margin="0 0.5rem">
          {displayScore}
        </Badge>
      </Text>

      <Flex justifyContent="start">
        <Button variation="primary" type="button" onClick={onUserCancel}>
          Try again
        </Button>
      </Flex>

      <Image
        width="100%"
        height="100%"
        src={`data:image/jpeg;base64,${auditImageBytes}`}
        alt="Audit image"
      />
    </>
  );
}
