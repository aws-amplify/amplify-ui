import React from 'react';
import { SuggestedPrompt } from '../types';
type SuggestedPromptsContextProps = SuggestedPrompt[] | undefined;
export declare const SuggestedPromptsContext: React.Context<SuggestedPromptsContextProps>;
export declare const SuggestedPromptProvider: ({ children, suggestedPrompts, }: {
    children?: React.ReactNode;
    suggestedPrompts?: SuggestedPrompt[] | undefined;
}) => JSX.Element;
export {};
