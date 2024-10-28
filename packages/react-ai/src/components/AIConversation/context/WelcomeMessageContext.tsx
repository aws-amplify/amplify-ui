import * as React from 'react';

type WelcomeMessageContextProps = React.ReactNode | undefined;

export const WelcomeMessageContext =
  React.createContext<WelcomeMessageContextProps>(undefined);

export const WelcomeMessageProvider = ({
  children,
  welcomeMessage,
}: {
  children?: React.ReactNode;
  welcomeMessage?: React.ReactNode;
}): JSX.Element => {
  return (
    <WelcomeMessageContext.Provider value={welcomeMessage}>
      {children}
    </WelcomeMessageContext.Provider>
  );
};
