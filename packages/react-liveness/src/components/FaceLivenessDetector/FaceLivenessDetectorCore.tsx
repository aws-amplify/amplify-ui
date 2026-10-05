import * as React from 'react';
import { useInterpret } from '@xstate/react';
import type { FaceLivenessDetectorCoreProps as FaceLivenessDetectorPropsFromUi } from './service';
import type { StreamRecorder } from './service';
import { closeLivenessStream, livenessMachine } from './service';
import { WS_CLOSURE_CODE } from './service/utils/constants';
import { View, Flex } from '@aws-amplify/ui-react';

import { FaceLivenessDetectorProvider } from './providers';
import { LivenessCheck } from './LivenessCheck';
import type { FaceLivenessDetectorComponents } from './shared/DefaultStartScreenComponents';
import type { LivenessDisplayText } from './displayText';
import { getDisplayText } from './utils/getDisplayText';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface FaceLivenessDetectorCoreProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: FaceLivenessDetectorComponents;
  displayText?: LivenessDisplayText;
}

export default function FaceLivenessDetectorCore(
  props: FaceLivenessDetectorCoreProps
): React.JSX.Element {
  const { components, config, displayText } = props;
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

  React.useEffect(() => {
    // Track the stream provider as the state changes: by the time this
    // effect is cleaned up, the service has been stopped and reset.
    let livenessStreamProvider: StreamRecorder | undefined;
    const { unsubscribe } = service.subscribe(({ context }) => {
      ({ livenessStreamProvider } = context);
    });

    return () => {
      unsubscribe();
      // Unmounting mid-check (e.g. the host modal is closed) bypasses the
      // CANCEL event, so close the stream the same way the cancel button does
      if (livenessStreamProvider?.isRecording()) {
        closeLivenessStream(
          livenessStreamProvider,
          WS_CLOSURE_CODE.USER_CANCEL
        );
      }
    };
  }, [service]);

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
