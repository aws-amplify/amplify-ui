import React from 'react';
interface Input {
    text?: string;
    files?: File[];
}
interface InputContext {
    input?: Input;
    setInput?: React.Dispatch<React.SetStateAction<Input | undefined>>;
}
export declare const InputContext: React.Context<InputContext>;
export declare const InputContextProvider: ({ children, }: {
    children?: React.ReactNode;
}) => JSX.Element;
export {};
