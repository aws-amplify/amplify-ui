import React from 'react';

const AIContext = React.createContext(undefined);
const useAIContext = () => {
    const context = React.useContext(AIContext);
    const [routeToConversationsMap, setRouteToConversationsMap] = React.useState({});
    if (context) {
        return context;
    }
    return { routeToConversationsMap, setRouteToConversationsMap };
};
const AIContextProvider = ({ children, }) => {
    const context = useAIContext();
    return React.createElement(AIContext.Provider, { value: context }, children);
};

export { AIContext, AIContextProvider, useAIContext };
