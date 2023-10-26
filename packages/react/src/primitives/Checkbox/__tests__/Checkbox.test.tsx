import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../Checkbox';
import { Fieldset } from '../../Fieldset';
import { CheckboxProps } from '../../types/checkbox';
import { PrimitiveProps } from '../../types/view';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('Checkbox', () => {
  const basicProps = {
    label: 'Subscribe',
    name: 'testName',
    value: 'testValue',
    testId: 'testId',
  };

  const getCheckbox = (props: PrimitiveProps<CheckboxProps, 'input'>) => {
    return <Checkbox {...props} />;
  };

  it('should render checkbox states', async () => {
    render(
      <div>
        <Checkbox
          label="disabled"
          name="disabled"
          value="disabled"
          isDisabled
          testId="disabled"
        />
        <Checkbox
          label="error"
          name="error"
          value="error"
          hasError
          testId="error"
        />
        <Checkbox
          label="checked"
          name="checked"
          value="checked"
          checked
          testId="checked"
        />
        <Checkbox
          label="indeterminate"
          name="indeterminate"
          value="indeterminate"
          testId="indeterminate"
          isIndeterminate
        />
      </div>
    );

    const disabled = await screen.findByTestId('disabled');
    const error = await screen.findByTestId('error-amplify-checkbox__button');
    const checked = await screen.findByTestId('checked-amplify-checkbox__icon');
    const indeterminate = await screen.findByTestId(
      'indeterminate-amplify-checkbox__icon'
    );

    expect(disabled).toHaveClass(`${ComponentClassName['Checkbox']}--disabled`);
    expect(error).toHaveClass(`${ComponentClassName['CheckboxButton']}--error`);
    expect(checked).toHaveClass(
      `${ComponentClassName['CheckboxIcon']}--checked`
    );
    expect(indeterminate).toHaveClass(
      `${ComponentClassName['CheckboxIcon']}--indeterminate`
    );
  });

  it('should always be disabled if parent Fieldset isDisabled', async () => {
    render(
      <Fieldset legend="legend" isDisabled>
        <Checkbox {...basicProps} testId="checkbox" />
        <Checkbox
          {...basicProps}
          isDisabled={false}
          testId="checkboxWithDisabledProp"
        />
      </Fieldset>
    );

    const checkbox = await screen.findByTestId('checkbox');
    const checkboxDisabled = await screen.findByTestId(
      'checkboxWithDisabledProp'
    );
    expect(checkbox).toHaveClass(`${ComponentClassName['Checkbox']}--disabled`);
    expect(checkboxDisabled).toHaveClass(
      `${ComponentClassName['Checkbox']}--disabled`
    );
  });

  it('should render basic props correctly', async () => {
    render(getCheckbox({ ...basicProps }));

    const checkbox = await screen.findByTestId(basicProps.testId);
    expect(checkbox.nodeName).toBe('LABEL');
    expect(checkbox).not.toHaveAttribute('data-disabled');
    expect(checkbox).toHaveClass(ComponentClassName.Checkbox);
  });

  it('should render custom class name', async () => {
    const customClassName = 'custom-class';
    render(getCheckbox({ ...basicProps, className: customClassName }));

    const checkbox = await screen.findByTestId(basicProps.testId);
    expect(checkbox).toHaveClass(customClassName);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} {...basicProps} />);

    await screen.findByTestId(basicProps.testId);
    expect(ref.current?.nodeName).toBe('INPUT');
  });

  it('should render all flex style props', async () => {
    render(getCheckbox({ ...basicProps, ...testFlexProps }));
    const checkboxField = await screen.findByTestId(basicProps.testId);
    expectFlexContainerStyleProps(checkboxField);
  });

  describe('Input test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps }));

      const input = await screen.findByRole('checkbox');
      expect(input).toHaveAttribute('name', basicProps.name);
      expect(input).toHaveAttribute('value', basicProps.value);
      expect(input).not.toBeChecked();
      expect(input).toHaveClass(ComponentClassName.CheckboxInput);
    });

    it('should be checked by default if defaultChecked is set to true', async () => {
      render(getCheckbox({ ...basicProps, defaultChecked: true }));

      const input = await screen.findByRole('checkbox');
      expect(input).toBeChecked();
    });

    it('should be disabled if parent Fieldset isDisabled and checkbox isDisabled={false}', async () => {
      render(
        <Fieldset legend="legend" isDisabled>
          {getCheckbox({ ...basicProps, isDisabled: false })}
        </Fieldset>
      );

      const input = await screen.findByRole('checkbox');
      expect(input).toHaveAttribute('disabled');
    });

    it('should be disabled if parent Fieldset isDisabled and checkbox isDisabled is not defined', async () => {
      render(
        <Fieldset legend="legend" isDisabled>
          {getCheckbox({ ...basicProps })}
        </Fieldset>
      );

      const input = await screen.findByRole('checkbox');
      expect(input).toHaveAttribute('disabled');
    });

    it('should be disabled if isDisabled is set to true', async () => {
      render(getCheckbox({ ...basicProps, isDisabled: true }));

      const input = await screen.findByRole('checkbox');
      expect(input).toBeDisabled();
    });

    it('should be required if isRequired is set to true', async () => {
      render(getCheckbox({ ...basicProps, isRequired: true }));

      const input = await screen.findByRole('checkbox');
      expect(input).toBeRequired();
    });

    it('should be read-only if isReadOnly is set to true', async () => {
      render(getCheckbox({ ...basicProps, isReadOnly: true }));

      const input = await screen.findByRole('checkbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('should invoke callbacks correctly', async () => {
      const onBlur = jest.fn();
      const onChange = jest.fn();
      const onFocus = jest.fn();
      render(
        <div>
          {getCheckbox({ ...basicProps, onBlur, onChange, onFocus })}
          <div data-testid="blur"></div>
        </div>
      );

      const input = await screen.findByRole('checkbox');
      userEvent.click(input);
      expect(onBlur).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
      const blur = await screen.findByTestId('blur');
      userEvent.click(blur);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps }));

      const button = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassName.CheckboxButton}`
      );
      expect(button).not.toHaveAttribute('data-checked');
      expect(button).not.toHaveAttribute('data-disabled');
      expect(button).toHaveAttribute('data-focus', 'false');
      expect(button).toHaveClass(ComponentClassName.CheckboxButton);
    });

    it('should update the checked button with a change to the controlled value', async () => {
      const { rerender } = render(<Checkbox {...basicProps} checked={false} />);

      let button = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassName.CheckboxButton}`
      );
      expect(button).toHaveAttribute('data-checked', 'false');
      expect(button).not.toHaveAttribute('data-disabled');
      expect(button).toHaveAttribute('data-focus', 'false');
      expect(button).toHaveClass(ComponentClassName.CheckboxButton);
      // act(() => updateCheckedFunction(true));
      rerender(<Checkbox {...basicProps} checked />);
      button = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassName.CheckboxButton}`
      );
      expect(button).toHaveAttribute('data-checked', 'true');
    });
  });

  describe('Icon test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps, size: 'large' }));

      const icon = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassName.CheckboxIcon}`
      );
      expect(icon).not.toHaveAttribute('data-checked');
      expect(icon).not.toHaveAttribute('data-disabled');
      expect(icon).toHaveClass(ComponentClassName.CheckboxIcon);
    });
  });

  describe('Label test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps, size: 'large' }));

      const label = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassName.CheckboxLabel}`
      );
      expect(label).not.toHaveAttribute('data-disabled');
      expect(label).toHaveClass(ComponentClassName.CheckboxLabel);
    });
  });
});
