import React from 'react';

const MessagesContext = React.createContext(undefined);
// role of the user sending the message, assistant or user
const RoleContext = React.createContext(undefined);
const MessagesProvider = ({ children, messages, }) => {
    return (React.createElement(MessagesContext.Provider, { value: messages }, children));
};

export { MessagesContext, MessagesProvider, RoleContext };
