import React from 'react';
import { ActionsBarButton } from './ActionsBarButton';
import { ActionsBarContainer } from './ActionsBarContainer';
import { ActionsBarIcon } from './ActionsBarIcon';

function ActionsBarElement() {
  return (
    <ActionsBarContainer>
      <ActionsBarButton />
    </ActionsBarContainer>
  );
}

const ActionsBar = Object.assign(ActionsBarElement, {
  ActionsBarButton,
  ActionsBarIcon,
});

export { ActionsBar };
