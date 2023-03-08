import * as React from 'react';

import { Card } from '../Card';
import { render, screen } from '@testing-library/react';
import { ComponentClassNames } from '../../shared';

const testId = 'cardId';

describe('Card component', () => {
  it('should render card variations', async () => {
    render(
      <div>
        <Card variation="outlined" testId="outlined">
          outlined
        </Card>
        <Card variation="elevated" testId="elevated">
          elevated
        </Card>
      </div>
    );

    const outlined = await screen.findByTestId('outlined');
    const elevated = await screen.findByTestId('elevated');

    expect(outlined.classList).toContain(
      `${ComponentClassNames['Card']}--outlined`
    );
    expect(elevated.classList).toContain(
      `${ComponentClassNames['Card']}--elevated`
    );
  });

  it('can render custom classnames', async () => {
    render(<Card className="custom-classname" testId={testId}></Card>);

    const card = await screen.findByTestId(testId);
    expect(card.className).toContain('custom-classname');
    expect(card.className).toContain(ComponentClassNames.Card);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const cardContent = 'Hello there';

    render(
      <Card ref={ref} testId={testId}>
        {cardContent}
      </Card>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
    expect(ref.current?.innerHTML).toBe(cardContent);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Card data-demo="true" testId={testId}></Card>);
    const card = await screen.findByTestId(testId);
    expect(card.dataset['demo']).toBe('true');
  });

  it('can render <section> tag', async () => {
    render(<Card as="section" testId={testId}></Card>);
    const card = await screen.findByTestId(testId);
    expect(card.nodeName).toBe('SECTION');
  });
});
