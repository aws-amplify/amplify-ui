import * as React from 'react';
import { translate, recordLivenessAnalyticsEvent } from '@aws-amplify/ui';

import { useTheme } from '../../../hooks';
import { useLivenessActor } from '../hooks';
import { useLivenessFlow } from '../providers';
import { Button } from '../../../primitives';
import { IconClose } from '../../../primitives/Icon/icons';

export interface CancelButtonProps {
  sourceScreen: string;
}

export const CancelButton: React.FC<CancelButtonProps> = (props) => {
  const { sourceScreen } = props;

  const { tokens } = useTheme();
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
      backgroundColor={`${tokens.colors.background.primary}`}
      color={`${tokens.colors.font.primary}`}
      borderRadius="100%"
      height="50px"
      aria-label={translate('Cancel Liveness check')}
    >
      <IconClose aria-hidden="true" size="large" data-testid="close-icon" />
    </Button>
  );
};
