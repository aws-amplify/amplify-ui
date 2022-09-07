import React from 'react';
import TestRenderer from 'react-test-renderer';
import Heading from '../Heading';
import { Text, TextStyle } from 'react-native';

const title = 'Test Heading';

describe('Heading', () => {
  it('renders a level 6 Heading by default', () => {
    const defaultHeading = TestRenderer.create(<Heading>{title}</Heading>);
    const headingLevel6 = TestRenderer.create(
      <Heading level={6}>{title}</Heading>
    );

    expect(defaultHeading.toJSON()).toEqual(headingLevel6.toJSON());
  });

  it('renders six different Heading levels', () => {
    const heading = TestRenderer.create(
      <>
        <Heading level={1}>Heading level 1</Heading>
        <Heading level={2}>Heading level 2</Heading>
        <Heading level={3}>Heading level 3</Heading>
        <Heading level={4}>Heading level 4</Heading>
        <Heading level={5}>Heading level 5</Heading>
        <Heading level={6}>Heading level 6</Heading>
      </>
    );
    expect(heading.toJSON()).toMatchSnapshot();
  });

  it('truncates long Headings with an ellipsis', () => {
    const headings = TestRenderer.create(
      <>
        <Heading numberOfLines={1}>
          Really long heading that should be truncated with an ellipsis
        </Heading>
        <Heading>
          Really long heading that should NOT be truncated with an ellipsis
        </Heading>
      </>
    );

    const [truncated, notTruncated] = headings.root.findAllByType(Text);

    expect(headings.toJSON()).toMatchSnapshot();
    expect(truncated.props.numberOfLines).toBe(1);
    expect(notTruncated.props.numberOfLines).toBe(undefined);
  });

  it('applies style props', () => {
    const customStyle = { color: 'red' };

    const styledHeading = TestRenderer.create(
      <Heading style={customStyle}>{title}</Heading>
    );

    const styleProps = styledHeading.root.findByType(Text).props
      .style as TextStyle[];

    expect(styledHeading.toJSON()).toMatchSnapshot();
    expect(styledHeading.root.props.style).toBe(customStyle);
    expect(styleProps[styleProps.length - 1]).toBe(customStyle);
  });
});
