import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from '../../Radio';
import { RadioGroupField } from '../RadioGroupField';
import { RadioGroupFieldProps } from '../../types/radioGroupField';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';
import { ERROR_SUFFIX, DESCRIPTION_SUFFIX } from '../../../helpers/constants';
import { getUniqueComponentId } from '../../utils/getUniqueComponentId';

const basicProps = { legend: 'testLabel', name: 'testName', testId: 'testId' };
const radioGroupTestId = `${basicProps.testId}-${ComponentClassName.RadioGroup}`;

const RadioFieldGroup = ({ legend, name, ...props }: RadioGroupFieldProps) => {
  return (
    <RadioGroupField legend={legend} name={name} {...props}>
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
      ComponentClassName.Field,
      ComponentClassName.RadioGroupField,
      className
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLFieldSetElement>();
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
    expect(radioField.querySelector('.amplify-radio')).toHaveClass(
      'amplify-label-end'
    );
  });

  describe('Legend', () => {
    it('should render visually-hidden legend element with legend name', async () => {
      render(RadioFieldGroup({ ...basicProps }));

      const legendElement = await screen.findAllByText(basicProps.legend);
      expect(legendElement[0].nodeName).toBe('LEGEND');
    });

    it('should have `amplify-fieldset__legend` classname', async () => {
      render(RadioFieldGroup({ ...basicProps, legendHidden: true }));

      const legendElement = await screen.findAllByText(basicProps.legend);

      expect(legendElement[1]).toHaveClass(ComponentClassName.FieldsetLegend);
    });

    it('should have `amplify-visually-hidden` class when legendHidden is true', async () => {
      render(RadioFieldGroup({ ...basicProps, legendHidden: true }));

      const legendElement = await screen.findAllByText(basicProps.legend);
      expect(legendElement[1]).toHaveClass('amplify-visually-hidden');
    });
  });

  describe('RadioGroup', () => {
    it('should render default classname', async () => {
      render(RadioFieldGroup({ ...basicProps }));
      const radioGroup = await screen.findByTestId(radioGroupTestId);
      expect(radioGroup).toHaveClass(ComponentClassName.RadioGroup);
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

      await act(async () => {
        await userEvent.click(css);
      });
      expect(html).not.toBeChecked();
      expect(css).toBeChecked();
      expect(javascript).not.toBeChecked();

      await act(async () => {
        await userEvent.click(javascript);
      });
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

    it('should have --large appended to the classname when size is large', async () => {
      render(RadioFieldGroup({ ...basicProps, size: 'large' }));

      const radioField = await screen.findByTestId(basicProps.testId);
      expect(radioField).toHaveClass(
        `${ComponentClassName['Fieldset']}--large`
      );

      const radioButtons = await screen.findAllByTestId('radio-button');

      expect(radioButtons[0]).toHaveClass(
        `${ComponentClassName['RadioButton']}--large`
      );
      expect(radioButtons[1]).toHaveClass(
        `${ComponentClassName['RadioButton']}--large`
      );
      expect(radioButtons[2]).toHaveClass(
        `${ComponentClassName['RadioButton']}--large`
      );
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
        `${ComponentClassName['Field']}--small`
      );
      expect(large.classList).toContain(
        `${ComponentClassName['Field']}--large`
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

  describe('aria-describedby test', () => {
    const errorMessage = 'This is an error message';
    const descriptiveText = 'Description';
    it('when hasError, include id of error component and describe component in the aria-describedby', async () => {
      render(
        RadioFieldGroup({
          ...basicProps,
          descriptiveText,
          hasError: true,
          errorMessage,
        })
      );

      const field = await screen.findByTestId(
        getUniqueComponentId(
          basicProps.testId,
          ComponentClassName.RadioGroup
        ) || ''
      );
      const ariaDescribedBy = field.getAttribute('aria-describedby');
      const descriptiveTextElement = screen.queryByText(descriptiveText);
      const errorTextElement = screen.queryByText(errorMessage);
      expect(
        errorTextElement?.id && errorTextElement?.id.endsWith(ERROR_SUFFIX)
      ).toBe(true);
      expect(
        descriptiveTextElement?.id &&
          descriptiveTextElement?.id.endsWith(DESCRIPTION_SUFFIX)
      ).toBe(true);
      expect(
        errorTextElement?.id &&
          descriptiveTextElement?.id &&
          ariaDescribedBy ===
            `${errorTextElement.id} ${descriptiveTextElement.id}`
      ).toBe(true);
    });

    it('only show id of describe component in aria-describedby when hasError is false', async () => {
      render(
        RadioFieldGroup({
          ...basicProps,
          descriptiveText,
          errorMessage,
        })
      );

      const field = await screen.findByTestId(
        getUniqueComponentId(
          basicProps.testId,
          ComponentClassName.RadioGroup
        ) || ''
      );
      const ariaDescribedBy = field.getAttribute('aria-describedby');
      const descriptiveTextElement = screen.queryByText(descriptiveText);
      expect(
        descriptiveTextElement?.id &&
          ariaDescribedBy?.startsWith(descriptiveTextElement?.id)
      ).toBe(true);
    });

    it('aria-describedby should be empty when hasError is false and descriptiveText is empty', async () => {
      render(
        RadioFieldGroup({
          ...basicProps,
          errorMessage,
        })
      );

      const field = await screen.findByTestId(basicProps.testId);
      const ariaDescribedBy = field.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBeNull();
    });
  });
});
