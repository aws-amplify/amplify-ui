import * as React from 'react';
import {
  translate,
  IlluminationState,
  IlluminationStateStringMap,
  FaceMatchStateStringMap,
  LivenessErrorStateStringMap,
} from '@aws-amplify/ui';

import { useLivenessActor } from '../hooks';
import { useTheme } from '../../../hooks';
import {
  Flex,
  IconCheckCircleOutline,
  IconHighlightOff,
  Loader,
  View,
} from '../../../primitives';

export interface InstructionProps {
  isMobileScreen: boolean;
}

export const Instruction: React.FC<InstructionProps> = (props) => {
  const { isMobileScreen } = props;

  const { tokens } = useTheme();
  const [state] = useLivenessActor();

  const {
    errorState,
    faceMatchAssociatedParams: { faceMatchState, illuminationState },
  } = state.context;
  const isNotRecording = state.matches('notRecording');
  const isUploading = state.matches('uploading');
  const isCheckSuccessful = state.matches('checkSucceeded');
  const isCheckFailed = state.matches('checkFailed');

  const getInstructionContent = () => {
    if (errorState || isCheckFailed) {
      return (
        <Flex
          gap={`${tokens.space.xs}`}
          color={
            isMobileScreen
              ? `${tokens.colors.red[40]}`
              : `${tokens.colors.red[60]}`
          }
          alignItems="center"
        >
          <IconHighlightOff size="large" viewBox="0 0 20 20" />
          <View as="span">
            {errorState && LivenessErrorStateStringMap[errorState]}
            {isCheckFailed && translate('Check failed! Please try again.')}
          </View>
        </Flex>
      );
    }

    if (isNotRecording) {
      return translate(
        'When recording begins, move your face inside the frame that appears.'
      );
    }

    if (isUploading) {
      return (
        <Flex gap={`${tokens.space.xxs}`} alignItems="center">
          <Loader />
          <View as="span">{translate('Authenticating...')}</View>
        </Flex>
      );
    }

    if (isCheckSuccessful) {
      return (
        <Flex
          gap={`${tokens.space.xs}`}
          color={
            isMobileScreen
              ? `${tokens.colors.green[40]}`
              : `${tokens.colors.green[60]}`
          }
          alignItems="center"
        >
          <IconCheckCircleOutline size="large" viewBox="0 0 20 20" />
          <View as="span" style={{ whiteSpace: 'nowrap' }}>
            {translate('Check succeeded!')}
          </View>
        </Flex>
      );
    }

    if (illuminationState && illuminationState !== IlluminationState.NORMAL) {
      return IlluminationStateStringMap[illuminationState];
    }

    return FaceMatchStateStringMap[faceMatchState];
  };

  return (
    <Flex
      borderRadius={`${tokens.radii.medium}`}
      backgroundColor={{
        base: `${tokens.colors.black}`,
        medium: `${tokens.colors.transparent}`,
      }}
      padding={`${tokens.space.small}`}
      margin={`0 ${tokens.space.medium}`}
    >
      <View
        color={{
          base: `${tokens.colors.white}`,
          medium: `${tokens.colors.black}`,
        }}
      >
        {getInstructionContent()}
      </View>
    </Flex>
  );
};
