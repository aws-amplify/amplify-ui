import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../Checkbox';
import { CheckboxProps } from '../../types/checkbox';
import { PrimitiveProps } from '../../types/view';
import { ComponentClassNames } from '../../shared/constants';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('Checkbox test suite', () => {
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
          isDisabled={true}
          testId="disabled"
        />
        <Checkbox
          label="error"
          name="error"
          value="error"
          hasError={true}
          testId="error"
        />
        <Checkbox
          label="checked"
          name="checked"
          value="checked"
          checked={true}
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

    expect(disabled).toHaveClass(
      `${ComponentClassNames['Checkbox']}--disabled`
    );
    expect(error).toHaveClass(
      `${ComponentClassNames['CheckboxButton']}--error`
    );
    expect(checked).toHaveClass(
      `${ComponentClassNames['CheckboxIcon']}--checked`
    );
    expect(indeterminate).toHaveClass(
      `${ComponentClassNames['CheckboxIcon']}--indeterminate`
    );
  });

  it('should render basic props correctly', async () => {
    render(getCheckbox({ ...basicProps }));

    const checkbox = await screen.findByTestId(basicProps.testId);
    expect(checkbox.nodeName).toBe('LABEL');
    expect(checkbox).not.toHaveAttribute('data-disabled');
    expect(checkbox).toHaveClass(ComponentClassNames.Checkbox);
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
      expect(input).toHaveClass(ComponentClassNames.CheckboxInput);
    });

    it('should be checked by default if defaultChecked is set to true', async () => {
      render(getCheckbox({ ...basicProps, defaultChecked: true }));

      const input = await screen.findByRole('checkbox');
      expect(input).toBeChecked();
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
      expect(onBlur).not.toBeCalled();
      expect(onChange).toBeCalledTimes(1);
      expect(onFocus).toBeCalledTimes(1);
      const blur = await screen.findByTestId('blur');
      userEvent.click(blur);
      expect(onBlur).toBeCalledTimes(1);
    });
  });

  describe('Button test suite', () => {
    let updateCheckedFunction;
    const ControlledCheckbox = () => {
      const [checked, setChecked] = React.useState(false);
      updateCheckedFunction = setChecked;
      return (
        <Checkbox
          {...basicProps}
          onChange={(event) => {
            setChecked(event.target.checked);
          }}
          checked={checked}
        />
      );
    };

    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps }));

      const button = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.CheckboxButton}`
      );
      expect(button).not.toHaveAttribute('data-checked');
      expect(button).not.toHaveAttribute('data-disabled');
      expect(button).toHaveAttribute('data-focus', 'false');
      expect(button).toHaveClass(ComponentClassNames.CheckboxButton);
    });

    it('should update the checked button with a change to the controlled value', async () => {
      render(<ControlledCheckbox />);

      let button = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.CheckboxButton}`
      );
      expect(button).toHaveAttribute('data-checked', 'false');
      expect(button).not.toHaveAttribute('data-disabled');
      expect(button).toHaveAttribute('data-focus', 'false');
      expect(button).toHaveClass(ComponentClassNames.CheckboxButton);
      act(() => updateCheckedFunction(true));
      button = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.CheckboxButton}`
      );
      expect(button).toHaveAttribute('data-checked', 'true');
    });
  });

  describe('Icon test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps, size: 'large' }));

      const icon = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.CheckboxIcon}`
      );
      expect(icon).not.toHaveAttribute('data-checked');
      expect(icon).not.toHaveAttribute('data-disabled');
      expect(icon).toHaveClass(ComponentClassNames.CheckboxIcon);
    });
  });

  describe('Label test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps, size: 'large' }));

      const label = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.CheckboxLabel}`
      );
      expect(label).not.toHaveAttribute('data-disabled');
      expect(label).toHaveClass(ComponentClassNames.CheckboxLabel);
    });
  });
});
