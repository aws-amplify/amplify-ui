import * as React from 'react';
import { translate, recordLivenessAnalyticsEvent } from '@aws-amplify/ui';

import { useTheme } from '../../../hooks';
import { useLivenessActor } from '../hooks';
import { useLivenessFlow } from '../providers';
import { Button, IconClose } from '../../../primitives';

export interface CancelButtonProps {
  sourceScreen: string;
  isMobileScreen?: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = (props) => {
  const { sourceScreen, isMobileScreen } = props;

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

  return isMobileScreen ? (
    <Button
      variation="link"
      onClick={handleClick}
      backgroundColor={`${tokens.colors.black}`}
      color={`${tokens.colors.white}`}
      borderRadius="100%"
      height="50px"
    >
      <IconClose size="large" />
    </Button>
  ) : (
    <Button variation="link" type="button" onClick={handleClick}>
      {translate('Cancel')}
    </Button>
  );
};
