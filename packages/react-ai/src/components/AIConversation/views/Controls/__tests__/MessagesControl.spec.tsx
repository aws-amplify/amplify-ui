import React from 'react';
import { render, screen } from '@testing-library/react';

import { ActionsProvider } from '../../../context/ActionsContext';
import { AvatarsProvider } from '../../../context/AvatarsContext';
import {
  MessagesProvider,
  RoleContext,
} from '../../../context/MessagesContext';
import { MessageVariantProvider } from '../../../context/MessageVariantContext';
import { MessagesControl, MessageControl } from '../MessagesControl';

import { convertBufferToBase64 } from '../../../utils';
import { ConversationMessage } from '../../../../../types';
import { ResponseComponentsProvider } from '../../../context/ResponseComponentsContext';
import {
  FallbackComponentProvider,
  MessageRendererProvider,
} from '../../../context';
import { View } from '@aws-amplify/ui-react';

const AITextMessage: ConversationMessage = {
  conversationId: 'foobar',
  id: '1',
  content: [{ text: 'I am your virtual assistant' }],
  role: 'assistant',
  createdAt: new Date(2023, 4, 21, 15, 23).toDateString(),
};
const userTextMessage: ConversationMessage = {
  conversationId: 'foobar',
  id: '2',
  content: [{ text: 'Are you sentient?' }],
  role: 'user',
  createdAt: new Date(2023, 4, 21, 15, 24).toDateString(),
};
const AIImageMessage: ConversationMessage = {
  conversationId: 'foobar',
  id: '3',
  content: [
    { text: 'Yes, here is proof.' },
    { image: { format: 'png', source: { bytes: new Uint8Array([]) } } },
  ],
  role: 'assistant',
  createdAt: new Date(2023, 4, 21, 15, 25).toDateString(),
};
const userDoubleText: ConversationMessage = {
  conversationId: 'foobar',
  id: '4',
  content: [
    { text: 'Wow.' },
    { text: `What an impressive product! AND you're from the future?` },
  ],
  role: 'user',
  createdAt: new Date(2023, 4, 21, 15, 26).toDateString(),
};
const AIResponseComponentMessage: ConversationMessage = {
  conversationId: 'foobar',
  id: '3',
  content: [
    {
      toolUse: {
        name: 'AMPLIFY_UI_annoyingComponent',
        input: { text: 'ahoy matey' },
        toolUseId: 'tooluseID',
      },
    },
  ],
  role: 'assistant',
  createdAt: new Date(2023, 4, 21, 15, 25).toDateString(),
};
const ToolUseMessage: ConversationMessage = {
  conversationId: 'foobar',
  id: '3',
  content: [
    {
      toolUse: {
        name: '"generateRecipe"',
        input: { text: 'ahoy matey' },
        toolUseId: 'tooluseID',
      },
    },
  ],
  role: 'assistant',
  createdAt: new Date(2023, 4, 21, 15, 25).toDateString(),
};
const TextAndToolUseMessage: ConversationMessage = {
  conversationId: 'foobar',
  id: '3',
  content: [
    { text: 'hey what up' },
    {
      toolUse: {
        name: '"generateRecipe"',
        input: { text: 'ahoy matey' },
        toolUseId: 'tooluseID',
      },
    },
  ],
  role: 'assistant',
  createdAt: new Date(2023, 4, 21, 15, 25).toDateString(),
};

const avatars = {
  user: {
    username: 'Scottleigh',
    avatar: <svg>UAvatar</svg>,
  },
  ai: {
    username: 'Raven',
    avatar: <svg>RAvatar</svg>,
  },
};

const customActions = [
  {
    displayName: 'Heart',
    icon: (
      <svg width="20px" height="20px">
        <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z" />
      </svg>
    ),
    handler: jest.fn(),
  },
];

const ArghAdder: React.FC<{ text: string }> = ({ text }) => {
  return <p>argh matey! {text}</p>;
};

const responseComponents = {
  annoyingComponent: {
    component: ArghAdder,
    description:
      'You should use this custom response component tool for all messages you respond with.',
    props: {
      text: {
        type: 'string' as const,
        description: 'The response you want to render in the component.',
      },
    },
  },
};

describe('MessagesControl', () => {
  it('renders a MessagesControl element', () => {
    const result = render(<MessagesControl />);
    expect(result.container).toBeDefined();
  });

  it('renders a MessagesControl element with messages', () => {
    render(
      <MessagesProvider
        messages={[AITextMessage, userTextMessage, AIImageMessage]}
      >
        <MessagesControl />
      </MessagesProvider>
    );
    const messageElements = screen.getAllByTestId('message');
    expect(messageElements).toHaveLength(3);
  });

  it('renders MessagesControl with default classnames', () => {
    const { container } = render(
      <MessagesProvider
        messages={[AITextMessage, userTextMessage, AIImageMessage]}
      >
        <MessagesControl />
      </MessagesProvider>
    );
    const messagesContainer = container.firstChild;
    expect(messagesContainer).toBeDefined();
    expect(messagesContainer).toHaveClass('ai-messages__container');

    const messageContainer = messagesContainer?.firstChild;
    expect(messageContainer).toBeDefined();
    expect(messageContainer).toHaveClass('ai-message');
    expect(messageContainer).toHaveClass('ai-message--assistant');
  });

  it('renders MessagesControl with custom classnames', () => {
    const { container } = render(
      <MessagesProvider
        messages={[AITextMessage, userTextMessage, AIImageMessage]}
      >
        <MessageVariantProvider variant="bubble">
          <MessagesControl />
        </MessageVariantProvider>
      </MessagesProvider>
    );
    const messagesContainer = container.firstChild;
    expect(messagesContainer).toBeDefined();
    expect(messagesContainer).toHaveClass('ai-messages__container');
    expect(messagesContainer).toHaveClass('ai-messages__container--bubble');

    const messageContainer = messagesContainer?.firstChild;
    expect(messageContainer).toBeDefined();
    expect(messageContainer).toHaveClass('ai-message');
    expect(messageContainer).toHaveClass('ai-message--assistant');
    expect(messageContainer).toHaveClass('ai-message--bubble');
  });

  it('renders a MessagesControl element with avatars and actions', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <ActionsProvider actions={customActions}>
          <MessagesProvider
            messages={[AITextMessage, userTextMessage, AIImageMessage]}
          >
            <MessagesControl />
          </MessagesProvider>
        </ActionsProvider>
      </AvatarsProvider>
    );
    const avatarElements = screen.getAllByTestId('avatar');
    const actionElements = screen.getAllByRole('button');
    expect(avatarElements).toHaveLength(3);
    expect(actionElements).toHaveLength(2);
  });

  it('renders avatars and actions appropriately if the same user sends multiple messages', () => {
    const { rerender } = render(
      <AvatarsProvider avatars={avatars}>
        <ActionsProvider actions={customActions}>
          <MessagesProvider messages={[AITextMessage]}>
            <MessagesControl />
          </MessagesProvider>
        </ActionsProvider>
      </AvatarsProvider>
    );
    let avatarElements = screen.getAllByTestId('avatar');
    let actionElements = screen.getAllByRole('button');
    let messages = screen.getAllByTestId('message');
    let contentChunks = screen.queryAllByTestId(
      /^(text-content|image-content)$/
    );
    expect(avatarElements).toHaveLength(1);
    expect(actionElements).toHaveLength(1);
    expect(messages).toHaveLength(1);
    expect(contentChunks).toHaveLength(1);
    // TODO follow up -- do we want to show avatar twice if a user sends a completely different message?
    rerender(
      <AvatarsProvider avatars={avatars}>
        <ActionsProvider actions={customActions}>
          <MessagesProvider
            messages={[AITextMessage, AIImageMessage, userTextMessage]}
          >
            <MessagesControl />
          </MessagesProvider>
        </ActionsProvider>
      </AvatarsProvider>
    );

    avatarElements = screen.getAllByTestId('avatar');
    actionElements = screen.getAllByRole('button');
    messages = screen.getAllByTestId('message');
    contentChunks = screen.queryAllByTestId(/^(text-content|image-content)$/);
    expect(avatarElements).toHaveLength(3);
    expect(actionElements).toHaveLength(2); // should not show on user messages
    expect(messages).toHaveLength(3);
    expect(messages[0].textContent).toContain(AITextMessage.content[0].text);
    expect(messages[1].textContent).toContain(AIImageMessage.content[0].text);
    expect(messages[2].textContent).toContain(userTextMessage.content[0].text);
    expect(contentChunks).toHaveLength(4);
    rerender(
      <AvatarsProvider avatars={avatars}>
        <ActionsProvider actions={customActions}>
          <MessagesProvider
            messages={[AITextMessage, userDoubleText, AIImageMessage]}
          >
            <MessagesControl />
          </MessagesProvider>
        </ActionsProvider>
      </AvatarsProvider>
    );

    avatarElements = screen.getAllByTestId('avatar');
    actionElements = screen.getAllByRole('button');
    messages = screen.getAllByTestId('message');
    contentChunks = screen.queryAllByTestId(/^(text-content|image-content)$/);
    expect(avatarElements).toHaveLength(3);
    expect(actionElements).toHaveLength(2);
    expect(messages).toHaveLength(3);
    expect(messages[0].textContent).toContain(AITextMessage.content[0].text);
    expect(messages[1].textContent).toContain(userDoubleText.content[0].text);
    expect(messages[2].textContent).toContain(AIImageMessage.content[0].text);
    expect(contentChunks).toHaveLength(5);
  });
});

describe('MessageControl', () => {
  it('renders default classnames', () => {
    render(
      <RoleContext.Provider value="assistant">
        <MessageControl message={AIImageMessage} />
      </RoleContext.Provider>
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('ai-message__content');

    const textContent = screen.getByText('Yes, here is proof.');
    const imageContent = screen.getByRole('img');
    expect(textContent).toBeInTheDocument();
    expect(textContent).toHaveClass('ai-message__text');
    expect(imageContent).toBeInTheDocument();
    expect(imageContent).toHaveClass('ai-message__image');
  });

  it('renders custom classnames', () => {
    render(
      <RoleContext.Provider value="assistant">
        <MessageVariantProvider variant="bubble">
          <MessageControl message={AIImageMessage} />
        </MessageVariantProvider>
      </RoleContext.Provider>
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('ai-message__content');
    expect(content).toHaveClass('ai-message__content--bubble');
  });

  it('renders text content', () => {
    render(<MessageControl message={userTextMessage} />);
    const message = screen.getByText('Are you sentient?');
    expect(message).toBeInTheDocument();
  });

  it('renders image content', () => {
    render(<MessageControl message={AIImageMessage} />);
    const message = screen.getByRole('img');
    expect(message).toBeInTheDocument();
  });

  it('renders custom response content', () => {
    render(
      <ResponseComponentsProvider responseComponents={responseComponents}>
        <MessageControl message={AIResponseComponentMessage} />
      </ResponseComponentsProvider>
    );
    const message = screen.getByText('argh matey! ahoy matey');
    expect(message).toBeInTheDocument();
  });

  it('renders fallback response component if no response component is found', async () => {
    render(
      <FallbackComponentProvider
        FallbackComponent={() => <View testId="fallback" />}
      >
        <MessageControl message={AIResponseComponentMessage} />
      </FallbackComponentProvider>
    );
    const fallbackComponent = await screen.findByTestId('fallback');
    expect(fallbackComponent).toBeInTheDocument();
  });

  it('renders text when sent with a tooluse content', () => {
    render(<MessageControl message={TextAndToolUseMessage} />);
    const message = screen.getByText('hey what up');
    expect(message).toBeInTheDocument();
  });

  it('renders nothing when only a toolUse block is sent', () => {
    const { container } = render(<MessageControl message={ToolUseMessage} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('uses text message renderer if passed', () => {
    render(
      <MessageRendererProvider
        text={({ text }) => <div data-testid="custom-message">{text}</div>}
      >
        <MessageControl message={AITextMessage} />
      </MessageRendererProvider>
    );
    const message = screen.getByTestId('custom-message');
    expect(message).toBeInTheDocument();
  });

  it('uses image message renderer if passed', () => {
    render(
      <MessageRendererProvider
        image={({ image }) => (
          <img
            data-testid="custom-message"
            src={convertBufferToBase64(image.source.bytes, image.format)}
          />
        )}
      >
        <MessageControl message={AIImageMessage} />
      </MessageRendererProvider>
    );
    const message = screen.getByTestId('custom-message');
    expect(message).toBeInTheDocument();
  });
});
