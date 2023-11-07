import { render, screen } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';

import { ComponentClassName } from '@aws-amplify/ui';

import { Message } from '../Message';
import { MessageColorTheme, MessageProps } from '../../types';
import { ComponentText } from '../../shared/constants';

const MESSAGE_COLOR_THEMES: MessageColorTheme[] = [
  'info',
  'success',
  'warning',
  'error',
  'neutral',
];

const MESSAGE_VARIATIONS: MessageProps['variation'][] = [
  'outlined',
  'plain',
  'filled',
];

describe('Message', () => {
  it.each(MESSAGE_COLOR_THEMES)(
    'should render the %s color theme for the default variation',
    async (colorTheme) => {
      const testId = `message-${colorTheme}`;
      render(<Message testId={testId} colorTheme={colorTheme} />);
      const message = await screen.findByTestId(testId);
      expect(message.classList).toContain(`amplify-message--${colorTheme}`);
    }
  );

  it.each(MESSAGE_VARIATIONS)(
    'should render the %s color theme for the default variation',
    async (variation) => {
      const testId = `message-${variation}`;
      render(<Message testId={testId} variation={variation} />);
      const message = await screen.findByTestId(testId);
      expect(message.classList).toContain(`amplify-message--${variation}`);
    }
  );

  it('can render a heading for the message', async () => {
    render(<Message heading="Test heading" testId="messageHeading" />);

    const messageHeading = await screen.findByText('Test heading');
    expect(messageHeading.nodeName).toBe('DIV');
    expect(
      messageHeading.classList.contains(ComponentClassName.MessageHeading)
    ).toBe(true);
    expect(
      messageHeading.parentElement?.parentElement?.classList.contains(
        ComponentClassName.Message
      )
    ).toBe(true);
  });

  it('can render an icon', async () => {
    render(
      <div>
        <Message colorTheme="info" testId="messageHasIcon" />
        <Message colorTheme="info" hasIcon={false} testId="messageNoIcon" />
        <Message testId="neutralMessage" />
      </div>
    );

    const hasIcon = await screen.findByTestId('messageHasIcon');
    const noIcon = await screen.findByTestId('messageNoIcon');
    const defaultMessage = await screen.findByTestId('neutralMessage');

    expect(hasIcon.childElementCount).toBe(2);
    expect(noIcon.childElementCount).toBe(1);
    expect(defaultMessage.childElementCount).toBe(1);
    expect(
      hasIcon.firstElementChild?.classList.contains(
        ComponentClassName.MessageIcon
      )
    ).toBe(true);
    expect(
      noIcon.firstElementChild?.classList.contains(
        ComponentClassName.MessageIcon
      )
    ).toBe(false);
    expect(
      defaultMessage.firstElementChild?.classList.contains(
        ComponentClassName.MessageIcon
      )
    ).toBe(false);
  });

  it('can include dismiss button', async () => {
    render(<Message isDismissible testId="messageIsDismissible" />);

    const isDismissible = await screen.findByTestId('messageIsDismissible');

    expect(isDismissible.childElementCount).toBe(2);
    expect(
      isDismissible.lastElementChild?.classList.contains(
        ComponentClassName.MessageDismiss
      )
    ).toBe(true);
  });

  it('can configure an accessible label for the dismiss button', () => {
    const customDismissButtonLabel = 'Testing 123';
    render(
      <div>
        <Message isDismissible />
        <Message isDismissible dismissLabel={customDismissButtonLabel} />
      </div>
    );

    const [defaultLabel, customLabel] = screen.queryAllByRole('button');
    expect(defaultLabel).toContainHTML(ComponentText.Message.dismissLabel);
    expect(customLabel).toContainHTML(customDismissButtonLabel);
  });

  it('can apply styling via props', async () => {
    render(
      <Message
        backgroundColor="white"
        fontStyle="italic"
        testId="styledMessage"
      />
    );
    const styledMessage = await screen.findByTestId('styledMessage');
    expect(styledMessage).toHaveStyle({
      backgroundColor: 'var(--amplify-colors-white)',
      fontStyle: 'italic',
    });
  });

  it('can apply a custom className', async () => {
    render(<Message className="custom-message" testId="messageWithClass" />);
    const message = await screen.findByTestId('messageWithClass');
    expect(message.classList.contains('custom-message')).toBe(true);
    expect(message.classList.contains(ComponentClassName.Message)).toBe(true);
  });

  it('should forward ref to container DOM element', async () => {
    const testId = 'message';
    const ref = React.createRef<HTMLDivElement>();
    render(<Message ref={ref} testId={testId} />);

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('should fire onDismiss passed as prop to Message', async () => {
    const onDismiss = jest.fn();
    render(<Message isDismissible={true} onDismiss={onDismiss}></Message>);

    const button = await screen.findByRole('button');
    await userEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
