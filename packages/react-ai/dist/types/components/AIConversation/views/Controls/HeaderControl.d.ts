import React from 'react';
import { AIConversationElements } from '../../context/elements';
export declare const HeaderControl: HeaderControl;
export interface HeaderControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): React.JSX.Element;
    Container: T['View'];
    Button: T['Button'];
    Text: T['Text'];
}
