import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from '../../Radio';
import { RadioField } from '../RadioField';
import { RadioFieldProps } from '../../types/radioField';
import { ComponentClassNames } from '../../shared';
import {
  testFlexProps,
  expectFlexStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('RadioField test suite', () => {
  const basicProps = { label: 'test', name: 'test', testId: 'test' };

  const getRadioField = ({ label, name, ...props }: RadioFieldProps) => {
    return (
      <RadioField label={label} name={name} {...props}>
        <Radio value="html" testId="radio-button">
          html
        </Radio>
        <Radio value="css" testId="radio-button">
          css
        </Radio>
        <Radio value="javascript" testId="radio-button">
          javascript
        </Radio>
      </RadioField>
    );
  };

  const ControlledRadioField = () => {
    const [value, setValue] = useState('html');
    return (
      <RadioField
        {...basicProps}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Radio value="html">html</Radio>
        <Radio value="css">css</Radio>
        <Radio value="javascript">javascript</Radio>
      </RadioField>
    );
  };

  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(getRadioField({ ...basicProps, className }));

    const radioField = await screen.findByTestId('test');
    expect(radioField).toHaveClass(
      ComponentClassNames.Field,
      ComponentClassNames.RadioField,
      className
    );
  });

  it('should render all flex style props', async () => {
    render(getRadioField({ ...basicProps, ...testFlexProps }));
    const radioField = await screen.findByTestId('test');
    expectFlexStyleProps(radioField);
  });

  describe('Label', () => {
    it('should render expected label classname', async () => {
      render(getRadioField({ ...basicProps }));

      const labelElelment = (await screen.findByText(
        'test'
      )) as HTMLLabelElement;
      expect(labelElelment).toHaveClass(ComponentClassNames.Label);
    });

    it('should match radio group aria-labelledby', async () => {
      render(getRadioField({ ...basicProps }));
      const labelElelment = (await screen.findByText(
        'test'
      )) as HTMLLabelElement;
      const radioGroup = await screen.findByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('aria-labelledby', labelElelment.id);
    });

    it('should have `sr-only` class when labelHidden is true', async () => {
      render(getRadioField({ ...basicProps, labelHidden: true }));

      const labelElelment = await screen.findByText('test');
      expect(labelElelment).toHaveClass('sr-only');
    });
  });

  describe('RadioGroup', () => {
    const expectFunctionality = async (componet) => {
      render(componet);
      const radios = await screen.findAllByRole('radio');
      const html = radios[0];
      const css = radios[1];
      const javascript = radios[2];
      expect(html).toBeChecked();
      expect(css).not.toBeChecked();
      expect(javascript).not.toBeChecked();

      userEvent.click(css);
      expect(html).not.toBeChecked();
      expect(css).toBeChecked();
      expect(javascript).not.toBeChecked();

      userEvent.click(javascript);
      expect(html).not.toBeChecked();
      expect(css).not.toBeChecked();
      expect(javascript).toBeChecked();
    };

    it('should render default classname', async () => {
      render(getRadioField({ ...basicProps }));
      const radioGroup = await screen.findByRole('radiogroup');
      expect(radioGroup).toHaveClass(ComponentClassNames.RadioGroup);
    });

    it('should work in uncontrolled way', () => {
      expectFunctionality(
        getRadioField({ ...basicProps, defaultValue: 'html' })
      );
    });

    it('should work in controlled way', () => {
      expectFunctionality(<ControlledRadioField />);
    });

    it('should set size attribute', async () => {
      render(getRadioField({ ...basicProps, size: 'large' }));

      const radioField = await screen.findByTestId('test');
      expect(radioField).toHaveAttribute('data-size', 'large');

      const radioButtons = await screen.findAllByTestId('radio-button');
      expect(radioButtons[0]).toHaveAttribute('data-size', 'large');
      expect(radioButtons[1]).toHaveAttribute('data-size', 'large');
      expect(radioButtons[2]).toHaveAttribute('data-size', 'large');
    });

    it('should be disabled if isDisabled is passed', async () => {
      render(getRadioField({ ...basicProps, isDisabled: true }));

      const radios = await screen.findAllByRole('radio');
      const html = radios[0];
      const css = radios[1];
      const javascript = radios[2];
      expect(html).toBeDisabled();
      expect(css).toBeDisabled();
      expect(javascript).toBeDisabled();
    });

    it('should be read-only if isReadOnly is passed and defaultValue is provided', async () => {
      render(
        getRadioField({ ...basicProps, defaultValue: 'html', isReadOnly: true })
      );
      const radios = await screen.findAllByRole('radio');
      const html = radios[0];
      const css = radios[1];
      const javascript = radios[2];
      expect(html).toBeChecked();
      expect(css).toBeDisabled();
      expect(javascript).toBeDisabled();
    });

    it('should be required if isRequired is passed', async () => {
      render(getRadioField({ ...basicProps, isRequired: true }));
      const radios = await screen.findAllByRole('radio');
      const html = radios[0];
      const css = radios[1];
      const javascript = radios[2];
      expect(html).toBeRequired();
      expect(css).toBeRequired();
      expect(javascript).toBeRequired();
    });

    it('should set aria-hidden to be true on custom radio buttons', async () => {
      render(getRadioField({ ...basicProps }));

      const radioButtons = await screen.findAllByTestId('radio-button');
      expect(radioButtons[0]).toHaveAttribute('aria-hidden', 'true');
      expect(radioButtons[1]).toHaveAttribute('aria-hidden', 'true');
      expect(radioButtons[2]).toHaveAttribute('aria-hidden', 'true');
    });

    it('should set aria-invalid to be true on radio control when hasError is true', async () => {
      render(getRadioField({ ...basicProps, hasError: true }));

      const radios = await screen.findAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-invalid', 'true');
      expect(radios[1]).toHaveAttribute('aria-invalid', 'true');
      expect(radios[2]).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Descriptive message', () => {
    const descriptiveText = 'This is a descriptive text.';
    it('should render when descriptiveText is provided', async () => {
      render(getRadioField({ ...basicProps, descriptiveText }));

      const descriptiveField = await screen.queryByText(descriptiveText);
      expect(descriptiveField).toContainHTML(descriptiveText);
    });
  });

  describe('Error messages', () => {
    const errorMessage = 'This is an error message';
    it('should not show when hasError is false', async () => {
      render(getRadioField({ ...basicProps }));

      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('should show when hasError and errorMessage', async () => {
      render(getRadioField({ ...basicProps, hasError: true, errorMessage }));
      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).toContainHTML(errorMessage);
    });
  });
});
