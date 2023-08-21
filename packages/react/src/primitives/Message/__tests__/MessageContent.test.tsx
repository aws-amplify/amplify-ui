import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Message } from '../Message';
import { ComponentClassNames } from '../../shared/constants';

describe('MessageContent', () => {
  it('should forward ref to Message.Content container DOM element', async () => {
    const testId = 'messageContent';
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Message>
        <Message.Content ref={ref} testId={testId}>
          Message content
        </Message.Content>
      </Message>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
  it('can apply a custom className', async () => {
    render(
      <Message>
        <Message.Content
          className="custom-message-content"
          testId="messageContentWithClass"
        >
          Message heading
        </Message.Content>
      </Message>
    );
    const messageContentWithClass = await screen.findByTestId(
      'messageContentWithClass'
    );
    expect(
      messageContentWithClass.classList.contains('custom-message-content')
    ).toBe(true);
    expect(
      messageContentWithClass.classList.contains(
        ComponentClassNames.MessageContent
      )
    ).toBe(true);
  });
  it('can apply styling via props', async () => {
    render(
      <Message>
        <Message.Heading
          testId="messageContentWithStyles"
          gap="large"
          direction="row"
        >
          Message heading
        </Message.Heading>
      </Message>
    );
    const styledMessageContent = await screen.findByTestId(
      'messageContentWithStyles'
    );
    expect(styledMessageContent).toHaveStyle({
      gap: 'var(--amplify-space-large)',
      flexDirection: 'row',
    });
  });
});
