import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Message } from '../Message';
import { ComponentClassNames } from '../../shared/constants';

describe('MessageHeading', () => {
  it('should forward ref to Message.Heading container DOM element', async () => {
    const testId = 'messageHeading';
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Message>
        <Message.Heading ref={ref} testId={testId}>
          Message heading
        </Message.Heading>
      </Message>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
  it('can apply a custom className', async () => {
    render(
      <Message>
        <Message.Heading
          className="custom-message-heading"
          testId="messageHeadingWithClass"
        >
          Message heading
        </Message.Heading>
      </Message>
    );
    const message = await screen.findByTestId('messageHeadingWithClass');
    expect(message.classList.contains('custom-message-heading')).toBe(true);
    expect(message.classList.contains(ComponentClassNames.MessageHeading)).toBe(
      true
    );
  });
  it('can apply styling via props', async () => {
    render(
      <Message>
        <Message.Heading
          testId="messageHeadingWithStyles"
          backgroundColor="white"
          fontStyle="italic"
        >
          Message heading
        </Message.Heading>
      </Message>
    );
    const styledMessage = await screen.findByTestId('messageHeadingWithStyles');
    expect(styledMessage).toHaveStyle({
      backgroundColor: 'var(--amplify-colors-white)',
      fontStyle: 'italic',
    });
  });
});
