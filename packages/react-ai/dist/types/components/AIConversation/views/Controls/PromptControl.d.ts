import React from 'react';
import { AIConversationElements } from '../../context';
export declare const PromptControl: PromptControl;
export declare const AutoHidablePromptControl: () => JSX.Element | undefined;
export interface PromptControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): React.JSX.Element;
    Container: T['View'];
    Header: T['Heading'];
    Icon: T['Icon'];
    PromptGroup: T['View'];
    PromptCard: T['Button'];
}
