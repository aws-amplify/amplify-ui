import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Alert } from '../Alert';
import { ComponentClassNames, ComponentText } from '../../shared/constants';

describe('Alert: ', () => {
  it('can render Alert variations', async () => {
    render(
      <div>
        <Alert variation="info" testId="info">
          Info
        </Alert>
        <Alert variation="error" testId="error">
          Error
        </Alert>
        <Alert variation="warning" testId="warning">
          Warning
        </Alert>
        <Alert variation="success" testId="success">
          Success
        </Alert>
        <Alert testId="default">Default</Alert>
      </div>
    );

    const info = await screen.findByTestId('info');
    const error = await screen.findByTestId('error');
    const warning = await screen.findByTestId('warning');
    const success = await screen.findByTestId('success');
    const defaultAlert = await screen.findByTestId('default');

    expect(info.dataset['variation']).toBe('info');
    expect(info.classList).toContain(`${ComponentClassNames['Alert']}--info`);
    expect(error.dataset['variation']).toBe('error');
    expect(error.classList).toContain(`${ComponentClassNames['Alert']}--error`);
    expect(warning.dataset['variation']).toBe('warning');
    expect(warning.classList).toContain(
      `${ComponentClassNames['Alert']}--warning`
    );
    expect(success.dataset['variation']).toBe('success');
    expect(success.classList).toContain(
      `${ComponentClassNames['Alert']}--success`
    );
    expect(defaultAlert.dataset['variation']).toBe(undefined);
  });

  it('can render a heading for the alert', async () => {
    render(
      <Alert heading="Test heading" testId="alertHeading">
        Testing the alert heading
      </Alert>
    );

    const alertHeading = await screen.findByText('Test heading');
    expect(alertHeading.nodeName).toBe('DIV');
    expect(
      alertHeading.classList.contains(ComponentClassNames.AlertHeading)
    ).toBe(true);
    expect(
      alertHeading.parentElement?.parentElement?.classList.contains(
        ComponentClassNames.Alert
      )
    ).toBe(true);
  });

  it('can render an icon via the hasIcon prop', async () => {
    render(
      <div>
        <Alert variation="info" testId="hasIcon">
          Has Icon
        </Alert>
        <Alert variation="info" hasIcon={false} testId="noIcon">
          No Icon
        </Alert>
        <Alert testId="default">Default Alert Without Icon</Alert>
      </div>
    );

    const hasIcon = await screen.findByTestId('hasIcon');
    const noIcon = await screen.findByTestId('noIcon');
    const defaultAlert = await screen.findByTestId('default');

    expect(hasIcon.childElementCount).toBe(2);
    expect(noIcon.childElementCount).toBe(1);
    expect(defaultAlert.childElementCount).toBe(1);
    expect(
      hasIcon.firstElementChild?.classList.contains(ComponentClassNames.Icon)
    ).toBe(true);
    expect(
      noIcon.firstElementChild?.classList.contains(ComponentClassNames.Icon)
    ).toBe(false);
  });

  it('can be dismissible', async () => {
    render(
      <div>
        <Alert testId="notDismissible">Not dismissible by default</Alert>
        <Alert isDismissible={true} testId="isDismissible">
          Is dismissible
        </Alert>
      </div>
    );

    const notDismissible = await screen.findByTestId('notDismissible');
    const isDismissible = await screen.findByTestId('isDismissible');

    expect(notDismissible.childElementCount).toBe(1);
    expect(isDismissible.childElementCount).toBe(2);
  });

  it('should set aria-hidden to be true on decorative icons', async () => {
    const { container } = render(
      <div>
        <Alert variation="info" isDismissible={true} testId="hasIcon">
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

  it('can configure an accessible label for the dismiss button', async () => {
    const customDismissButtonLabel = 'Testing 123';
    render(
      <div>
        <Alert isDismissible>Default dismiss button label</Alert>
        <Alert isDismissible dismissButtonLabel={customDismissButtonLabel}>
          Custom dismiss button label
        </Alert>
      </div>
    );

    const [defaultLabel, customLabel] = await screen.queryAllByRole('button');
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

  describe('Forward ref: ', () => {
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
