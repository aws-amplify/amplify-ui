import { render, screen } from '@testing-library/react';

import { PhoneNumberField } from '../PhoneNumberField';

describe('PhoneNumberField primitive', () => {
  it('should render a country code selector', async () => {
    render(<PhoneNumberField defaultCountryCode="+1" label="Phone Number" />);

    const $countryCodeSelector = await screen.findByRole('combobox', {
      name: /country code/i,
    });

    expect($countryCodeSelector).toBe;
  });

  it('should render a phone input field', async () => {
    render(<PhoneNumberField defaultCountryCode="+1" label="Phone Number" />);

    const $phoneInput = await screen.findByRole('textbox', {
      name: /phone number/i,
    });

    expect($phoneInput).toBe;
  });

  it('should use a specified defaultCountryCode', async () => {
    const defaultCountryCode = '+7';

    render(
      <PhoneNumberField
        defaultCountryCode={defaultCountryCode}
        label="Phone Number"
      />
    );

    const $countryCodeSelector = await screen.findByRole('combobox', {
      name: /country code/i,
    });

    expect($countryCodeSelector).toHaveValue(defaultCountryCode);
  });

  it('should always use type "tel"', async () => {
    render(<PhoneNumberField defaultCountryCode="+1" label="Phone Number" />);

    const $phoneInput = await screen.findByRole('textbox', {
      name: /phone number/i,
    });

    expect($phoneInput.getAttribute('type')).toBe('tel');
  });

  it('should always "username" as the autocomplete attribute', async () => {
    render(<PhoneNumberField defaultCountryCode="+1" label="Phone Number" />);

    const $phoneInput = await screen.findByRole('textbox', {
      name: /phone number/i,
    });

    expect($phoneInput.getAttribute('autocomplete')).toBe('username');
  });
});
