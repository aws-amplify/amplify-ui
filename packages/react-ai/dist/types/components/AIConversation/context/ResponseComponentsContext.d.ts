import React from 'react';
import { ResponseComponents } from '../types';
type ResponseComponentsContextProps = ResponseComponents | undefined;
export declare const ResponseComponentsContext: React.Context<ResponseComponentsContextProps>;
export declare const ResponseComponentsProvider: ({ children, responseComponents, }: {
    children?: React.ReactNode;
    responseComponents?: ResponseComponents | undefined;
}) => JSX.Element;
export {};
