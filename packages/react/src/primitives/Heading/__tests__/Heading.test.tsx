import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { render, screen } from '@testing-library/react';

import { Heading } from '../Heading';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';

describe('Heading: ', () => {
  it('renders an h6 tag by default', async () => {
    render(<Heading testId="headingId"></Heading>);

    const heading = await screen.findByTestId('headingId');
    expect(heading.nodeName).toBe('H6');
  });

  it('should render the heading classes', async () => {
    render(
      <div>
        <Heading level={1} testId="h1">
          H1
        </Heading>
        <Heading level={2} testId="h2">
          H2
        </Heading>
        <Heading level={3} testId="h3">
          H3
        </Heading>
        <Heading level={4} testId="h4">
          H4
        </Heading>
        <Heading level={5} testId="h5">
          H5
        </Heading>
        <Heading level={6} testId="h6">
          H6
        </Heading>
      </div>
    );

    const h1 = await screen.findByTestId('h1');
    const h2 = await screen.findByTestId('h2');
    const h3 = await screen.findByTestId('h3');
    const h4 = await screen.findByTestId('h4');
    const h5 = await screen.findByTestId('h5');
    const h6 = await screen.findByTestId('h6');

    expect(h1.classList).toContain(`${ComponentClassNames['Heading']}--1`);
    expect(h2.classList).toContain(`${ComponentClassNames['Heading']}--2`);
    expect(h3.classList).toContain(`${ComponentClassNames['Heading']}--3`);
    expect(h4.classList).toContain(`${ComponentClassNames['Heading']}--4`);
    expect(h5.classList).toContain(`${ComponentClassNames['Heading']}--5`);
    expect(h6.classList).toContain(`${ComponentClassNames['Heading']}--6`);
  });

  it('renders h1-h6 tags by passing level prop', async () => {
    render(
      <div>
        <Heading level={1} testId="h1">
          H1
        </Heading>
        <Heading level={2} testId="h2">
          H2
        </Heading>
        <Heading level={3} testId="h3">
          H3
        </Heading>
        <Heading level={4} testId="h4">
          H4
        </Heading>
        <Heading level={5} testId="h5">
          H5
        </Heading>
        <Heading level={6} testId="h6">
          H6
        </Heading>
      </div>
    );

    const h1 = await screen.findByTestId('h1');
    const h2 = await screen.findByTestId('h2');
    const h3 = await screen.findByTestId('h3');
    const h4 = await screen.findByTestId('h4');
    const h5 = await screen.findByTestId('h5');
    const h6 = await screen.findByTestId('h6');

    expect(h1.nodeName).toBe('H1');
    expect(h2.nodeName).toBe('H2');
    expect(h3.nodeName).toBe('H3');
    expect(h4.nodeName).toBe('H4');
    expect(h5.nodeName).toBe('H5');
    expect(h6.nodeName).toBe('H6');
  });

  it('can apply styling via props', async () => {
    render(<Heading level={3} fontStyle="italic" testId="headingId"></Heading>);
    const heading = await screen.findByTestId('headingId');
    expect(heading.nodeName).toBe('H3');
    expect(
      heading.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontStyle)
      )
    ).toBe('italic');
  });

  it('can apply a custom className', async () => {
    render(<Heading className="custom-heading" testId="headingId"></Heading>);
    const heading = await screen.findByTestId('headingId');
    expect(heading.classList.contains('custom-heading')).toBe(true);
    expect(heading.classList.contains(ComponentClassNames.Heading)).toBe(true);
  });

  it('can forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const headingText = 'Title';
    render(
      <Heading level={2} ref={ref}>
        {headingText}
      </Heading>
    );
    await screen.findByRole('heading');
    expect(ref.current?.nodeName).toBe('H2');
    expect(ref.current?.innerHTML).toBe(headingText);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Heading data-demo="true" testId="dataTest"></Heading>);
    const heading = await screen.findByTestId('dataTest');
    expect(heading.dataset['demo']).toBe('true');
  });

  it('should render the truncated class on Heading', async () => {
    render(
      <div>
        <Heading testId="truncated" isTruncated={true}>
          truncated
        </Heading>
      </div>
    );

    const truncated = await screen.findByTestId('truncated');

    expect(truncated.classList).toContain(
      `${ComponentClassNames['Heading']}--truncated`
    );
  });
});
