import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  FaceLivenessDetectorCoreProps as FaceLivenessDetectorPropsFromUi,
} from './service';
import { View, Flex } from '@aws-amplify/ui-react';

import { FaceLivenessDetectorProvider } from './providers';
import { LivenessCheck } from './LivenessCheck';
import { FaceLivenessDetectorComponents } from './shared/DefaultStartScreenComponents';
import { LivenessDisplayText } from './displayText';
import { getDisplayText } from './utils/getDisplayText';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface FaceLivenessDetectorCoreProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: FaceLivenessDetectorComponents;
  displayText?: LivenessDisplayText;
}

export default function FaceLivenessDetectorCore(
  props: FaceLivenessDetectorCoreProps
): JSX.Element {
  const { components, config, displayText, disableStartScreen } = props;
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
  const isStartView = state.matches('start');

  const beginLivenessCheck = React.useCallback(() => {
    send({
      type: 'BEGIN',
    });
  }, [send]);

  React.useLayoutEffect(() => {
    if (disableStartScreen && isStartView) {
      beginLivenessCheck();
    }
  }, [beginLivenessCheck, disableStartScreen, isStartView]);

  return (
    <View className={DETECTOR_CLASS_NAME} testId={DETECTOR_CLASS_NAME}>
      <FaceLivenessDetectorProvider componentProps={props} service={service}>
        <Flex direction="column" ref={currElementRef}>
          <LivenessCheck
            instructionDisplayText={instructionDisplayText}
            hintDisplayText={hintDisplayText}
            cameraDisplayText={cameraDisplayText}
            streamDisplayText={streamDisplayText}
            errorDisplayText={errorDisplayText}
            components={components}
            beginLivenessCheck={beginLivenessCheck}
          />
        </Flex>
      </FaceLivenessDetectorProvider>
    </View>
  );
}
