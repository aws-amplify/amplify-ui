import React from 'react';

const MessageVariantContext = React.createContext('borderless');
const MessageVariantProvider = ({ children, variant, }) => {
    return (React.createElement(MessageVariantContext.Provider, { value: variant }, children));
};

export { MessageVariantContext, MessageVariantProvider };
