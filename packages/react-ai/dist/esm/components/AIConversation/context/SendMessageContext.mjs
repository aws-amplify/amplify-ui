import React from 'react';

const SendMessageContext = React.createContext(undefined);
const SendMessageContextProvider = ({ children, handleSendMessage, }) => {
    return (React.createElement(SendMessageContext.Provider, { value: handleSendMessage }, children));
};

export { SendMessageContext, SendMessageContextProvider };
