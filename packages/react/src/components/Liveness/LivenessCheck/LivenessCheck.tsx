import * as React from 'react';
import {
  translate,
  LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
} from '@aws-amplify/ui';

import { useTheme } from '../../../hooks';
import { useThemeBreakpoint } from '../../../hooks/useThemeBreakpoint';
import { LivenessCameraModule } from './LivenessCameraModule';
import { useLivenessActor } from '../hooks';
import { CancelButton } from '../shared';
import { Text, Flex, Heading, Divider } from '../../../primitives';

export const LivenessCheck: React.FC = () => {
  const { tokens } = useTheme();
  const breakpoint = useThemeBreakpoint();
  const [state] = useLivenessActor();

  const isMobileScreen = breakpoint === 'base';
  const isPermissionDenied = state.matches('permissionDenied');

  return (
    <Flex direction="column" position="relative">
      {!isMobileScreen && (
        <Heading level={3}>{translate('Liveness check')}</Heading>
      )}
      {!isPermissionDenied ? (
        <LivenessCameraModule isMobileScreen={isMobileScreen} />
      ) : (
        <Flex
          backgroundColor={`${tokens.colors.black}`}
          color={`${tokens.colors.white}`}
          direction="column"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height={480}
        >
          <Text
            color="inherit"
            fontSize={`${tokens.fontSizes.large}`}
            fontWeight={`${tokens.fontWeights.bold}`}
          >
            {translate('No camera detected')}
          </Text>
          <Text color="inherit" maxWidth={300}>
            {translate(
              "Camera access is needed in order to function. Check your browser settings to ensure that you've enabled camera access."
            )}
          </Text>
        </Flex>
      )}
      {!isMobileScreen && (
        <Flex direction="column" alignItems="flex-end">
          <Divider />
          <CancelButton sourceScreen={LIVENESS_EVENT_LIVENESS_CHECK_SCREEN} />
        </Flex>
      )}
    </Flex>
  );
};
