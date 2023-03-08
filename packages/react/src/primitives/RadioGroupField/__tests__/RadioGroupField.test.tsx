import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from '../../Radio';
import { RadioGroupField } from '../RadioGroupField';
import { RadioGroupFieldProps } from '../../types/radioGroupField';
import { ComponentClassNames } from '../../shared';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';

const basicProps = { label: 'testLabel', name: 'testName', testId: 'testId' };
const radioGroupTestId = `${basicProps.testId}-${ComponentClassNames.RadioGroup}`;

const RadioFieldGroup = ({ label, name, ...props }: RadioGroupFieldProps) => {
  return (
    <RadioGroupField label={label} name={name} {...props}>
      <Radio value="html" testId="radio-button">
        html
      </Radio>
      <Radio value="css" testId="radio-button">
        css
      </Radio>
      <Radio value="javascript" testId="radio-button">
        javascript
      </Radio>
    </RadioGroupField>
  );
};

describe('RadioFieldGroup', () => {
  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(RadioFieldGroup({ ...basicProps, className }));

    const radioField = await screen.findByTestId(basicProps.testId);
    expect(radioField).toHaveClass(
      ComponentClassNames.Field,
      ComponentClassNames.RadioGroupField,
      className
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RadioGroupField {...basicProps} ref={ref}></RadioGroupField>);

    await screen.findByTestId(basicProps.testId);
    expect(ref.current?.nodeName).toBe('FIELDSET');
  });

  it('should render all flex style props', async () => {
    render(RadioFieldGroup({ ...basicProps, ...testFlexProps }));
    const radioField = await screen.findByTestId(basicProps.testId);
    expectFlexContainerStyleProps(radioField);
  });

  it('should have no default labelPosition', async () => {
    render(RadioFieldGroup({ ...basicProps }));
    const radioField = await screen.findByTestId(basicProps.testId);
    expect(radioField.querySelector('.amplify-radio')).not.toHaveAttribute(
      'data-label-position'
    );
  });

  it('should work with labelPosition', async () => {
    render(RadioFieldGroup({ ...basicProps, labelPosition: 'end' }));
    const radioField = await screen.findByTestId(basicProps.testId);
    expect(radioField.querySelector('.amplify-radio')).toHaveAttribute(
      'data-label-position',
      'end'
    );
  });

  describe('Label', () => {
    it('should render visually-hidden legend element with label name', async () => {
      render(RadioFieldGroup({ ...basicProps }));

      const labelElement = await screen.findAllByText(basicProps.label);
      expect(labelElement[0].nodeName).toBe('LEGEND');
    });

    it('should render expected label classname', async () => {
      render(RadioFieldGroup({ ...basicProps }));

      const labelElement = await screen.findAllByText(basicProps.label);
      expect(labelElement[1]).toHaveClass(ComponentClassNames.Label);
    });

    it('should have `amplify-visually-hidden` class when labelHidden is true', async () => {
      render(RadioFieldGroup({ ...basicProps, labelHidden: true }));

      const labelElement = await screen.findAllByText(basicProps.label);
      expect(labelElement[1]).toHaveClass('amplify-visually-hidden');
    });
  });

  describe('RadioGroup', () => {
    it('should render default classname', async () => {
      render(RadioFieldGroup({ ...basicProps }));
      const radioGroup = await screen.findByTestId(radioGroupTestId);
      expect(radioGroup).toHaveClass(ComponentClassNames.RadioGroup);
    });

    it('should work in uncontrolled way', async () => {
      render(RadioFieldGroup({ ...basicProps, defaultValue: 'html' }));

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
    });

    it('should work in controlled way', async () => {
      const { rerender } = render(
        <RadioGroupField {...basicProps} value="html">
          <Radio readOnly value="html">
            html
          </Radio>
          <Radio readOnly value="css">
            css
          </Radio>
          <Radio readOnly value="javascript">
            javascript
          </Radio>
        </RadioGroupField>
      );

      const radios = await screen.findAllByRole('radio');
      const html = radios[0];
      const css = radios[1];
      const javascript = radios[2];
      expect(html).toBeChecked();
      expect(css).not.toBeChecked();
      expect(javascript).not.toBeChecked();

      rerender(
        <RadioGroupField {...basicProps} value="css">
          <Radio value="html">html</Radio>
          <Radio value="css">css</Radio>
          <Radio value="javascript">javascript</Radio>
        </RadioGroupField>
      );

      // userEvent.click(css);
      expect(html).not.toBeChecked();
      expect(css).toBeChecked();
      expect(javascript).not.toBeChecked();

      rerender(
        <RadioGroupField {...basicProps} value="javascript">
          <Radio value="html">html</Radio>
          <Radio value="css">css</Radio>
          <Radio value="javascript">javascript</Radio>
        </RadioGroupField>
      );
      expect(html).not.toBeChecked();
      expect(css).not.toBeChecked();
      expect(javascript).toBeChecked();
    });

    it('should set size attribute', async () => {
      render(RadioFieldGroup({ ...basicProps, size: 'large' }));

      const radioField = await screen.findByTestId(basicProps.testId);
      expect(radioField).toHaveAttribute('data-size', 'large');

      const radioButtons = await screen.findAllByTestId('radio-button');
      expect(radioButtons[0]).toHaveAttribute('data-size', 'large');
      expect(radioButtons[1]).toHaveAttribute('data-size', 'large');
      expect(radioButtons[2]).toHaveAttribute('data-size', 'large');
    });

    it('should render size classes for RadioGroupField', async () => {
      render(
        <>
          <RadioFieldGroup {...basicProps} size="small" testId="small" />
          <RadioFieldGroup {...basicProps} size="large" testId="large" />
        </>
      );

      const small = await screen.findByTestId('small');
      const large = await screen.findByTestId('large');

      expect(small.classList).toContain(
        `${ComponentClassNames['Field']}--small`
      );
      expect(large.classList).toContain(
        `${ComponentClassNames['Field']}--large`
      );
    });

    it('should be disabled if isDisabled is passed', async () => {
      render(RadioFieldGroup({ ...basicProps, isDisabled: true }));

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
        RadioFieldGroup({
          ...basicProps,
          defaultValue: 'html',
          isReadOnly: true,
        })
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
      render(RadioFieldGroup({ ...basicProps, isRequired: true }));
      const radios = await screen.findAllByRole('radio');
      const html = radios[0];
      const css = radios[1];
      const javascript = radios[2];
      expect(html).toBeRequired();
      expect(css).toBeRequired();
      expect(javascript).toBeRequired();
    });

    it('should set aria-hidden to be true on custom radio buttons', async () => {
      render(RadioFieldGroup({ ...basicProps }));

      const radioButtons = await screen.findAllByTestId('radio-button');
      expect(radioButtons[0]).toHaveAttribute('aria-hidden', 'true');
      expect(radioButtons[1]).toHaveAttribute('aria-hidden', 'true');
      expect(radioButtons[2]).toHaveAttribute('aria-hidden', 'true');
    });

    it('should set aria-invalid to be true on radio control when hasError is true', async () => {
      render(RadioFieldGroup({ ...basicProps, hasError: true }));

      const radios = await screen.findAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-invalid', 'true');
      expect(radios[1]).toHaveAttribute('aria-invalid', 'true');
      expect(radios[2]).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Descriptive message', () => {
    const descriptiveText = 'This is a descriptive text.';

    it('should render when descriptiveText is provided', () => {
      render(RadioFieldGroup({ ...basicProps, descriptiveText }));

      const descriptiveField = screen.queryByText(descriptiveText);
      expect(descriptiveField).toContainHTML(descriptiveText);
    });

    it('should map to descriptive text correctly', async () => {
      const descriptiveText = 'Description';
      render(RadioFieldGroup({ ...basicProps, descriptiveText }));
      const radioGroup = await screen.findByTestId(radioGroupTestId);
      expect(radioGroup).toHaveAccessibleDescription(descriptiveText);
    });
  });

  describe('Error messages', () => {
    const errorMessage = 'This is an error message';
    it('should not show when hasError is false', () => {
      render(RadioFieldGroup({ ...basicProps }));

      const errorText = screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('should show when hasError and errorMessage', () => {
      render(RadioFieldGroup({ ...basicProps, hasError: true, errorMessage }));
      const errorText = screen.queryByText(errorMessage);
      expect(errorText).toContainHTML(errorMessage);
    });
  });
});
