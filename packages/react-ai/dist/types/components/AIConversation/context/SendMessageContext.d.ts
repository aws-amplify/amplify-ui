import React from 'react';
import { SendMessage } from '../../../types';
export declare const SendMessageContext: React.Context<SendMessage | undefined>;
export declare const SendMessageContextProvider: ({ children, handleSendMessage, }: {
    children?: React.ReactNode;
    handleSendMessage: SendMessage;
}) => JSX.Element;
