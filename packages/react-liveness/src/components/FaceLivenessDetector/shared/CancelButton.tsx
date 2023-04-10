import React from 'react';

import { Button } from '@aws-amplify/ui-react';
import { IconClose } from '@aws-amplify/ui-react/internal';

import { useLivenessActor } from '../hooks';
import { LivenessClassNames } from '../types/classNames';

export interface CancelButtonProps {
  ariaLabel: string;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ ariaLabel }) => {
  const [state, send] = useLivenessActor();
  const isFinalState = state.done;

  const handleClick = () => {
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
      aria-label={ariaLabel}
    >
      <IconClose aria-hidden="true" data-testid="close-icon" />
    </Button>
  );
};
