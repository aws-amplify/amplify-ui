import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { AIConversation } from '../AIConversation';
import { AIConversationProps } from '../types';

Element.prototype.scrollTo = jest.fn();

describe('AIConversation', () => {
  const defaultProps: AIConversationProps = {
    handleSendMessage: jest.fn(),
    messages: [
      {
        role: 'user',
        content: [{ text: 'hello' }],
        conversationId: '123',
        id: '123',
        createdAt: new Date().toISOString(),
      },
      {
        role: 'assistant',
        content: [{ text: 'hello' }],
        conversationId: 'XXX',
        id: '123',
        createdAt: new Date().toISOString(),
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<AIConversation {...defaultProps} />);
    expect(screen.getByTestId('ai-conversation')).toBeInTheDocument();
  });

  it('renders with custom avatars', () => {
    const customAvatars = {
      ai: {
        username: 'Custom AI',
        avatar: <div data-testid="custom-ai-avatar">AI</div>,
      },
      user: {
        username: 'Custom User',
        avatar: <div data-testid="custom-user-avatar">User</div>,
      },
    };

    render(<AIConversation {...defaultProps} avatars={customAvatars} />);

    expect(screen.getByTestId('custom-ai-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('custom-user-avatar')).toBeInTheDocument();
  });

  it('renders with default avatars when not provided', () => {
    render(<AIConversation {...defaultProps} />);

    // Verify default icons are rendered
    expect(screen.getByTestId('icon-assistant')).toBeInTheDocument();
    expect(screen.getByTestId('icon-user')).toBeInTheDocument();
  });

  it('renders with custom controls', () => {
    const CustomMessageList = () => (
      <div data-testid="custom-message-list">Custom Messages</div>
    );
    const CustomForm = () => <div data-testid="custom-form">Custom Form</div>;

    const customControls = {
      MessageList: CustomMessageList,
      Form: CustomForm,
    };

    render(<AIConversation {...defaultProps} controls={customControls} />);

    expect(screen.getByTestId('custom-message-list')).toBeInTheDocument();
    expect(screen.getByTestId('custom-form')).toBeInTheDocument();
  });

  it('exports required subcomponents', () => {
    expect(AIConversation.Provider).toBeDefined();
    expect(AIConversation.DefaultMessage).toBeDefined();
    expect(AIConversation.Messages).toBeDefined();
    expect(AIConversation.Form).toBeDefined();
  });
});
