import React from 'react';
import { ActionsBarButton } from './ActionsBarButton';

import { ActionsBarContainer } from './ActionsBarContainer';
import { ActionsBarIcon } from './ActionsBarIcon';

export function ActionsBar({ actions }: { actions: string[] }): JSX.Element {
  return (
    <ActionsBarContainer>
      {actions.map((action, index) => (
        <ActionsBarButton key={index}>
          <ActionsBarIcon />
        </ActionsBarButton>
      ))}
    </ActionsBarContainer>
  );
}

ActionsBar.Button = ActionsBarButton;
ActionsBar.Container = ActionsBarContainer;
ActionsBar.Icon = ActionsBarIcon;
