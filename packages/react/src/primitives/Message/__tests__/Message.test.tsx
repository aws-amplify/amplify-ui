import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Message } from '../Message';
import { MessageColorTheme, MessageVariation } from '../../types';
import { ComponentClassNames, ComponentText } from '../../shared/constants';

const MESSAGE_COLOR_THEMES: MessageColorTheme[] = [
  'info',
  'success',
  'warning',
  'error',
  'neutral',
];

const MESSAGE_VARIATIONS: MessageVariation[] = ['outlined', 'plain', 'filled'];

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
      messageHeading.classList.contains(ComponentClassNames.MessageHeading)
    ).toBe(true);
    expect(
      messageHeading.parentElement?.parentElement?.classList.contains(
        ComponentClassNames.Message
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

    expect(hasIcon.childElementCount).toBe(1);
    expect(noIcon.childElementCount).toBe(0);
    expect(defaultMessage.childElementCount).toBe(0);
    expect(
      hasIcon.firstElementChild?.classList.contains(
        ComponentClassNames.MessageIcon
      )
    ).toBe(true);
  });

  it('can include dismiss button', async () => {
    render(<Message isDismissible testId="messageIsDismissible" />);

    const isDismissible = await screen.findByTestId('messageIsDismissible');

    expect(isDismissible.childElementCount).toBe(1);
    expect(
      isDismissible.firstElementChild?.classList.contains(
        ComponentClassNames.MessageDismiss
      )
    ).toBe(true);
  });

  it('can configure an accessible label for the dismiss button', () => {
    const customDismissButtonLabel = 'Testing 123';
    render(
      <div>
        <Message isDismissible />
        <Message isDismissible dismissButtonLabel={customDismissButtonLabel} />
      </div>
    );

    const [defaultLabel, customLabel] = screen.queryAllByRole('button');
    expect(defaultLabel).toContainHTML(
      ComponentText.Message.dismissButtonLabel
    );
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
    expect(message.classList.contains(ComponentClassNames.Message)).toBe(true);
  });

  it('should forward ref to container DOM element', async () => {
    const testId = 'message';
    const ref = React.createRef<HTMLDivElement>();
    render(<Message ref={ref} testId={testId} />);

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
