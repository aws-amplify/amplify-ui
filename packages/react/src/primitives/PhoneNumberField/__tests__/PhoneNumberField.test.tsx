import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PhoneNumberField } from '../PhoneNumberField';
import { ComponentClassNames } from '../../shared/constants';

describe('PhoneNumberField primitive', () => {
  const setup = async ({
    defaultCountryCode = '+1',
    label = 'Phone Number',
    ...rest
  }: Partial<typeof PhoneNumberField['defaultProps']>) => {
    render(
      <PhoneNumberField
        defaultCountryCode={defaultCountryCode}
        label={label}
        {...rest}
      />
    );

    return {
      $phoneInput: await screen.findByRole('textbox', {
        name: /phone number/i,
      }),
      $countryCodeSelector: await screen.findByRole('combobox', {
        name: /country code/i,
      }),
    };
  };

  it('should forward ref and countryCodeRef to DOM elements', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const countryCodeRef = React.createRef<HTMLSelectElement>();
    await setup({ ref, countryCodeRef });

    await screen.findByRole('textbox');
    expect(ref.current.nodeName).toBe('INPUT');
    expect(countryCodeRef.current.nodeName).toBe('SELECT');
  });

  it('should render a country code selector with an accessible role', async () => {
    const { $countryCodeSelector } = await setup({});

    expect($countryCodeSelector).toBeDefined();
  });

  it('should render a country code selector with an accessible label', async () => {
    await setup({});
    const $countryCodeSelector = await screen.findByLabelText(/country code/i);

    expect($countryCodeSelector).toBeDefined();
  });

  it('should render a phone input field with an accessible role', async () => {
    const { $phoneInput } = await setup({});

    expect($phoneInput).toBeDefined();
  });

  it('should render a phone input field with an accessible role', async () => {
    await setup({});
    const $phoneInput = await screen.findByLabelText(/phone number/i);

    expect($phoneInput).toBeDefined();
  });

  it('should use a specified defaultCountryCode', async () => {
    const defaultCountryCode = '+7';
    const { $countryCodeSelector } = await setup({ defaultCountryCode });

    expect($countryCodeSelector).toHaveValue(defaultCountryCode);
  });

  it('should always use type "tel"', async () => {
    const { $phoneInput } = await setup({});

    expect($phoneInput).toHaveAttribute('type', 'tel');
  });

  it('should have "tel-national" as the default autocomplete attribute', async () => {
    const { $phoneInput } = await setup({});

    expect($phoneInput).toHaveAttribute('autocomplete', 'tel-national');
  });

  it('should render classname for PhoneNumberField', async () => {
    const className = 'test-class-name';
    const testId = 'PhoneNumberFieldTestId';
    await setup({ className, testId });
    const $phoneInput = await screen.findByTestId(testId);

    expect($phoneInput).toHaveClass(className);
    expect($phoneInput).toHaveClass(ComponentClassNames.PhoneNumberField);
  });

  it('should be able to set a size', async () => {
    const { $countryCodeSelector, $phoneInput } = await setup({
      size: 'large',
    });

    expect($phoneInput).toHaveAttribute('data-size', 'large');
    expect($countryCodeSelector).toHaveAttribute('data-size', 'large');
  });

  it('should be able to set a variation', async () => {
    const { $countryCodeSelector, $phoneInput } = await setup({
      variation: 'quiet',
    });

    expect($phoneInput).toHaveAttribute('data-variation', 'quiet');
    expect($countryCodeSelector).toHaveAttribute('data-variation', 'quiet');
  });

  it('should fire onChange handler when phone input field is changed', async () => {
    const onChange = jest.fn();
    const { $phoneInput } = await setup({ onChange });
    userEvent.type($phoneInput, '1');

    expect(onChange).toHaveBeenCalled();
  });

  it('should fire onInput handler when phone input field is changed', async () => {
    const onInput = jest.fn();
    const { $phoneInput } = await setup({ onInput });
    userEvent.type($phoneInput, '1');

    expect(onInput).toHaveBeenCalled();
  });

  it('should fire onCountryCodeChange handler when phone input field is changed', async () => {
    const onCountryCodeChange = jest.fn();
    const { $countryCodeSelector } = await setup({ onCountryCodeChange });
    userEvent.selectOptions($countryCodeSelector, '+7');

    expect(onCountryCodeChange).toHaveBeenCalled();
  });
});
