import React from 'react';

import { AIConversationElements } from '../context/elements';
import { MessagesControl } from './Controls/MessagesControl';
import { actions, avatars, messages } from '../mocks/mocks';

const { View, Text } = AIConversationElements;

export default function Conversation(): JSX.Element {
  return (
    <View
      style={{
        width: '584px',
        height: '344px',
      }}
    >
      <View>
        <Text>Header title</Text>
      </View>
      <View
        style={{
          borderLeft: '1px solid rgba(220, 222, 224, 1)',
          borderRight: '1px solid rgba(220, 222, 224, 1)',
          padding: '0px 16px',
          height: '300px',
        }}
      >
        <MessagesControl
          actions={actions}
          avatars={avatars}
          messages={messages}
        />
      </View>
      <View
        style={{
          border: '1px solid rgba(220, 222, 224, 1)',
          borderTop: 'none',
          borderRadius: '0px 0px 16px 16px',
          padding: '0px 16px',
        }}
      >
        input subcomponent
      </View>
    </View>
  );
}
