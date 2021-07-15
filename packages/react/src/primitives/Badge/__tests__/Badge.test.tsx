import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Badge } from '../Badge';

describe('Badge: ', () => {
  const badgeText = 'Badge primitive';

  it('can apply styling via props', async () => {
    render(
      <Badge variant="success" size="large">
        {badgeText}
      </Badge>
    );
    const badge = await screen.findByText(badgeText);
    expect(badge.dataset['variant']).toBe('success');
    expect(badge.dataset['size']).toBe('large');
  });

  it('can apply a custom className', async () => {
    render(<Badge className="custom-badge">{badgeText}</Badge>);
    const badge = await screen.findByText(badgeText);
    expect(badge.classList.contains('custom-badge')).toBe(true);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Badge data-demo="true" id="dataTest">
        {badgeText}
      </Badge>
    );
    const badge = await screen.findByTestId('dataTest');
    expect(badge.dataset['demo']).toBe('true');
  });
});
