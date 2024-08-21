import React from 'react';
import { AIConversationElements } from '../../context/elements';
export declare const AttachFileControl: AttachFileControl;
export interface AttachFileControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): React.JSX.Element;
    Container: T['View'];
    Icon: T['Icon'];
    Button: T['Button'];
}
