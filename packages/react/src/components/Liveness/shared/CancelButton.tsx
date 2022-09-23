import * as React from 'react';
import { translate, recordLivenessAnalyticsEvent } from '@aws-amplify/ui';

import { useLivenessActor } from '../hooks';
import { useLivenessFlow } from '../providers';
import { Button } from '../../../primitives';
import { IconClose } from '../../../primitives/Icon/icons';

export interface CancelButtonProps {
  sourceScreen: string;
}

export const CancelButton: React.FC<CancelButtonProps> = (props) => {
  const { sourceScreen } = props;

  const { flowProps } = useLivenessFlow();
  const [state, send] = useLivenessActor();
  const isFinalState = state.done;

  const handleClick = () => {
    recordLivenessAnalyticsEvent(flowProps, {
      event: sourceScreen,
      attributes: { action: 'Cancelled' },
      metrics: { count: 1 },
    });

    send({
      type: 'CANCEL',
    });
  };

  if (isFinalState) return null;

  return (
    <Button
      variation="link"
      onClick={handleClick}
      size="large"
      backgroundColor="background.primary"
      aria-label={translate('Cancel Liveness check')}
    >
      <IconClose aria-hidden="true" size="large" data-testid="close-icon" />
    </Button>
  );
};
