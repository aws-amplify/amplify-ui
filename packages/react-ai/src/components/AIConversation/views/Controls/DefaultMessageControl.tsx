import * as React from 'react';
import { MessagesContext } from '../../context';
import { PromptControl } from './PromptControl';
import { WelcomeMessageContext } from '../../context/WelcomeMessageContext';

export const DefaultMessageControl = (): JSX.Element | undefined => {
  const messages = React.useContext(MessagesContext);
  const welcomeMessage = React.useContext(WelcomeMessageContext);

  if (!messages || messages.length === 0) {
    return (
      <>
        {welcomeMessage}
        <PromptControl />
      </>
    );
  }
};
