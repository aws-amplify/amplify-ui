import React from 'react';

const InputContext = React.createContext({});
const InputContextProvider = ({ children, }) => {
    const [input, setInput] = React.useState();
    const providerValue = React.useMemo(() => ({ input, setInput }), [input, setInput]);
    return (React.createElement(InputContext.Provider, { value: providerValue }, children));
};

export { InputContext, InputContextProvider };
