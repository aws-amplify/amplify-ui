import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { Message } from '../Message';
import { ComponentClassNames } from '../../shared/constants';

describe('MessageDismiss', () => {
  it('should forward ref to Message.Dismiss container DOM element', async () => {
    const testId = 'messageDismiss';
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Message>
        <Message.Dismiss ref={ref} testId={testId} />
      </Message>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('BUTTON');
  });
  it('can apply a custom className', async () => {
    render(
      <Message>
        <Message.Dismiss
          className="custom-message-dismiss"
          testId="messageDismissWithClass"
        />
      </Message>
    );
    const message = await screen.findByTestId('messageDismissWithClass');
    expect(message.classList.contains('custom-message-dismiss')).toBe(true);
    expect(message.classList.contains(ComponentClassNames.MessageDismiss)).toBe(
      true
    );
  });
  it('can apply styling via props', async () => {
    render(
      <Message>
        <Message.Dismiss
          testId="messageDismissWithStyles"
          backgroundColor="pink.20"
          fontStyle="italic"
        />
      </Message>
    );
    const styledMessage = await screen.findByTestId('messageDismissWithStyles');
    expect(styledMessage).toHaveStyle({
      backgroundColor: 'var(--amplify-colors-pink-20)',
      fontStyle: 'italic',
    });
  });

  it('should fire onDismiss passed as prop to Message', async () => {
    const onDismiss = jest.fn();
    render(<Message isDismissible={true} onDismiss={onDismiss}></Message>);

    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should fire onDismiss passed via prop to Dismiss button', async () => {
    const onDismiss = jest.fn();
    render(
      <Message.Container>
        <Message.Dismiss onDismiss={onDismiss} />
      </Message.Container>
    );

    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
  it('renders a close icon via hasIcon prop', async () => {
    render(
      <div>
        <Message.Dismiss testId="dismissWithIcon" />

        <Message.Dismiss hasIcon={false} testId="dismissWithNoIcon" />
      </div>
    );

    const hasIcon = await screen.findByTestId('dismissWithIcon');
    const noIcon = await screen.findByTestId('dismissWithNoIcon');

    expect(hasIcon.childElementCount).toBe(2);
    expect(noIcon.childElementCount).toBe(1);
    expect(
      hasIcon.firstElementChild?.classList.contains(ComponentClassNames.Icon)
    ).toBe(true);
    expect(
      noIcon.firstElementChild?.classList.contains(ComponentClassNames.Icon)
    ).toBe(false);
  });
  it('does not render default accessible label when child content is passed', async () => {
    render(
      <Message.Dismiss testId="dismissWithCustomContent">
        <div className="custom-dismiss-content">
          Custom dismiss button label
        </div>
      </Message.Dismiss>
    );

    const message = await screen.findByTestId('dismissWithCustomContent');

    expect(message.childElementCount).toBe(2);
    expect(
      message.firstElementChild?.classList.contains(ComponentClassNames.Icon)
    ).toBe(true);
    expect(
      message.lastElementChild?.classList.contains(
        ComponentClassNames.VisuallyHidden
      )
    ).toBe(false);
  });
});
