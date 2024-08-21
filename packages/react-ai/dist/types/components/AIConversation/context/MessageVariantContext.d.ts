import React from 'react';
import { MessageVariant } from '../types';
type MessageVariantContextProps = MessageVariant | undefined;
export declare const MessageVariantContext: React.Context<MessageVariantContextProps>;
export declare const MessageVariantProvider: ({ children, variant, }: {
    children?: React.ReactNode;
    variant?: MessageVariantContextProps;
}) => JSX.Element;
export {};
