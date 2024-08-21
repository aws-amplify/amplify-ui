import React from 'react';

const SuggestedPromptsContext = React.createContext(undefined);
const SuggestedPromptProvider = ({ children, suggestedPrompts, }) => {
    return (React.createElement(SuggestedPromptsContext.Provider, { value: suggestedPrompts }, children));
};

export { SuggestedPromptProvider, SuggestedPromptsContext };
