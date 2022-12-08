import React from 'react';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import Divider, { DIVIDER_LINE_TEST_ID } from '../Divider';
import { getThemedStyles } from '../styles';
import { getThemedStyles as getThemedLabelStyles } from '../../Label/styles';

const labelText = 'Divider label';

describe('Divider', () => {
  it('renders as expected with label', () => {
    const { toJSON, queryByText } = render(<Divider>{labelText}</Divider>);
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText(labelText)).toBeDefined();
  });

  it('renders as expected without label', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies theme and style props', () => {
    const customLabelStyle = { color: 'red' };
    const customLineStyle = { backgroundColor: 'blue' };

    const { toJSON, getByText, getByTestId } = render(
      <Divider labelStyle={customLabelStyle} lineStyle={customLineStyle}>
        {labelText}
      </Divider>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);
    const themedLabelStyle = getThemedLabelStyles(result.current);

    const label = getByText(labelText);
    const line = getByTestId(DIVIDER_LINE_TEST_ID);

    expect(label.props.style).toStrictEqual([
      themedLabelStyle.text,
      themedLabelStyle.primary,
      [themedStyle.label, customLabelStyle],
    ]);

    expect(line.props.style).toStrictEqual([themedStyle.line, customLineStyle]);
    expect(toJSON()).toMatchSnapshot();
  });
});
