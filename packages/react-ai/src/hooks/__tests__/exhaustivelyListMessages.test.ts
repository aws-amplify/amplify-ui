import { exhaustivelyListMessages } from '../exhaustivelyListMessages';
import { Conversation, ConversationMessage } from '../../types';

const mockConversation = {
  listMessages: jest.fn(),
};

describe('exhaustivelyListMessages', () => {
  beforeEach(() => {
    mockConversation.listMessages.mockClear();
  });

  it('should return all messages when there is no pagination', async () => {
    const mockMessages: ConversationMessage[] = [
      {
        id: '1',
        content: [{ text: 'Hello' }],
        conversationId: '1',
        createdAt: new Date().toISOString(),
        role: 'user',
      },
      {
        id: '2',
        content: [{ text: 'World' }],
        conversationId: '1',
        createdAt: new Date().toISOString(),
        role: 'assistant',
      },
    ];

    mockConversation.listMessages.mockResolvedValueOnce({
      data: mockMessages,
      nextToken: undefined,
    });

    const result = await exhaustivelyListMessages({
      conversation: mockConversation as unknown as Conversation,
    });

    expect(result.data).toEqual(mockMessages);
    expect(mockConversation.listMessages).toHaveBeenCalledTimes(1);
    expect(mockConversation.listMessages).toHaveBeenCalledWith({
      nextToken: undefined,
    });
  });

  it('should handle pagination and return all messages', async () => {
    const mockMessages1: ConversationMessage[] = [
      {
        id: '1',
        content: [{ text: 'Hello' }],
        conversationId: '1',
        createdAt: new Date().toISOString(),
        role: 'user',
      },
      {
        id: '2',
        content: [{ text: 'World' }],
        conversationId: '1',
        createdAt: new Date().toISOString(),
        role: 'assistant',
      },
    ];
    const mockMessages2: ConversationMessage[] = [
      {
        id: '3',
        content: [{ text: 'Goodbye' }],
        conversationId: '1',
        createdAt: new Date().toISOString(),
        role: 'user',
      },
      {
        id: '4',
        content: [{ text: 'Moon' }],
        conversationId: '1',
        createdAt: new Date().toISOString(),
        role: 'assistant',
      },
    ];

    mockConversation.listMessages
      .mockResolvedValueOnce({
        data: mockMessages1,
        nextToken: 'token1',
      })
      .mockResolvedValueOnce({
        data: mockMessages2,
        nextToken: undefined,
      });

    const result = await exhaustivelyListMessages({
      conversation: mockConversation as unknown as Conversation,
    });

    expect(result.data).toEqual([...mockMessages1, ...mockMessages2]);
    expect(mockConversation.listMessages).toHaveBeenCalledTimes(2);
    expect(mockConversation.listMessages).toHaveBeenNthCalledWith(1, {
      nextToken: undefined,
    });
    expect(mockConversation.listMessages).toHaveBeenNthCalledWith(2, {
      nextToken: 'token1',
    });
  });

  it('should handle empty response', async () => {
    mockConversation.listMessages.mockResolvedValueOnce({
      data: [],
      nextToken: undefined,
    });

    const result = await exhaustivelyListMessages({
      conversation: mockConversation as unknown as Conversation,
    });

    expect(result.data).toEqual([]);
    expect(mockConversation.listMessages).toHaveBeenCalledTimes(1);
    expect(mockConversation.listMessages).toHaveBeenCalledWith({
      nextToken: undefined,
    });
  });

  it('should handle errors gracefully', async () => {
    const mockError = new Error('API Error');
    mockConversation.listMessages.mockRejectedValueOnce(mockError);

    await expect(
      exhaustivelyListMessages({
        conversation: mockConversation as unknown as Conversation,
      })
    ).rejects.toThrow('API Error');
    expect(mockConversation.listMessages).toHaveBeenCalledTimes(1);
    expect(mockConversation.listMessages).toHaveBeenCalledWith({
      nextToken: undefined,
    });
  });
});
