import React from 'react';
import { I18n } from 'aws-amplify';
import { useActor } from '@xstate/react';

import { useTheme } from '../../../hooks';
import { useBreakpoint } from 'src/primitives/shared/responsive/useBreakpoint';
import { Breakpoint } from 'src/primitives/types/responsive';
import { LivenessCameraModule } from './LivenessCameraModule';
import { useLivenessFlow } from '../providers';
import { CancelButton } from '../shared/CancelButton';
import { Text, Flex, Heading, Divider, View } from '../../..';

function getVideoConstraints(
  isMobileScreen: boolean,
  currentScreen: Screen
): MediaTrackConstraints {
  return isMobileScreen
    ? {
        width: { min: 240, ideal: currentScreen.width, max: 1080 },
        height: { min: 320, ideal: currentScreen.height, max: 1920 },
        facingMode: 'user',
      }
    : {
        width: { min: 320, ideal: 640, max: 1920 },
        height: { min: 240, ideal: 480, max: 1080 },
        facingMode: 'user',
      };
}

export const LivenessCheck: React.FC = () => {
  const { tokens } = useTheme();

  const {
    breakpoints: {
      values: breakpoints,
      unit: breakpointUnit,
      defaultBreakpoint,
    },
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    breakpointUnit,
    defaultBreakpoint: defaultBreakpoint as Breakpoint,
  });

  const isMobileScreen = breakpoint === 'base';
  const videoConstraints = getVideoConstraints(isMobileScreen, screen);
  const { service } = useLivenessFlow();
  const [state] = useActor(service);

  return (
    <Flex
      direction="column"
      position="relative"
      padding={{ medium: `${tokens.space.medium} ${tokens.space.large}` }}
    >
      {!isMobileScreen && (
        <Heading level={3}>{I18n.get('Liveness check')}</Heading>
      )}
      {!state.matches('permissionDenied') ? (
        <LivenessCameraModule
          isMobileScreen={isMobileScreen}
          videoConstraints={videoConstraints}
        />
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
      {isMobileScreen ? (
        <View position="absolute" top={0} right={0}>
          <CancelButton isMobileScreen={true} />
        </View>
      ) : (
        <Flex direction="column" alignItems="flex-end">
          <Divider />
          <CancelButton />
        </Flex>
      )}
    </Flex>
  );
};
