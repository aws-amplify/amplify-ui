import * as React from 'react';
import {
  translate,
  IlluminationState,
  IlluminationStateStringMap,
  FaceMatchStateStringMap,
  LivenessErrorStateStringMap,
} from '@aws-amplify/ui';

import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
} from '../hooks';
import { useTheme } from '../../../hooks';
import { Flex, Loader, View } from '../../../primitives';
import { AlertIcon } from '../../../primitives/Alert/AlertIcon';

export const selectErrorState = createLivenessSelector(
  (state) => state.context.errorState
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams.faceMatchState
);
export const selectIlluminationState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams.illuminationState
);

export interface InstructionProps {
  isMobileScreen: boolean;
}

export const Instruction: React.FC<InstructionProps> = (props) => {
  const { isMobileScreen } = props;

  const { tokens } = useTheme();
  const [state] = useLivenessActor();

  // NOTE: Do not change order of these selectors as the unit tests depend on this order
  const errorState = useLivenessSelector(selectErrorState);
  const faceMatchState = useLivenessSelector(selectFaceMatchState);
  const illuminationState = useLivenessSelector(selectIlluminationState);

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
          <AlertIcon variation="error" />
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
          <View as="span">{translate('Authenticating')}</View>
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
          <AlertIcon variation="success" />
          <View as="span" style={{ whiteSpace: 'nowrap' }}>
            {translate('Success!')}
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
