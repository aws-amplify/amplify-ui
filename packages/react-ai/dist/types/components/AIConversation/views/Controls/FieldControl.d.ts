import React from 'react';
import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';
export declare const FieldControl: FieldControl;
export interface FieldControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): React.JSX.Element;
    AttachFile: AttachFileControl<T>;
    InputContainer: T['View'];
    Label: T['Label'];
    TextInput: T['TextArea'];
    SendButton: T['Button'];
    SendIcon: T['Icon'];
}
