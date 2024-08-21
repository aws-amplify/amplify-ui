import React from 'react';
import Conversation from './views/ConversationView.mjs';
import { ActionsBarControl } from './views/Controls/ActionsBarControl.mjs';
import { AvatarControl } from './views/Controls/AvatarControl.mjs';
import { HeaderControl } from './views/Controls/HeaderControl.mjs';
import { FieldControl } from './views/Controls/FieldControl.mjs';
import { MessagesControl } from './views/Controls/MessagesControl.mjs';
import { PromptControl } from './views/Controls/PromptControl.mjs';
import createProvider from './createProvider.mjs';

function createAIConversation(input = {}) {
    const { elements, suggestedPrompts, actions, responseComponents, variant } = input;
    const Provider = createProvider({
        elements,
        actions,
        suggestedPrompts,
        responseComponents,
        variant,
    });
    function AIConversation(props) {
        const { messages, avatars, handleSendMessage } = props;
        return (React.createElement(Provider, { messages: messages, avatars: avatars, handleSendMessage: handleSendMessage },
            React.createElement(Conversation, null)));
    }
    const Controls = {
        // @ts-expect-error TODO fix type error
        ActionsBar: ActionsBarControl,
        // @ts-expect-error TODO fix type error
        Avatars: AvatarControl,
        // @ts-expect-error TODO fix type error
        Field: FieldControl,
        // @ts-expect-error TODO fix type error
        Header: HeaderControl,
        // @ts-expect-error TODO fix type error
        Messages: MessagesControl,
        // @ts-expect-error TODO fix type error
        SuggestedPrompts: PromptControl,
    };
    AIConversation.Provider = Provider;
    AIConversation.Conversation = Conversation;
    AIConversation.Controls = Controls;
    return { AIConversation };
}

export { createAIConversation };
