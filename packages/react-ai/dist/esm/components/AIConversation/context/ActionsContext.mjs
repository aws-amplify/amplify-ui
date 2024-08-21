import React from 'react';

const ActionsContext = React.createContext(undefined);
const ActionsProvider = ({ children, actions, }) => {
    return (React.createElement(ActionsContext.Provider, { value: actions }, children));
};

export { ActionsContext, ActionsProvider };
