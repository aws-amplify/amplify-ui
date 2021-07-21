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

	it('renders h1-h6 tags by passing level prop', async () => {
		render(
		<div>
			<Heading level={1}>H1</Heading>
			<Heading level={2}>H2</Heading>
			<Heading level={3}>H3</Heading>
			<Heading level={4}>H4</Heading>
			<Heading level={5}>H5</Heading>
			<Heading level={6}>H6</Heading>
		</div>);

    const h1 = await screen.findByText('H1');
		const h2 = await screen.findByText('H2');
		const h3 = await screen.findByText('H3');
		const h4 = await screen.findByText('H4');
		const h5 = await screen.findByText('H5');
		const h6 = await screen.findByText('H6');

		expect(h1.nodeName).toBe('H1');
		expect(h2.nodeName).toBe('H2');
		expect(h3.nodeName).toBe('H3');
		expect(h4.nodeName).toBe('H4');
		expect(h5.nodeName).toBe('H5');
		expect(h6.nodeName).toBe('H6');
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
