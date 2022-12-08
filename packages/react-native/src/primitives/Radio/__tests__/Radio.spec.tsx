import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';
import { useTheme } from '../../../theme';
import { capitalize } from '../../../utils';
import { RADIO_DOT_PROPORTION } from '../getRadioDimensions';
import Radio, { CONTAINER_TEST_ID, DOT_TEST_ID } from '../Radio';
import { getThemedStyles } from '../styles';
import { Size } from '../types';

const sizes: Size[] = ['small', 'medium', 'large'];

const onChange = jest.fn();
const onPress = jest.fn();

describe('Radio', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  it.each([true, false])('renders as expected when selected is %s', (value) => {
    const { toJSON } = render(
      <Radio
        selected={value}
        value={value}
        label={`${value}`}
        onChange={onChange}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls the expected handler when pressed', () => {
    const { getByRole } = render(
      <Radio value="value" onPress={onPress} onChange={onChange} />
    );
    const radio = getByRole('radio');
    fireEvent.press(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('value');

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('value');
  });

  it.each(sizes)('renders as expected when size is %s', (value) => {
    const { toJSON, getByTestId } = render(
      <Radio size={value} value={value} label={`${value}`} selected />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const size = typeof value === 'string' ? capitalize(value) : 'Medium';

    expect(getByTestId(CONTAINER_TEST_ID).props.style).toStrictEqual([
      themedStyle.radioContainer,
      themedStyle[`radioContainer${size}`],
      undefined,
    ]);

    expect(getByTestId(DOT_TEST_ID).props.style).toStrictEqual([
      themedStyle.radioDot,
      themedStyle[`radioDot${size}`],
      undefined,
    ]);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when passing a number to the size prop', () => {
    const customSize = 40;

    const { toJSON, getByTestId } = render(
      <Radio size={customSize} value="number" label="number" selected />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(getByTestId(CONTAINER_TEST_ID).props.style).toStrictEqual([
      themedStyle.radioContainer,
      {
        height: customSize,
        width: customSize,
      },
      undefined,
    ]);

    expect(getByTestId(DOT_TEST_ID).props.style).toStrictEqual([
      themedStyle.radioDot,
      {
        height: customSize * RADIO_DOT_PROPORTION,
        width: customSize * RADIO_DOT_PROPORTION,
      },
      undefined,
    ]);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with accessibilityRole', () => {
    const { toJSON, queryByRole, getByRole } = render(
      <Radio value="" onChange={onChange} accessibilityRole={'none'} />
    );

    expect(queryByRole('radio')).toBe(null);
    expect(getByRole('none')).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByRole } = render(
      <Radio disabled value="disabled" label="disabled" onChange={onChange} />
    );

    const radio = getByRole('radio');

    fireEvent.press(radio);
    expect(onChange).not.toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies theme and custom styles', () => {
    const customStyle = { margin: 10 };
    const customContainerStyle = {
      borderColor: 'blue',
      borderWidth: 2,
    };
    const customDotStyle = {
      backgroundColor: 'green',
    };

    const { toJSON, getByTestId, getByRole } = render(
      <Radio
        style={customStyle}
        radioContainerStyle={customContainerStyle}
        radioDotStyle={customDotStyle}
        value="value"
        selected
      />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(getByRole('radio').props.style).toStrictEqual([
      { ...themedStyle.container, flexDirection: 'row' },
      undefined, // pressed styles
      customStyle,
    ]);

    expect(getByTestId(CONTAINER_TEST_ID).props.style).toStrictEqual([
      themedStyle.radioContainer,
      themedStyle.radioContainerMedium,
      customContainerStyle,
    ]);

    expect(getByTestId(DOT_TEST_ID).props.style).toStrictEqual([
      themedStyle.radioDot,
      themedStyle.radioDotMedium,
      customDotStyle,
    ]);

    expect(toJSON()).toMatchSnapshot();
  });
});
