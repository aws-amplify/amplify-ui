import React from 'react';
import TestRenderer from 'react-test-renderer';
import Heading from '../Heading';
import { HeadingProps } from '../types';

const title = 'Test Heading';
const levels: HeadingProps['level'][] = [1, 2, 3, 4, 5, 6];

describe('Heading', () => {
  it('renders a level 6 Heading by default', () => {
    const defaultHeading = TestRenderer.create(<Heading>{title}</Heading>);
    const headingLevel6 = TestRenderer.create(
      <Heading level={6}>{title}</Heading>
    );

    expect(defaultHeading.toJSON()).toEqual(headingLevel6.toJSON());
  });

  it.each(levels)('renders a level %i Heading as expected', (level) => {
    const heading = TestRenderer.create(
      <Heading level={level}>{`Heading level ${level}`}</Heading>
    );
    expect(heading.toJSON()).toMatchSnapshot();
  });

  it('applies style props', () => {
    const customStyle = { color: 'red' };

    const styledHeading = TestRenderer.create(
      <Heading style={customStyle}>{title}</Heading>
    );

    expect(styledHeading.toJSON()).toMatchSnapshot();
    expect(styledHeading.root.props.style).toBe(customStyle);
  });
});
