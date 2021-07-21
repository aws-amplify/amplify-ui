import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Heading } from '../Heading';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { kebabCase } from 'lodash';

describe('Heading: ', () => {
  const headingText = 'Heading primitive';

  it('renders an h6 tag by default', async () => {
    render(<Heading>{headingText}</Heading>);

    const heading = await screen.findByText(headingText);
    expect(heading.nodeName).toBe('H6');
  });

  it('can apply styling via props', async () => {
    render(
      <Heading level={3} fontStyle="italic">
        {headingText}
      </Heading>
    );
    const heading = await screen.findByText(headingText);
    expect(heading.nodeName).toBe('H3');
    expect(
      heading.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontStyle)
      )
    ).toBe('italic');
  });

  it('can apply a custom className', async () => {
    render(<Heading className="custom-heading">{headingText}</Heading>);
    const heading = await screen.findByText(headingText);
    expect(heading.classList.contains('custom-heading')).toBe(true);
    expect(heading.classList.contains(ComponentClassNames.Heading)).toBe(true);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Heading data-demo="true" id="dataTest">
        {headingText}
      </Heading>
    );
    const heading = await screen.findByTestId('dataTest');
    expect(heading.dataset['demo']).toBe('true');
  });
});
