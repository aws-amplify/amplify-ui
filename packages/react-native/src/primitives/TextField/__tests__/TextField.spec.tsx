import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TextField from '../TextField';

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
    const { toJSON, getByLabelText, getByTestId } = render(
      <TextField {...defaultProps} disabled />
    );
    expect(toJSON()).toMatchSnapshot();
    const textInputContainer = getByLabelText(labelText);
    expect(textInputContainer.props.accessibilityState).toHaveProperty(
      'disabled',
      true
    );
    const textInput = getByTestId(testID);
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

  it('does nothing when disabled', () => {
    const { getByTestId } = render(
      <TextField {...defaultProps} disabled onChangeText={onChangeText} />
    );
    const textInput = getByTestId(testID);
    fireEvent.press(textInput);
    expect(onChangeText).not.toHaveBeenCalled();
  });
});
