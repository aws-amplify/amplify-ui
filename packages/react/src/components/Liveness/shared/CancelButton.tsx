import * as React from 'react';
import { I18n } from 'aws-amplify';
import { useActor } from '@xstate/react';
import { useLivenessFlow } from '../providers';
import { Button, IconClose } from '../../..';

export interface CancelButtonProps {
  isMobileScreen?: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = (props) => {
  const { isMobileScreen } = props;

  const { service } = useLivenessFlow();
  const [state, send] = useActor(service);
  const isFinalState = state.done;

  const handleClick = () => {
    send({
      type: 'CANCEL',
    });
  };

  if (isFinalState) return null;

  return isMobileScreen ? (
    <Button variation="link" onClick={handleClick}>
      <IconClose size="large" />
    </Button>
  ) : (
    <Button variation="default" type="button" onClick={handleClick}>
      {I18n.get('Cancel')}
    </Button>
  );
};
