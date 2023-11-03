import * as React from 'react';
import { useInterpret } from '@xstate/react';
import {
  livenessMachine,
  FaceLivenessDetectorCoreProps as FaceLivenessDetectorPropsFromUi,
} from './service';
import { View, Flex, useTheme } from '@aws-amplify/ui-react';

import { FaceLivenessDetectorProvider } from './providers';
import { LivenessCheck } from './LivenessCheck';
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
  const { components, config, displayText } = props;
  const currElementRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
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
      theme,
    },
  });

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
          />
        </Flex>
      </FaceLivenessDetectorProvider>
    </View>
  );
}
