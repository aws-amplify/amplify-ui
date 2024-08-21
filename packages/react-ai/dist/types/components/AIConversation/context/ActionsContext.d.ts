import React from 'react';
import { CustomAction } from '../types';
type ActionsContextProps = CustomAction[] | undefined;
export declare const ActionsContext: React.Context<ActionsContextProps>;
export declare const ActionsProvider: ({ children, actions, }: {
    children?: React.ReactNode;
    actions?: CustomAction[] | undefined;
}) => JSX.Element;
export {};
