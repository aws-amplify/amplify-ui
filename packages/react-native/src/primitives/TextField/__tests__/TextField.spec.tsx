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
    expect(textInput.props.secureTextEntry).toBeFalsy();
    expect(textInput.props.accessible).toBe(true);
    const label = getByText(labelText);
    expect(label).not.toBeNull();
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByPlaceholderText } = render(
      <TextField {...defaultProps} disabled />
    );
    expect(toJSON()).toMatchSnapshot();
    const textInput = getByPlaceholderText(placeHolderText);
    expect(textInput.props.editable).toBeFalsy();
    expect(textInput.parent?.props.accessibilityState).toHaveProperty(
      'disabled',
      true
    );
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
    expect(queryByText(message)).toBeFalsy();
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
