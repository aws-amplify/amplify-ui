import { Card } from '../Card';
import { render, screen } from '@testing-library/react';
import { ComponentClassNames } from '../../shared';

describe('Card component', () => {
  it('can render custom classnames', async () => {
    render(<Card className="custom-classname" testId="cardId"></Card>);

    const card = await screen.findByTestId('cardId');
    expect(card.className).toContain('custom-classname');
    expect(card.className).toContain(ComponentClassNames.Card);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Card data-demo="true" testId="cardId"></Card>);
    const card = await screen.findByTestId('cardId');
    expect(card.dataset['demo']).toBe('true');
  });

  it('can render <section> tag', async () => {
    render(<Card as="section" testId="cardId"></Card>);
    const card = await screen.findByTestId('cardId');
    expect(card.nodeName).toBe('SECTION');
  });
});
