import React from 'react';
import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';
import { ActionsProvider } from './context/ActionsContext.mjs';
import { AvatarsProvider } from './context/AvatarsContext.mjs';
import { InputContextProvider } from './context/InputContext.mjs';
import { MessagesProvider } from './context/MessagesContext.mjs';
import { MessageVariantProvider } from './context/MessageVariantContext.mjs';
import { SuggestedPromptProvider } from './context/SuggestedPromptsContext.mjs';
import { ResponseComponentsProvider } from './context/ResponseComponentsContext.mjs';
import { SendMessageContextProvider } from './context/SendMessageContext.mjs';

function createProvider({ elements, actions, suggestedPrompts, responseComponents, variant, }) {
    return function Provider({ children, messages, avatars, handleSendMessage, }) {
        return (React.createElement(ElementsProvider, { elements: elements },
            React.createElement(SuggestedPromptProvider, { suggestedPrompts: suggestedPrompts },
                React.createElement(ResponseComponentsProvider, { responseComponents: responseComponents },
                    React.createElement(InputContextProvider, null,
                        React.createElement(SendMessageContextProvider, { handleSendMessage: handleSendMessage },
                            React.createElement(AvatarsProvider, { avatars: avatars },
                                React.createElement(ActionsProvider, { actions: actions },
                                    React.createElement(MessageVariantProvider, { variant: variant },
                                        React.createElement(MessagesProvider, { messages: messages }, children))))))))));
    };
}

export { createProvider as default };
