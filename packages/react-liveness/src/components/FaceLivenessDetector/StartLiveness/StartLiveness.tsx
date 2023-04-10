import * as React from 'react';
import { Flex, Button, Card } from '@aws-amplify/ui-react';

import { InstructionDisplayText } from '../displayText';
import {
  DefaultHeader,
  DefaultPhotosensitiveWarning,
  DefaultInstructions,
  StartScreenComponents,
} from '../shared/DefaultStartScreenComponents';

const START_CLASS_NAME = 'liveness-detector-start';

export interface StartLivenessProps {
  beginLivenessCheck: () => void;
  components?: StartScreenComponents;
  instructionDisplayText: Required<InstructionDisplayText>;
}

export function StartLiveness(props: StartLivenessProps): JSX.Element {
  const {
    beginLivenessCheck,
    components: customComponents,
    instructionDisplayText,
  } = props;

  return (
    <Card className={START_CLASS_NAME} data-testid={START_CLASS_NAME}>
      <Flex direction="column">
        {customComponents?.Header ? (
          <customComponents.Header />
        ) : (
          <DefaultHeader
            headingText={instructionDisplayText.instructionsHeaderHeadingText}
            bodyText={instructionDisplayText.instructionsHeaderBodyText}
          />
        )}

        {customComponents?.PhotosensitiveWarning ? (
          <customComponents.PhotosensitiveWarning />
        ) : (
          <DefaultPhotosensitiveWarning
            headingText={
              instructionDisplayText.photosensitivyWarningHeadingText
            }
            bodyText={instructionDisplayText.photosensitivyWarningBodyText}
            infoText={instructionDisplayText.photosensitivyWarningInfoText}
          />
        )}

        {customComponents?.Instructions ? (
          <customComponents.Instructions />
        ) : (
          <DefaultInstructions
            headingText={instructionDisplayText.instructionListHeadingText}
            goodFitCaptionText={instructionDisplayText.goodFitCaptionText}
            goodFitAltText={instructionDisplayText.goodFitAltText}
            tooFarCaptionText={instructionDisplayText.tooFarCaptionText}
            tooFarAltText={instructionDisplayText.tooFarAltText}
            steps={[
              instructionDisplayText.instructionListStepOneText,
              instructionDisplayText.instructionListStepTwoText,
              instructionDisplayText.instructionListStepThreeText,
              instructionDisplayText.instructionListStepFourText,
            ]}
          />
        )}

        <Flex justifyContent="center">
          <Button
            variation="primary"
            type="button"
            onClick={beginLivenessCheck}
          >
            {instructionDisplayText.instructionsBeginCheckText}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
