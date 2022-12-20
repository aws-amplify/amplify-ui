import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { ComponentClassNames } from '../../shared';

describe('Badge: ', () => {
  const badgeText = 'Badge primitive';

  it('can render badge variations', async () => {
    render(
      <div>
        <Badge variation="info" testId="info">
          Info
        </Badge>
        <Badge variation="error" testId="error">
          Error
        </Badge>
        <Badge variation="warning" testId="warning">
          Warning
        </Badge>
        <Badge variation="success" testId="success">
          Success
        </Badge>
        <Badge testId="default">Default</Badge>
      </div>
    );

    const info = await screen.findByTestId('info');
    const error = await screen.findByTestId('error');
    const warning = await screen.findByTestId('warning');
    const success = await screen.findByTestId('success');
    const defaultAlert = await screen.findByTestId('default');

    expect(info.dataset['variation']).toBe('info');
    expect(info.classList).toContain(`${ComponentClassNames['Badge']}--info`);
    expect(error.dataset['variation']).toBe('error');
    expect(error.classList).toContain(`${ComponentClassNames['Badge']}--error`);
    expect(warning.dataset['variation']).toBe('warning');
    expect(warning.classList).toContain(
      `${ComponentClassNames['Badge']}--warning`
    );
    expect(success.dataset['variation']).toBe('success');
    expect(success.classList).toContain(
      `${ComponentClassNames['Badge']}--success`
    );
    expect(defaultAlert.dataset['variation']).toBe(undefined);
  });

  it('can render badge sizes', async () => {
    render(
      <div>
        <Badge size="small" testId="small">
          Small
        </Badge>
        <Badge size="large" testId="large">
          Large
        </Badge>
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassNames['Badge']}--small`);
    expect(large.classList).toContain(`${ComponentClassNames['Badge']}--large`);
  });

  it('can apply styling via props', async () => {
    render(
      <Badge variation="success" size="large">
        {badgeText}
      </Badge>
    );
    const badge = await screen.findByText(badgeText);
    expect(badge.dataset['variation']).toBe('success');
    expect(badge.dataset['size']).toBe('large');
  });

  it('can apply a custom className', async () => {
    render(<Badge className="custom-badge">{badgeText}</Badge>);
    const badge = await screen.findByText(badgeText);
    expect(badge.classList.contains('custom-badge')).toBe(true);
    expect(badge.classList.contains(ComponentClassNames.Badge)).toBe(true);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<Badge ref={ref}>{badgeText}</Badge>);

    await screen.findByText(badgeText);
    expect(ref.current?.nodeName).toBe('SPAN');
    expect(ref.current?.innerHTML).toBe(badgeText);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Badge data-demo="true" testId="dataTest">
        {badgeText}
      </Badge>
    );
    const badge = await screen.findByTestId('dataTest');
    expect(badge.dataset['demo']).toBe('true');
  });
});
