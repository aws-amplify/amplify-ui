import * as React from 'react';
import { translate, recordLivenessAnalyticsEvent } from '@aws-amplify/ui';

import { useLivenessActor } from '../hooks';
import { useFaceLivenessDetector } from '../providers';
import { Button } from '../../../primitives';
import { IconClose } from '../../../primitives/Icon/icons';
import { LivenessClassNames } from '../types/classNames';

export interface CancelButtonProps {
  sourceScreen: string;
}

export const CancelButton: React.FC<CancelButtonProps> = (props) => {
  const { sourceScreen } = props;

  const { componentProps } = useFaceLivenessDetector();
  const [state, send] = useLivenessActor();
  const isFinalState = state.done;

  const handleClick = () => {
    recordLivenessAnalyticsEvent(componentProps, {
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
      autoFocus
      variation="link"
      onClick={handleClick}
      size="large"
      className={LivenessClassNames.CancelButton}
      aria-label={translate('Cancel Liveness check')}
    >
      <IconClose aria-hidden="true" size="large" data-testid="close-icon" />
    </Button>
  );
};
