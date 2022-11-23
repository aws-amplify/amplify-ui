import React from 'react';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import Heading from '../Heading';
import { HeadingProps } from '../types';
import { getThemedStyles } from '../styles';

const levels: HeadingProps['level'][] = [1, 2, 3, 4, 5, 6];

describe('Heading', () => {
  it('renders a level 6 Heading by default', () => {
    const title = 'Test Heading';

    const { toJSON, getByText } = render(<Heading>{title}</Heading>);

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const heading = getByText(title);

    expect(heading.props.style).toStrictEqual([
      themedStyle.text,
      themedStyle[6],
      undefined,
    ]);

    expect(toJSON()).toMatchSnapshot();
  });

  it.each(levels)('renders a level %i Heading as expected', (level) => {
    const title = `Heading level ${level}`;

    const { toJSON, getByText } = render(
      <Heading level={level}>{title}</Heading>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const heading = getByText(title);

    expect(heading.props.style).toStrictEqual([
      themedStyle.text,
      themedStyle[level ?? 6],
      undefined,
    ]);

    expect(toJSON()).toMatchSnapshot();
  });

  it('applies theme and style props', () => {
    const customStyle = { color: 'red' };
    const title = 'Styled Heading';

    const { toJSON, getByText } = render(
      <Heading style={customStyle}>{title}</Heading>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const heading = getByText(title);

    expect(heading.props.style).toStrictEqual([
      themedStyle.text,
      themedStyle[6],
      customStyle,
    ]);

    expect(toJSON()).toMatchSnapshot();
  });
});
