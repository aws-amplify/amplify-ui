import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxField } from '../CheckboxField';
import { CheckboxFieldProps } from '../../types/checkboxField';
import { ComponentClassNames } from '../../shared';

describe('CheckboxField test suite', () => {
  const basicProps = {
    label: 'Subscribe',
    name: 'testName',
    value: 'testValue',
    testId: 'testId',
  };

  const getCheckboxField = (props: CheckboxFieldProps) => {
    return <CheckboxField {...props} />;
  };
  const ControlledCheckboxField = () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <CheckboxField
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        {...basicProps}
      />
    );
  };
  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(getCheckboxField({ ...basicProps, className }));

    const checkboxField = await screen.findByTestId(basicProps.testId);
    expect(checkboxField).toHaveClass(
      ComponentClassNames.Field,
      ComponentClassNames.CheckboxField,
      className
    );
  });

  it('should have no default labelPosition', async () => {
    render(getCheckboxField({ ...basicProps }));
    const checkboxField = await screen.findByTestId(basicProps.testId);
    expect(checkboxField.querySelector('label')).not.toHaveAttribute(
      'data-label-position'
    );
  });

  it('should work with labelPosition', async () => {
    render(getCheckboxField({ ...basicProps, labelPosition: 'end' }));
    const checkboxField = await screen.findByTestId(basicProps.testId);
    expect(checkboxField.querySelector('label')).toHaveAttribute(
      'data-label-position',
      'end'
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<CheckboxField {...basicProps} ref={ref} />);

    await screen.findByTestId(basicProps.testId);
    expect(ref.current?.nodeName).toBe('INPUT');
  });

  describe('Checkbox functionality', () => {
    const expectFunctionality = async (component) => {
      render(component);

      const checkbox = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassNames.Checkbox}`
      );
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
