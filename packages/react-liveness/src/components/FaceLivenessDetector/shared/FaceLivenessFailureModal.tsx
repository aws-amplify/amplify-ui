import React from 'react';

import { translate } from '@aws-amplify/ui';
import { Flex, Button } from '@aws-amplify/ui-react';

import { Toast } from './Toast';
import { Overlay } from './Overlay';

export interface FaceLivenessFailureModalProps {
  onRetry: () => void;
}

export const FaceLivenessFailureModal: React.FC<FaceLivenessFailureModalProps> =
  (props) => {
    const { onRetry } = props;

    return (
      <Overlay backgroundColor="overlay.40">
        <Toast heading={translate('Check unsuccessful')} variation="error">
          <Flex justifyContent="center">
            <Button variation="primary" type="button" onClick={onRetry}>
              {translate('Try again')}
            </Button>
          </Flex>
        </Toast>
      </Overlay>
    );
  };
