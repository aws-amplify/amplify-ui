import React from 'react';

const AvatarsContext = React.createContext(undefined);
const AvatarsProvider = ({ children, avatars, }) => {
    return (React.createElement(AvatarsContext.Provider, { value: avatars }, children));
};

export { AvatarsContext, AvatarsProvider };
