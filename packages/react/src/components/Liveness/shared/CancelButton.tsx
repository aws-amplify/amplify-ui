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
  const [_, send] = useActor(service);

  const handleClick = () => {
    send({
      type: 'CANCEL',
    });
  };

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
