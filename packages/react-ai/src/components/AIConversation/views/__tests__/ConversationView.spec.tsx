import React from 'react';
import { render } from '@testing-library/react';
import ConversationView from '../ConversationView';

describe('ConversationView', () => {
  it('renders a ConversationView element', () => {
    expect(render(<ConversationView />).container).toBeDefined();
  });
});
