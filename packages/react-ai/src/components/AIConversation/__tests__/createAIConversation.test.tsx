import React from 'react';
import { render } from '@testing-library/react';
import { createAIConversation } from '../createAIConversation';
import { avatars, messages } from '../mocks/mocks';
import { SendMessage } from '../../../types';

describe('createAIConversation', () => {
  it('returns an AIConversation', async () => {
    const { AIConversation } = createAIConversation();

    const sendMessage: SendMessage = () => {};
    expect(
      await render(
        <AIConversation
          messages={messages}
          avatars={avatars}
          handleSendMessage={sendMessage}
        />
      ).container
    ).toBeDefined();
  });
});
