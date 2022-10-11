import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import PasswordField from '../PasswordField';
import { icons } from '../../../assets';

const labelText = 'Label';
const testID = 'passwordInput';
const defaultProps = {
  testID: testID,
  label: labelText,
};

describe('PasswordField', () => {
  it('renders as expected', async () => {
    const { toJSON, findAllByRole, getByTestId, getByText, getByRole } = render(
      <PasswordField {...defaultProps} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(await findAllByRole('text')).toHaveLength(1);
    const textInput = getByTestId(testID);
    expect(textInput.props.editable).toBe(true);
    expect(textInput.props.secureTextEntry).toBe(true);
    expect(textInput.props.accessible).toBe(true);
    const image = getByRole('image');
    expect(image.props.source).toBe(icons.visibilityOff);
    const label = getByText(labelText);
    expect(label).not.toBeNull();
  });

  it('toggles visibility', () => {
    const { getByRole } = render(<PasswordField {...defaultProps} />);

    const icon = getByRole('image');
    expect(icon.props.source).toBe(icons.visibilityOff);
    fireEvent.press(icon);
    expect(icon.props.source).toBe(icons.visibility);
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByTestId, getByRole } = render(
      <PasswordField {...defaultProps} disabled />
    );
    expect(toJSON()).toMatchSnapshot();
    const textInput = getByTestId(testID);
    expect(textInput.props.editable).toBe(false);
    const icon = getByRole('button');
    expect(icon.props.accessibilityState).toHaveProperty('disabled', true);
  });
});
