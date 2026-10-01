import React from 'react';

import { Button } from '@aws-amplify/ui-react';
import { IconClose } from '@aws-amplify/ui-react/internal';

import { useLivenessActor } from '../hooks';
import { LivenessClassNames } from '../types/classNames';

export interface FaceLivenessCancelButtonProps {
  /**
   * Cancels the liveness check, same as the default cancel button
   */
  onCancel: () => void;
}

export interface CancelButtonProps {
  ariaLabel: string;
  /**
   * Custom cancel button provided through `components.CancelButton`
   */
  Component?: React.ComponentType<FaceLivenessCancelButtonProps>;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  ariaLabel,
  Component,
}) => {
  const [state, send] = useLivenessActor();
  const isFinalState = state.done;

  const handleClick = () => {
    send({
      type: 'CANCEL',
    });
  };

  if (isFinalState) return null;

  if (Component) return <Component onCancel={handleClick} />;

  return (
    <Button
      autoFocus
      variation="link"
      onClick={handleClick}
      size="large"
      className={LivenessClassNames.CancelButton}
      aria-label={ariaLabel}
    >
      <IconClose aria-hidden="true" data-testid="close-icon" />
    </Button>
  );
};
