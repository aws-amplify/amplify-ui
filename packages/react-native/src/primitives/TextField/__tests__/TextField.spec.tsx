import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import TextField, {
  INPUT_CONTAINER_TEST_ID,
  TEXTFIELD_CONTAINER_TEST_ID,
} from '../TextField';

const placeHolderText = 'Placeholder';
const labelText = 'Label';
const testID = 'textInput';
const defaultProps = {
  testID: testID,
  label: labelText,
  placeholder: placeHolderText,
};

const onChangeText = jest.fn();

describe('TextField', () => {
  it('renders as expected', async () => {
    const { toJSON, findAllByRole, getByTestId, getByText } = render(
      <TextField {...defaultProps} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(await findAllByRole('text')).toHaveLength(1);
    const textInput = getByTestId(testID);
    expect(textInput.props.editable).toBe(true);
    expect(textInput.props.secureTextEntry).toBeUndefined();
    expect(textInput.props.accessible).toBe(true);
    expect(textInput.props.autoCapitalize).toBe('none');
    const label = getByText(labelText);
    expect(label).not.toBeNull();
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByTestId } = render(
      <TextField {...defaultProps} disabled />
    );
    expect(toJSON()).toMatchSnapshot();
    const textInput = getByTestId(testID);
    expect(textInput.props.accessibilityState).toHaveProperty('disabled', true);

    expect(textInput.props.editable).toBe(false);
  });

  it('renders as expected with error message', async () => {
    const message = 'Error message';
    const { toJSON, findAllByRole, getByText } = render(
      <TextField {...defaultProps} error errorMessage={message} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(await findAllByRole('text')).toHaveLength(2);
    expect(getByText(message)).not.toBeNull();
  });

  it(`doesn't render the errorMessage if error prop is false`, () => {
    const message = 'Error message';
    const { toJSON, queryByText } = render(
      <TextField {...defaultProps} errorMessage={message} />
    );
    expect(toJSON()).toMatchSnapshot();
    expect(queryByText(message)).toBeNull();
  });

  it(`doesn't render the errorMessage if errorMessage prop is undefined`, () => {
    const message = 'Error message';
    const { toJSON, queryByText } = render(
      <TextField {...defaultProps} error />
    );
    expect(toJSON()).toMatchSnapshot();
    expect(queryByText(message)).toBeNull();
  });

  it('renders as expected as password field', async () => {
    const { toJSON, findAllByRole, getByTestId } = render(
      <TextField {...defaultProps} secureTextEntry />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(await findAllByRole('text')).toHaveLength(1);
    const textInput = getByTestId(testID);
    expect(textInput.props.secureTextEntry).toBe(true);
  });

  it('renders disabled state correctly', () => {
    const { getByTestId } = render(
      <TextField
        {...defaultProps}
        disabled
        onChangeText={onChangeText}
        accessibilityRole="none"
      />
    );
    const textInput = getByTestId(testID);
    fireEvent.press(textInput);
    expect(onChangeText).not.toHaveBeenCalled();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const inputContainer = getByTestId(INPUT_CONTAINER_TEST_ID);
    expect(inputContainer.props.style).toStrictEqual({
      ...themedStyle.fieldContainer,
      ...themedStyle.disabled,
    });
  });

  it('applies theme and style props', () => {
    const errorMessageText = 'Error!';
    const customErrorMessageStyle = { color: 'red' };
    const customFieldStyle = { color: 'orange' };
    const customLabelStyle = { color: 'blue' };
    const customStyle = { backgroundColor: 'purple' };

    const { getByTestId, getByText } = render(
      <TextField
        {...defaultProps}
        error
        errorMessage={errorMessageText}
        errorMessageStyle={customErrorMessageStyle}
        fieldStyle={customFieldStyle}
        labelStyle={customLabelStyle}
        style={customStyle}
      />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const container = getByTestId(TEXTFIELD_CONTAINER_TEST_ID);
    const inputContainer = getByTestId(INPUT_CONTAINER_TEST_ID);
    const input = getByTestId(testID);
    const errorMessage = getByText(errorMessageText);

    expect(container.props.style).toStrictEqual([
      themedStyle.container,
      customStyle,
    ]);
    expect(inputContainer.props.style).toStrictEqual(
      themedStyle.fieldContainer
    );
    expect(input.props.style).toStrictEqual([
      themedStyle.field,
      customFieldStyle,
    ]);
    expect(errorMessage.props.style).toContain(customErrorMessageStyle);
  });
});
