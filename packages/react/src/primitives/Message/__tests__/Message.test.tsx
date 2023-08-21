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
        <Message colorTheme="info" testId="messageHasIcon" content="Has icon" />
        <Message
          colorTheme="info"
          hasIcon={false}
          testId="messageNoIcon"
          content="Does not have icon"
        />
        <Message
          testId="neutralMessage"
          content="Neutral message without an icon"
        />
      </div>
    );

    const hasIcon = await screen.findByTestId('messageHasIcon');
    const noIcon = await screen.findByTestId('messageNoIcon');
    const defaultAlert = await screen.findByTestId('neutralMessage');

    expect(hasIcon.childElementCount).toBe(2);
    expect(noIcon.childElementCount).toBe(1);
    expect(defaultAlert.childElementCount).toBe(1);
    expect(
      hasIcon.firstElementChild?.classList.contains(
        ComponentClassNames.MessageIcon
      )
    ).toBe(true);
    expect(
      noIcon.firstElementChild?.classList.contains(
        ComponentClassNames.MessageIcon
      )
    ).toBe(false);
  });

  it('can be dismissible', async () => {
    render(
      <div>
        <Message
          testId="messageNotDismissible"
          content="Not dismissible by default"
        />
        <Message isDismissible testId="messageIsDismissible" />
      </div>
    );

    const notDismissible = await screen.findByTestId('notDismissible');
    const isDismissible = await screen.findByTestId('isDismissible');

    expect(notDismissible.childElementCount).toBe(1);
    expect(isDismissible.childElementCount).toBe(2);
  });

  it('should set aria-hidden to be true on decorative icons', () => {
    const { container } = render(
      <div>
        <Alert variation="info" isDismissible testId="hasIcon">
          Has Icon
        </Alert>
      </div>
    );
    const icons = container.querySelectorAll(`.${ComponentClassNames.Icon}`);
    expect(icons.length).toEqual(2);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('can configure an accessible label for the dismiss button', () => {
    const customDismissButtonLabel = 'Testing 123';
    render(
      <div>
        <Alert isDismissible>Default dismiss button label</Alert>
        <Alert isDismissible dismissButtonLabel={customDismissButtonLabel}>
          Custom dismiss button label
        </Alert>
      </div>
    );

    const [defaultLabel, customLabel] = screen.queryAllByRole('button');
    expect(defaultLabel.getAttribute('aria-label')).toBe(
      ComponentText.Alert.dismissButtonLabel
    );
    expect(customLabel.getAttribute('aria-label')).toBe(
      customDismissButtonLabel
    );
  });

  it('renders as an aria alert', async () => {
    render(<Alert testId="ariaAlertID">Alert with an aria role</Alert>);

    const alert = await screen.findByRole('alert');
    expect(alert).toBeDefined();
  });

  it('can allow role override', async () => {
    render(
      <Alert role="none" testId="noAlertRole">
        Alert with role overridden
      </Alert>
    );

    const alert = await screen.findByTestId('noAlertRole');
    expect(alert).toHaveAttribute('role', 'none');
  });

  it('can apply styling via props', async () => {
    render(
      <Alert backgroundColor="white" fontStyle="italic" testId="alertId">
        Test alert
      </Alert>
    );
    const alert = await screen.findByTestId('alertId');
    expect(alert).toHaveStyle({
      backgroundColor: 'var(--amplify-colors-white)',
      fontStyle: 'italic',
    });
  });

  it('can apply a custom className', async () => {
    render(<Alert className="custom-alert" testId="alertId"></Alert>);
    const alert = await screen.findByTestId('alertId');
    expect(alert.classList.contains('custom-alert')).toBe(true);
    expect(alert.classList.contains(ComponentClassNames.Alert)).toBe(true);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Alert data-demo="true" testId="dataTest"></Alert>);
    const alert = await screen.findByTestId('dataTest');
    expect(alert.dataset['demo']).toBe('true');
  });

  describe('Forward ref:', () => {
    it('should forward ref to container DOM element', async () => {
      const testId = 'alert';
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref} testId={testId} />);

      await screen.findByTestId(testId);
      expect(ref.current?.nodeName).toBe('DIV');
    });

    it('should forward ref to dismiss button DOM element', async () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Alert buttonRef={ref} isDismissible />);

      await screen.findByRole('button');
      expect(ref.current?.nodeName).toBe('BUTTON');
    });
  });
});
