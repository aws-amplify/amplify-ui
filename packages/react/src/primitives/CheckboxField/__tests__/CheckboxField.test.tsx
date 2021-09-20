import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxField } from '../CheckboxField';
import { CheckboxFieldProps } from '../../types/checkboxField';
import { ComponentClassNames } from '../../shared';
import {
  testFlexProps,
  expectFlexStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('CheckboxField test suite', () => {
  const basicProps = { name: 'test', value: 'test', testId: 'test' };
  const getCheckboxField = (props: CheckboxFieldProps) => {
    return <CheckboxField {...props}>test</CheckboxField>;
  };
  const ControlledCheckboxField = () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckboxField
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        {...basicProps}
      >
        test
      </CheckboxField>
    );
  };
  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(getCheckboxField({ ...basicProps, className }));

    const checkboxField = await screen.findByTestId('test');
    expect(checkboxField).toHaveClass(
      ComponentClassNames.Field,
      ComponentClassNames.CheckboxField,
      className
    );
  });

  it('should render all flex style props', async () => {
    render(getCheckboxField({ ...basicProps, ...testFlexProps }));
    const checkboxField = await screen.findByTestId('test');
    expectFlexStyleProps(checkboxField);
  });

  describe('Checkbox functionality', () => {
    const expectFunctionality = async (component) => {
      render(component);

      const checkbox = await screen.findByTestId('test-checkbox');
      userEvent.click(checkbox);

      const input = await screen.findByRole('checkbox');
      expect(input).toBeChecked();
      userEvent.click(checkbox);
      expect(input).not.toBeChecked();
    };
    it('should work in uncontrolled way', async () => {
      expectFunctionality(getCheckboxField({ ...basicProps }));
    });

    it('should work in controlled way', async () => {
      expectFunctionality(<ControlledCheckboxField />);
    });
  });

  describe('Error messages', () => {
    const errorMessage = 'This is an error message';
    it('should not show when hasError is false', async () => {
      render(getCheckboxField({ ...basicProps }));

      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('should show when hasError and errorMessage', async () => {
      render(getCheckboxField({ ...basicProps, hasError: true, errorMessage }));
      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).toContainHTML(errorMessage);
    });
  });
});
