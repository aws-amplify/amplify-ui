import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassNames } from '../../shared';
import { SelectField } from '../SelectField';
import {
  testFlexProps,
  expectFlexStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('SelectField test suite', () => {
  const className = 'my-select';
  const id = 'my-select';
  const label = 'Number';
  const testId = 'test-select';
  const errorMessage = 'This is an error message';
  describe('Flex wrapper', () => {
    it('should render default and custom classname ', async () => {
      render(
        <SelectField label={label} testId={testId} className={className}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );

      const selectField = await screen.findByTestId(testId);
      expect(selectField).toHaveClass(className);
      expect(selectField).toHaveClass(ComponentClassNames.Field);
    });

    it('should render all flex style props', async () => {
      render(
        <SelectField label={label} testId={testId} {...testFlexProps}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );
      const selectField = await screen.findByTestId(testId);
      expectFlexStyleProps(selectField);
    });
  });

  describe('Label', () => {
    it('should render expected field classname', async () => {
      render(
        <SelectField label={label} testId={testId}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );

      const labelElelment = (await screen.findByText(
        label
      )) as HTMLLabelElement;
      expect(labelElelment).toHaveClass(ComponentClassNames.Label);
    });

    it('should have `sr-only` class when labelHidden is true', async () => {
      render(
        <SelectField label={label} testId={testId} labelHidden>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );

      const labelElelment = await screen.findByText(label);
      expect(labelElelment).toHaveClass('sr-only');
    });
  });

  describe('Select control', () => {
    it('should render expected id and aria-labelledby for select control', async () => {
      render(
        <SelectField id={id} label={label} testId={testId}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );

      const selectField = await screen.findByTestId(testId);
      const select = selectField.childNodes[1].childNodes[0];
      expect(select).toHaveAttribute('id', id);
      expect(select).toHaveAttribute('aria-labelledby', id);
    });
  });

  it('should render the state attributes', async () => {
    render(
      <SelectField
        label={label}
        testId={testId}
        className={className}
        isDisabled
        isRequired
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </SelectField>
    );

    const selectField = await screen.findByTestId(testId);
    const select = selectField.childNodes[1].childNodes[0];
    expect(select).toBeDisabled();
    expect(select).toBeRequired();
  });

  it('should set size and variation data attributes', async () => {
    render(
      <SelectField label={label} testId={testId} size="small" variation="quiet">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </SelectField>
    );

    const selectField = await screen.findByTestId(testId);
    const select = selectField.childNodes[1].childNodes[0];
    expect(selectField).toHaveAttribute('data-size', 'small');
    expect(select).toHaveAttribute('data-variation', 'quiet');
  });

  it('can set defaultValue', async () => {
    render(
      <SelectField label={label} testId={testId} defaultValue="1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </SelectField>
    );

    const selectField = await screen.findByTestId(testId);
    const select = selectField.childNodes[1].childNodes[0];
    expect(select).toHaveValue('1');
  });

  it('show add aria-invalid attribute to select when hasError', async () => {
    render(
      <SelectField label={label} testId={testId} hasError errorMessage="error">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </SelectField>
    );
    const selectField = await screen.findByTestId(testId);
    const select = selectField.childNodes[1].childNodes[0];
    expect(select).toHaveAttribute('aria-invalid');
  });

  it('should fire event handlers', async () => {
    const onChange = jest.fn();
    render(
      <SelectField label={label} testId={testId} value="1" onChange={onChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </SelectField>
    );
    const selectField = await screen.findByTestId(testId);
    const select = selectField.childNodes[1].childNodes[0] as HTMLSelectElement;
    userEvent.selectOptions(select, '2');
    expect(onChange).toHaveBeenCalled();
  });

  describe('Error messages', () => {
    it("don't show when hasError is false", async () => {
      render(
        <SelectField label={label} testId={testId} errorMessage={errorMessage}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );

      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('show when hasError and errorMessage', async () => {
      render(
        <SelectField
          label={label}
          testId={testId}
          errorMessage={errorMessage}
          hasError
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectField>
      );
      const errorText = await screen.queryByText(errorMessage);
      expect(errorText.innerHTML).toContain(errorMessage);
    });
  });
});
