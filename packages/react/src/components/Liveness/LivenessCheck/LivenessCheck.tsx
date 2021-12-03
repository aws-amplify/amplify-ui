import React, { useEffect, useRef } from 'react';
import { I18n } from 'aws-amplify';

import { useTheme } from '../../../hooks';
import { useThemeBreakpoint } from '../../../hooks/useThemeBreakpoint';
import { LivenessCameraModule } from './LivenessCameraModule';
import { useLivenessActor } from '../hooks';
import { CancelButton } from '../shared';
import { Text, Flex, Heading, Divider } from '../../..';
import { getVideoConstraints } from './helpers';

export const LivenessCheck: React.FC = () => {
  const { tokens } = useTheme();
  const breakpoint = useThemeBreakpoint();
  const [state] = useLivenessActor();
  const currElementRef = useRef<HTMLDivElement>(null);
  const [videoConstraints, setVideoConstraints] =
    React.useState<MediaTrackConstraints>(null);

  const isMobileScreen = breakpoint === 'base';

  useEffect(() => {
    const constraints = getVideoConstraints(
      isMobileScreen,
      currElementRef.current.clientWidth
    );
    setVideoConstraints(constraints);
  }, [isMobileScreen]);

  return (
    <Flex direction="column" position="relative" ref={currElementRef}>
      {!isMobileScreen && (
        <Heading level={3}>{I18n.get('Liveness check')}</Heading>
      )}
      {!state.matches('permissionDenied') ? (
        videoConstraints && (
          <LivenessCameraModule
            isMobileScreen={isMobileScreen}
            videoConstraints={videoConstraints}
          />
        )
      ) : (
        <Flex
          backgroundColor={`${tokens.colors.black}`}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          height={`${(videoConstraints.height as ConstrainULongRange).ideal}`}
          width={`${(videoConstraints.width as ConstrainULongRange).ideal}`}
        >
          <Text color={`${tokens.colors.white}`}>
            {I18n.get(
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta atque' +
                'architecto consequatur suscipit. Accusantium deleniti quibusdam'
            )}
          </Text>
        </Flex>
      )}
      {!isMobileScreen && (
        <Flex direction="column" alignItems="flex-end">
          <Divider />
          <CancelButton />
        </Flex>
      )}
    </Flex>
  );
};
