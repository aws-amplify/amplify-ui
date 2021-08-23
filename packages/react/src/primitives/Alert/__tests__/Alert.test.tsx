import { render, screen } from '@testing-library/react';
import { Alert } from '../Alert';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { kebabCase } from 'lodash';
import { createPortal } from 'react-dom';

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
    expect(error.dataset['variation']).toBe('error');
    expect(warning.dataset['variation']).toBe('warning');
    expect(success.dataset['variation']).toBe('success');
    expect(defaultAlert.dataset['variation']).toBe(undefined);
  });

  it('can render a title for the alert', async () => {
    render(
      <Alert title="Test title" testId="alertTitle">
        Testing the alert title
      </Alert>
    );

    const alert = await screen.findByText('Test title');
    expect(alert.nodeName).toBe('H6');
    expect(
      alert.parentElement.parentElement.parentElement.classList.contains(
        ComponentClassNames.Alert
      )
    ).toBe(true);
  });

  it('can render an icon via the withIcon prop', async () => {
    render(
      <div>
        <Alert variation="info" testId="withIcon">
          With Icon
        </Alert>
        <Alert variation="info" withIcon={false} testId="withoutIcon">
          Without Icon
        </Alert>
        <Alert testId="default">Default Alert Without Icon</Alert>
      </div>
    );

    const withIcon = await screen.findByTestId('withIcon');
    const withoutIcon = await screen.findByTestId('withoutIcon');
    const defaultAlert = await screen.findByTestId('default');

    expect(withIcon.firstElementChild.childElementCount).toBe(2);
    expect(withoutIcon.firstElementChild.childElementCount).toBe(1);
    expect(defaultAlert.firstElementChild.childElementCount).toBe(1);
    expect(
      withIcon.firstElementChild.firstElementChild.classList.contains(
        ComponentClassNames.Icon
      )
    ).toBe(true);
    expect(
      withoutIcon.firstElementChild.firstElementChild.classList.contains(
        ComponentClassNames.Icon
      )
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

  it('can apply styling via props', async () => {
    render(
      <Alert backgroundColor="white" fontStyle="italic" testId="alertId">
        Test alert
      </Alert>
    );
    const alert = await screen.findByTestId('alertId');
    expect(
      alert.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.backgroundColor)
      )
    ).toBe('white');
    expect(
      alert.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontStyle)
      )
    ).toBe('italic');
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
});
