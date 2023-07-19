import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  FaceLivenessDetectorCoreProps as FaceLivenessDetectorPropsFromUi,
} from './service';
import { View, Flex } from '@aws-amplify/ui-react';

import { FaceLivenessDetectorProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { getVideoConstraints } from './StartLiveness/helpers';
import { StartScreenComponents } from './shared/DefaultStartScreenComponents';
import { LivenessDisplayText } from './displayText';
import { getDisplayText } from './utils/getDisplayText';
import { CheckScreenComponents } from './shared/FaceLivenessErrorModal';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export type FaceLivenessDetectorComponents = StartScreenComponents &
  CheckScreenComponents;

export interface FaceLivenessDetectorCoreProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: FaceLivenessDetectorComponents;
  displayText?: LivenessDisplayText;
}

export default function FaceLivenessDetectorCore(
  props: FaceLivenessDetectorCoreProps
): JSX.Element {
  const {
    disableInstructionScreen = false,
    components,
    config,
    displayText,
  } = props;
  const currElementRef = React.useRef<HTMLDivElement>(null);
  const {
    hintDisplayText,
    cameraDisplayText,
    instructionDisplayText,
    streamDisplayText,
    errorDisplayText,
  } = getDisplayText(displayText);

  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      componentProps: {
        ...props,
        config: config ?? {},
      },
    },
  });

  const [state, send] = useActor(service);
  const isStartView = state.matches('start') || state.matches('userCancel');

  const beginLivenessCheck = React.useCallback(() => {
    const videoConstraints = getVideoConstraints();

    send({
      type: 'BEGIN',
      data: { videoConstraints },
    });
  }, [send]);

  React.useLayoutEffect(() => {
    if (disableInstructionScreen && isStartView) {
      beginLivenessCheck();
    }
  }, [beginLivenessCheck, disableInstructionScreen, isStartView]);

  return (
    <View className={DETECTOR_CLASS_NAME} testId={DETECTOR_CLASS_NAME}>
      <FaceLivenessDetectorProvider componentProps={props} service={service}>
        <Flex direction="column" ref={currElementRef}>
          {isStartView ? (
            <StartLiveness
              beginLivenessCheck={beginLivenessCheck}
              components={components}
              instructionDisplayText={instructionDisplayText}
            />
          ) : (
            <LivenessCheck
              hintDisplayText={hintDisplayText}
              cameraDisplayText={cameraDisplayText}
              streamDisplayText={streamDisplayText}
              errorDisplayText={errorDisplayText}
              components={components}
            />
          )}
        </Flex>
      </FaceLivenessDetectorProvider>
    </View>
  );
}
