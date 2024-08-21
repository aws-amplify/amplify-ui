import React from 'react';
import { ViewElement } from '../context/elements/definitions.mjs';
import './Controls/ActionsBarControl.mjs';
import './Controls/AvatarControl.mjs';
import { HeaderControl } from './Controls/HeaderControl.mjs';
import { FieldControl } from './Controls/FieldControl.mjs';
import { MessagesControl } from './Controls/MessagesControl.mjs';
import { AutoHidablePromptControl } from './Controls/PromptControl.mjs';

function Conversation() {
    return (React.createElement(ViewElement, { style: {
            width: '584px',
            maxHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
        } },
        React.createElement(HeaderControl, null),
        React.createElement(ViewElement, { style: {
                borderLeft: '1px solid rgba(220, 222, 224, 1)',
                borderRight: '1px solid rgba(220, 222, 224, 1)',
                padding: '0px 16px',
                overflowY: 'auto',
                flexShrink: '1',
                display: 'flex',
                flexDirection: 'column-reverse',
            } },
            React.createElement(AutoHidablePromptControl, null),
            React.createElement(MessagesControl, null)),
        React.createElement(ViewElement, { style: {
                border: '1px solid rgba(220, 222, 224, 1)',
                borderTop: 'none',
                borderRadius: '0px 0px 16px 16px',
                flex: '0 0 auto',
                padding: '0px 16px',
            } },
            React.createElement(FieldControl, null))));
}

export { Conversation as default };
