import React from 'react';

const ResponseComponentsContext = React.createContext(undefined);
const ResponseComponentsProvider = ({ children, responseComponents, }) => {
    return (React.createElement(ResponseComponentsContext.Provider, { value: responseComponents }, children));
};

export { ResponseComponentsContext, ResponseComponentsProvider };
