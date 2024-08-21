import React from 'react';
import { AIConversationElements } from '../../context/elements';
import { ActionsBarControl } from './ActionsBarControl';
import { AvatarControl } from './AvatarControl';
import { ConversationMessage } from '../../../../types';
export declare const MessageControl: MessageControl;
interface MessageControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (props: {
        message: ConversationMessage;
    }): JSX.Element;
    Container: T['View'];
    MediaContent: T['Image'];
    TextContent: T['Text'];
}
export declare const MessagesControl: MessagesControl;
export interface MessagesControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (props: {
        renderMessage?: (message: ConversationMessage) => React.ReactNode;
    }): JSX.Element;
    ActionsBar: ActionsBarControl<T>;
    Avatar: AvatarControl<T>;
    Container: T['View'];
    HeaderContainer: T['View'];
    Layout: T['View'];
    Message: MessageControl<T>;
    Separator: T['Span'];
}
export {};
