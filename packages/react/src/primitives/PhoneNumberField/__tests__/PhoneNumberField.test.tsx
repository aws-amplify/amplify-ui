import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PhoneNumberField } from '../PhoneNumberField';
import { Flex } from '../../Flex';
import { Button } from '../../Button';
import { ComponentClassNames } from '../../shared/constants';

const originalLog = console.log;
console.log = jest.fn();

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

  const ReadOnlyFormTest = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const countryCodeRef = React.useRef<HTMLSelectElement>(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(
        `${countryCodeRef.current?.value} ${inputRef.current?.value}`
      );
    };

    return (
      <Flex as="form" onSubmit={handleSubmit}>
        <PhoneNumberField
          defaultCountryCode="+40"
          defaultValue="1234567"
          label="Read Only"
          name="read_only_phone"
          ref={inputRef}
          countryCodeRef={countryCodeRef}
          isReadOnly
        />
        <Button type="submit">Submit</Button>
      </Flex>
    );
  };

  it('should forward ref and countryCodeRef to DOM elements', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const countryCodeRef = React.createRef<HTMLSelectElement>();
    await setup({ ref, countryCodeRef });

    await screen.findByRole('textbox');
    expect(ref.current?.nodeName).toBe('INPUT');
    expect(countryCodeRef.current?.nodeName).toBe('SELECT');
  });

  it('should render a country code selector with an accessible role', async () => {
    const { $countryCodeSelector } = await setup({});

    expect($countryCodeSelector).toBeDefined();
  });

  it('should render a country code selector with an accessible label', async () => {
    const { $countryCodeSelector } = await setup({});

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

  /*
    Since <select> elements do not support the `readonly` html attribute, it is suggested to use the `disabled` html attribute 
    so that a screen reader will announce something to the user about the interactivity of the options list ( https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
  */
  it('should set aria-disabled="true" when the isReadOnly prop is passed, and disable all the select options', async () => {
    const { $countryCodeSelector } = await setup({ isReadOnly: true });

    expect($countryCodeSelector).toHaveAttribute('aria-disabled', 'true');

    $countryCodeSelector.querySelectorAll('option').forEach((option) => {
      expect(option).toHaveAttribute('disabled');
    });
  });

  it('should still submit the form values when the isReadOnly prop is passed', async () => {
    const { container } = render(<ReadOnlyFormTest />);

    const button = container.getElementsByTagName('button')[0];
    userEvent.click(button);
    expect(console.log).toHaveBeenCalledWith('+40 1234567');
  });

  describe('Using Dial Code', () => {
    const dialCodeSetup = async ({
      defaultDialCode = '+1',
      label = 'Phone Number',
      dialCodeLabel = 'dial code',
      ...rest
    }: Partial<typeof PhoneNumberField['defaultProps']>) => {
      render(
        <PhoneNumberField
          defaultDialCode={defaultDialCode}
          label={label}
          dialCodeLabel={dialCodeLabel}
          {...rest}
        />
      );

      return {
        $phoneInput: await screen.findByRole('textbox', {
          name: /phone number/i,
        }),
        $dialCodeSelector: await screen.findByRole('combobox', {
          name: /dial code/i,
        }),
      };
    };

    const DialCodeReadOnlyFormTest = () => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const dialCodeRef = React.useRef<HTMLSelectElement>(null);

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${dialCodeRef.current?.value} ${inputRef.current?.value}`);
      };

      return (
        <Flex as="form" onSubmit={handleSubmit}>
          <PhoneNumberField
            defaultDialCode="+40"
            defaultValue="1234567"
            label="Read Only"
            name="read_only_phone"
            ref={inputRef}
            dialCodeRef={dialCodeRef}
            isReadOnly
          />
          <Button type="submit">Submit</Button>
        </Flex>
      );
    };

    it('should forward ref and dialCodeRef to DOM elements', async () => {
      const ref = React.createRef<HTMLInputElement>();
      const dialCodeRef = React.createRef<HTMLSelectElement>();
      await dialCodeSetup({ ref, dialCodeRef });

      await screen.findByRole('textbox');
      expect(ref.current?.nodeName).toBe('INPUT');
      expect(dialCodeRef.current?.nodeName).toBe('SELECT');
    });

    it('should render a country code selector with an accessible role', async () => {
      const { $dialCodeSelector } = await dialCodeSetup({});

      expect($dialCodeSelector).toBeDefined();
    });

    it('should render a country code selector with an accessible label', async () => {
      const { $dialCodeSelector } = await dialCodeSetup({});

      expect($dialCodeSelector).toBeDefined();
    });

    it('should render a phone input field with an accessible role', async () => {
      const { $phoneInput } = await dialCodeSetup({});

      expect($phoneInput).toBeDefined();
    });

    it('should render a phone input field with an accessible role', async () => {
      await dialCodeSetup({});
      const $phoneInput = await screen.findByLabelText(/phone number/i);

      expect($phoneInput).toBeDefined();
    });

    it('should use a specified defaultDialCode', async () => {
      const defaultDialCode = '+7';
      const { $dialCodeSelector } = await dialCodeSetup({ defaultDialCode });

      expect($dialCodeSelector).toHaveValue(defaultDialCode);
    });

    it('should always use type "tel"', async () => {
      const { $phoneInput } = await dialCodeSetup({});

      expect($phoneInput).toHaveAttribute('type', 'tel');
    });

    it('should have "tel-national" as the default autocomplete attribute', async () => {
      const { $phoneInput } = await dialCodeSetup({});

      expect($phoneInput).toHaveAttribute('autocomplete', 'tel-national');
    });

    it('should render classname for PhoneNumberField', async () => {
      const className = 'test-class-name';
      const testId = 'PhoneNumberFieldTestId';
      await dialCodeSetup({ className, testId });
      const $phoneInput = await screen.findByTestId(testId);

      expect($phoneInput).toHaveClass(className);
      expect($phoneInput).toHaveClass(ComponentClassNames.PhoneNumberField);
    });

    it('should be able to set a size', async () => {
      const { $dialCodeSelector, $phoneInput } = await dialCodeSetup({
        size: 'large',
      });

      expect($phoneInput).toHaveAttribute('data-size', 'large');
      expect($dialCodeSelector).toHaveAttribute('data-size', 'large');
    });

    it('should be able to set a variation', async () => {
      const { $dialCodeSelector, $phoneInput } = await dialCodeSetup({
        variation: 'quiet',
      });

      expect($phoneInput).toHaveAttribute('data-variation', 'quiet');
      expect($dialCodeSelector).toHaveAttribute('data-variation', 'quiet');
    });

    it('should fire onChange handler when phone input field is changed', async () => {
      const onChange = jest.fn();
      const { $phoneInput } = await dialCodeSetup({ onChange });
      userEvent.type($phoneInput, '1');

      expect(onChange).toHaveBeenCalled();
    });

    it('should fire onInput handler when phone input field is changed', async () => {
      const onInput = jest.fn();
      const { $phoneInput } = await dialCodeSetup({ onInput });
      userEvent.type($phoneInput, '1');

      expect(onInput).toHaveBeenCalled();
    });

    it('should fire onDialCodeChange handler when phone input field is changed', async () => {
      const onDialCodeChange = jest.fn();
      const { $dialCodeSelector } = await dialCodeSetup({ onDialCodeChange });
      userEvent.selectOptions($dialCodeSelector, '+7');

      expect(onDialCodeChange).toHaveBeenCalled();
    });

    /*
      Since <select> elements do not support the `readonly` html attribute, it is suggested to use the `disabled` html attribute 
      so that a screen reader will announce something to the user about the interactivity of the options list ( https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
    */
    it('should set aria-disabled="true" when the isReadOnly prop is passed, and disable all the select options', async () => {
      const { $dialCodeSelector } = await dialCodeSetup({ isReadOnly: true });

      expect($dialCodeSelector).toHaveAttribute('aria-disabled', 'true');

      $dialCodeSelector.querySelectorAll('option').forEach((option) => {
        expect(option).toHaveAttribute('disabled');
      });
    });

    it('should still submit the form values when the isReadOnly prop is passed', async () => {
      const { container } = render(<DialCodeReadOnlyFormTest />);

      const button = container.getElementsByTagName('button')[0];
      userEvent.click(button);
      expect(console.log).toHaveBeenCalledWith('+40 1234567');

      console.log = originalLog;
    });
  });
});
