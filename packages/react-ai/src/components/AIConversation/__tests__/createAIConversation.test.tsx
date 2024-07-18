import React from 'react';
import { render } from '@testing-library/react';
import { createAIConversation } from '../createAIConversation';
import { avatars, messages } from '../mocks/mocks';

describe('createAIConversation', () => {
  it('returns an AIConversation', async () => {
    const { AIConversation } = createAIConversation();

    expect(
      await render(<AIConversation messages={messages} avatars={avatars} />)
        .container
    ).toBeDefined();
  });
});
