import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { ComponentClassNames } from '../../shared';

describe('Badge: ', () => {
  const badgeText = 'Badge primitive';

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
    expect(ref.current.nodeName).toBe('SPAN');
    expect(ref.current.innerHTML).toBe(badgeText);
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
