import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../Checkbox';
import { CheckboxProps } from '../../types/checkbox';
import { PrimitiveProps } from '../../types/view';
import { ComponentClassNames } from '../../shared';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('Checkbox test suite', () => {
  const basicProps = {
    children: 'Subscribe',
    name: 'testName',
    value: 'testValue',
    testId: 'testId',
  };

  const getCheckbox = (props: PrimitiveProps<CheckboxProps, 'input'>) => {
    const { children, ...rest } = props;
    return <Checkbox {...rest}>{children}</Checkbox>;
  };

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
  });

  describe('Icon test suite', () => {
    it('should render basic props correctly', async () => {
      render(getCheckbox({ ...basicProps, size: 'large' }));

      const icon = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.CheckboxIcon}`
      );
      expect(icon).not.toHaveAttribute('data-checked');
      expect(icon).not.toHaveAttribute('data-disabled');
      expect(icon).toHaveAttribute('data-size', 'large');
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
