import * as React from 'react';
import { translate } from '@aws-amplify/ui';
import { Flex, Button, Card } from '@aws-amplify/ui-react';

import {
  defaultComponents,
  LivenessComponents,
} from '../shared/DefaultStartScreenComponents';

const START_CLASS_NAME = 'liveness-detector-start';

export interface StartLivenessProps {
  beginLivenessCheck: () => void;
  components?: LivenessComponents;
}

export function StartLiveness(props: StartLivenessProps): JSX.Element {
  const { beginLivenessCheck, components: customComponents } = props;
  const components = {
    ...defaultComponents,
    ...customComponents,
  } as Required<LivenessComponents>;
  const { LivenessHeader, PhotosensitiveWarning, LivenessInstructions } =
    components;

  return (
    <Card className={START_CLASS_NAME} data-testid={START_CLASS_NAME}>
      <Flex direction="column">
        <LivenessHeader />
        <PhotosensitiveWarning />
        <LivenessInstructions />
        <Flex justifyContent="center">
          <Button
            variation="primary"
            type="button"
            onClick={beginLivenessCheck}
          >
            {translate('Begin check')}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
