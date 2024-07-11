import React from 'react';

interface AIState {
  routeIdToMessages: Record<string, string[]>;
}

interface ContextType {
  state: AIState;
  handler: React.Dispatch<React.SetStateAction<AIState>>;
}

export const AIContext = React.createContext<ContextType | undefined>(
  undefined
);

export const useAIContext = (): ContextType => {
  const context = React.useContext(AIContext);
  const [state, handler] = React.useState<AIState>({ routeIdToMessages: {} });

  if (context) {
    return context;
  }

  return { state, handler };
};

export const AIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const context = useAIContext();
  return <AIContext.Provider value={context}>{children}</AIContext.Provider>;
};
