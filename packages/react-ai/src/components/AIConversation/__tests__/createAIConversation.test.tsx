import React from 'react';
import { render } from '@testing-library/react';
import { createAIConversation } from '../createAIConversation';

describe('createAIConversation', () => {
  it('returns an AIConversation', async () => {
    const { AIConversation } = createAIConversation();

    expect(await render(<AIConversation />).container).toBeDefined();
  });
});
