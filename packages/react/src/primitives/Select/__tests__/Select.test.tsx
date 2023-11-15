import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '../Select';
import { Fieldset } from '../../Fieldset';
import { IconExpandMore } from '../../Icon/internal';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Select primitive test suite', () => {
  const testId = 'test-select';
  const name = 'select-number';
  const size = 'small';
  const variation = 'quiet';
  const placeholder = 'Please select your option';
  const SelectControlled = () => {
    const [value, setValue] = React.useState('');

    return (
      <Select
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        testId={testId}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );
  };

  it('should render component correctly with basic props', async () => {
    render(
      <Select
        testId={testId}
        name={name}
        size={size}
        variation={variation}
        isDisabled={false}
        isRequired={false}
        isMultiple={false}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const select = await screen.findByTestId('test-select');
    expect(select.nodeName).toBe('SELECT');
    expect(select.childNodes).toHaveLength(3);
    expect(select).toHaveAttribute('name', name);
    expect(select).toHaveClass(`${ComponentClassName.Select}--${size}`);
    expect(select).toHaveClass(`${ComponentClassName.Select}--${variation}`);
    expect(select).toHaveClass(ComponentClassName.Select);
    expect(select).not.toBeDisabled();
    expect(select).not.toBeRequired();
  });

  it('should render size classes for Select', async () => {
    render(
      <div>
        <Select testId="small" size="small" />
        <Select testId="large" size="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassName['Select']}--small`);
    expect(large.classList).toContain(`${ComponentClassName['Select']}--large`);
  });

  it('should render variation classes for Select', async () => {
    render(
      <div>
        <Select testId="quiet" variation="quiet" />
      </div>
    );

    const quiet = await screen.findByTestId('quiet');

    expect(quiet.classList).toContain(`${ComponentClassName['Select']}--quiet`);
  });

  it('should render error classes for Select', async () => {
    render(
      <div>
        <Select testId="error" hasError />
      </div>
    );

    const error = await screen.findByTestId('error');

    expect(error.classList).toContain(`${ComponentClassName['Select']}--error`);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref} testId={testId}></Select>);

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('SELECT');
  });

  it('should be able to pass through isDisabled and isRequired props', async () => {
    render(
      <Select testId={testId} isDisabled isRequired>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const select = await screen.findByTestId('test-select');
    expect(select).toBeDisabled();
    expect(select).toBeRequired();
  });

  it('should render the multiple attribute', async () => {
    render(
      <Select testId={testId} isMultiple>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const select = await screen.findByTestId('test-select');
    expect(select).toHaveAttribute('multiple');
  });

  it('should render the size attribute', async () => {
    render(
      <Select testId={testId} selectSize={2}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const select = await screen.findByTestId('test-select');
    expect(select).toHaveAttribute('size', '2');
  });

  it('should always be disabled if parent Fieldset isDisabled', async () => {
    render(
      <Fieldset legend="legend" isDisabled>
        <Select testId="select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
        <Select testId="selectWithDisabledProp" isDisabled={false}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Fieldset>
    );

    const select = await screen.findByTestId('select');
    const selectDisabled = await screen.findByTestId('selectWithDisabledProp');
    expect(select).toHaveAttribute('disabled');
    expect(selectDisabled).toHaveAttribute('disabled');
  });

  it('should render placeholder correctly if it is set', async () => {
    render(
      <Select placeholder={placeholder} defaultValue="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const placeholderElement =
      await screen.findByText<HTMLOptionElement>(placeholder);
    expect(placeholderElement.nodeName).toBe('OPTION');
    expect(placeholderElement).toHaveAttribute('value', '');
    expect(placeholderElement.selected).toBeTruthy();
  });

  it('should be able to select an option as a controlled component', async () => {
    render(<SelectControlled />);
    const select = await screen.findByTestId<HTMLSelectElement>('test-select');
    const placeholderOption = screen.getByRole<HTMLOptionElement>('option', {
      name: placeholder,
    });
    const optionOne = screen.getByRole<HTMLOptionElement>('option', {
      name: '1',
    });
    const optionTwo = screen.getByRole<HTMLOptionElement>('option', {
      name: '2',
    });
    const optionThree = screen.getByRole<HTMLOptionElement>('option', {
      name: '3',
    });

    expect(placeholderOption.selected).toBeTruthy();

    await act(async () => {
      await userEvent.selectOptions(select, '1');
    });
    expect(optionOne.selected).toBeTruthy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();

    await act(async () => {
      await userEvent.selectOptions(select, '2');
    });
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeTruthy();
    expect(optionThree.selected).toBeFalsy();

    await act(async () => {
      await userEvent.selectOptions(select, '3');
    });
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeTruthy();
  });

  it('should be able to select an option as an uncontrolled component', async () => {
    render(
      <Select testId={testId} placeholder={placeholder} defaultValue="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );
    const select = await screen.findByTestId<HTMLSelectElement>('test-select');
    const placeholderOption = screen.getByRole<HTMLOptionElement>('option', {
      name: placeholder,
    });
    const optionOne = screen.getByRole<HTMLOptionElement>('option', {
      name: '1',
    });
    const optionTwo = screen.getByRole<HTMLOptionElement>('option', {
      name: '2',
    });
    const optionThree = screen.getByRole<HTMLOptionElement>('option', {
      name: '3',
    });

    expect(placeholderOption.selected).toBeTruthy();

    await act(async () => {
      await userEvent.selectOptions(select, '1');
    });
    expect(optionOne.selected).toBeTruthy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();

    await act(async () => {
      await userEvent.selectOptions(select, '2');
    });
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeTruthy();
    expect(optionThree.selected).toBeFalsy();

    await act(async () => {
      await userEvent.selectOptions(select, '3');
    });
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeTruthy();
  });

  it('should render an icon to the right correctly', async () => {
    const testIcon = <IconExpandMore data-testid="test-icon" />;
    render(
      <Select testId={testId} icon={testIcon}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const select = await screen.findByTestId('test-select');

    const icon = await screen.findByTestId('test-icon');
    expect(select.parentElement).toContainElement(icon);
  });
});
