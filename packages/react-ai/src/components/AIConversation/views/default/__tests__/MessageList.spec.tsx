import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageList } from '../MessageList';
import {
  AvatarsContext,
  AvatarsProvider,
  ResponseComponentsProvider,
} from '../../../context';
import { ConversationMessage } from '../../../../../types';
import { ComponentClassName } from '@aws-amplify/ui';
import { View } from '@aws-amplify/ui-react';

describe('MessageList', () => {
  const mockMessages: ConversationMessage[] = [
    {
      id: '1',
      role: 'user',
      conversationId: '2',
      content: [{ text: 'Hello' }],
      createdAt: '2023-05-01T13:00:00Z',
    },
    {
      id: '2',
      role: 'assistant',
      conversationId: '2',
      content: [{ text: 'Hi there!' }],
      createdAt: '2023-05-01T11:01:00Z',
    },
  ];

  const mockAvatars = {
    ai: { username: 'AI', avatar: <div>AI Avatar</div> },
    user: { username: 'User', avatar: <div>User Avatar</div> },
  };

  it('renders messages correctly', () => {
    render(
      <AvatarsContext.Provider value={mockAvatars}>
        <MessageList messages={mockMessages} />
      </AvatarsContext.Provider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('renders correct avatar and username for each message', () => {
    render(
      <AvatarsContext.Provider value={mockAvatars}>
        <MessageList messages={mockMessages} />
      </AvatarsContext.Provider>
    );

    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('User Avatar')).toBeInTheDocument();
  });

  it('renders messages with different content types', () => {
    const messagesWithDifferentTypes: ConversationMessage[] = [
      {
        id: '1',
        role: 'user',
        conversationId: '2',
        content: [
          { text: 'Hello' },
          { image: { format: 'jpeg', source: { bytes: new Uint8Array() } } },
        ],
        createdAt: '2023-05-01T12:00:00Z',
      },
      {
        id: '2',
        role: 'assistant',
        conversationId: '3',
        content: [
          {
            toolUse: {
              toolUseId: '1',
              name: 'AMPLIFY_UI_Tool',
              input: {},
            },
          },
        ],
        createdAt: '2023-05-01T12:01:00Z',
      },
    ];

    render(
      <ResponseComponentsProvider
        responseComponents={{
          Tool: {
            description: '',
            component: () => <View testId="tool-component" />,
            props: {},
          },
        }}
      >
        <AvatarsProvider avatars={mockAvatars}>
          <MessageList messages={messagesWithDifferentTypes} />
        </AvatarsProvider>
      </ResponseComponentsProvider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByTestId('image-content')).toBeInTheDocument();
    expect(screen.getByTestId('tool-component')).toBeInTheDocument();
  });

  it('renders nothing when there are no messages', () => {
    const { container } = render(<MessageList messages={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('filters out messages with no renderable content', () => {
    const messagesWithEmptyContent: ConversationMessage[] = [
      {
        id: '1',
        role: 'user',
        conversationId: '3',
        content: [{ text: 'Hello' }],
        createdAt: '2023-05-01T12:00:00Z',
      },
      {
        id: '2',
        role: 'assistant',
        conversationId: '3',
        content: [],
        createdAt: '2023-05-01T12:01:00Z',
      },
    ];

    render(
      <AvatarsContext.Provider value={mockAvatars}>
        <MessageList messages={messagesWithEmptyContent} />
      </AvatarsContext.Provider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryByText('12:01')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes for user and assistant messages', () => {
    const { container } = render(
      <AvatarsContext.Provider value={mockAvatars}>
        <MessageList messages={mockMessages} />
      </AvatarsContext.Provider>
    );

    const userMessage = container.querySelector(
      `.${ComponentClassName.AIConversationMessage}.amplify-ai-conversation__message--user`
    );
    const assistantMessage = container.querySelector(
      `.${ComponentClassName.AIConversationMessage}.amplify-ai-conversation__message--assistant`
    );

    expect(userMessage).toBeInTheDocument();
    expect(assistantMessage).toBeInTheDocument();
  });

  it('handles messages with multiple content items', () => {
    const messageWithMultipleContent: ConversationMessage[] = [
      {
        id: '1',
        role: 'user',
        conversationId: '3',
        content: [{ text: 'Hello' }, { text: 'World' }],
        createdAt: '2023-05-01T12:00:00Z',
      },
    ];

    render(
      <AvatarsContext.Provider value={mockAvatars}>
        <MessageList messages={messageWithMultipleContent} />
      </AvatarsContext.Provider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });
});
