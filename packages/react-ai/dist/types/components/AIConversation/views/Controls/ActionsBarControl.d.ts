import React from 'react';
import { AIConversationElements } from '../../context/elements';
import { ConversationMessage } from '../../../../types';
export declare const ActionsBarControl: ActionsBarControl;
export interface ActionsBarControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (props: {
        message: ConversationMessage;
        focusable?: boolean;
    }): React.JSX.Element;
    Button: T['Button'];
    Container: T['View'];
    Icon: T['Span'];
}
