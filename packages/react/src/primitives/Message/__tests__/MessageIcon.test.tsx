import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Message } from '../Message';
import { ComponentClassNames } from '../../shared/constants';

describe('MessageIcon', () => {
  it('should forward ref to Message.Icon container DOM element', async () => {
    const testId = 'messageIcon';
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Message colorTheme="info">
        <Message.Icon ref={ref} testId={testId} />
      </Message>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
  it('can apply a custom className', async () => {
    render(
      <Message colorTheme="info">
        <Message.Icon
          className="custom-message-icon"
          testId="messageIconWithClass"
        />
      </Message>
    );
    const messageIconWithClass = await screen.findByTestId(
      'messageIconWithClass'
    );
    expect(messageIconWithClass.classList.contains('custom-message-icon')).toBe(
      true
    );
    expect(
      messageIconWithClass.classList.contains(ComponentClassNames.MessageIcon)
    ).toBe(true);
  });
  it('can apply styling via props', async () => {
    render(
      <Message colorTheme="info">
        <Message.Icon
          testId="messageIconWithStyles"
          backgroundColor="green.60"
          color="neutral.10"
        />
      </Message>
    );
    const styledMessageIcon = await screen.findByTestId(
      'messageIconWithStyles'
    );
    expect(styledMessageIcon).toHaveStyle({
      backgroundColor: 'var(--amplify-colors-green-60)',
      color: 'var(--amplify-colors-neutral-10)',
    });
  });
});
