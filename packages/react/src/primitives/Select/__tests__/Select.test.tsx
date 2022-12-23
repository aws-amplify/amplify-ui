import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '../Select';
import { IconExpandMore } from '../../Icon/internal';
import { ComponentClassNames } from '../../shared';

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
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;
    expect(select.nodeName).toBe('SELECT');
    expect(select.childNodes).toHaveLength(3);
    expect(select).toHaveAttribute('name', name);
    expect(select).toHaveAttribute('data-size', size);
    expect(select).toHaveAttribute('data-variation', variation);
    expect(select).toHaveClass(ComponentClassNames.Select);
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

    expect(small.classList).toContain(
      `${ComponentClassNames['Select']}--small`
    );
    expect(large.classList).toContain(
      `${ComponentClassNames['Select']}--large`
    );
  });

  it('should render variation classes for Select', async () => {
    render(
      <div>
        <Select testId="quiet" variation="quiet" />
      </div>
    );

    const quiet = await screen.findByTestId('quiet');

    expect(quiet.classList).toContain(
      `${ComponentClassNames['Select']}--quiet`
    );
  });

  it('should render error classes for Select', async () => {
    render(
      <div>
        <Select testId="error" hasError={true} />
      </div>
    );

    const error = await screen.findByTestId('error');

    expect(error.classList).toContain(
      `${ComponentClassNames['Select']}--error`
    );
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

    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;
    expect(select).toBeDisabled();
    expect(select).toBeRequired();
  });

  it('should render placeholder correctly if it is set', async () => {
    render(
      <Select placeholder={placeholder} defaultValue="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );

    const placeholderElement = (await screen.findByText(
      placeholder
    )) as HTMLOptionElement;
    expect(placeholderElement.nodeName).toBe('OPTION');
    expect(placeholderElement).toHaveAttribute('value', '');
    expect(placeholderElement.selected).toBeTruthy();
  });

  it('should be able to select an option as a controlled component', async () => {
    render(<SelectControlled />);
    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;
    const placeholderOption = screen.getByRole('option', {
      name: placeholder,
    }) as HTMLOptionElement;
    const optionOne = screen.getByRole('option', {
      name: '1',
    }) as HTMLOptionElement;
    const optionTwo = screen.getByRole('option', {
      name: '2',
    }) as HTMLOptionElement;
    const optionThree = screen.getByRole('option', {
      name: '3',
    }) as HTMLOptionElement;

    expect(placeholderOption.selected).toBeTruthy();

    userEvent.selectOptions(select, '1');
    expect(optionOne.selected).toBeTruthy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();

    userEvent.selectOptions(select, '2');
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeTruthy();
    expect(optionThree.selected).toBeFalsy();

    userEvent.selectOptions(select, '3');
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
    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;
    const placeholderOption = screen.getByRole('option', {
      name: placeholder,
    }) as HTMLOptionElement;
    const optionOne = screen.getByRole('option', {
      name: '1',
    }) as HTMLOptionElement;
    const optionTwo = screen.getByRole('option', {
      name: '2',
    }) as HTMLOptionElement;
    const optionThree = screen.getByRole('option', {
      name: '3',
    }) as HTMLOptionElement;

    expect(placeholderOption.selected).toBeTruthy();

    userEvent.selectOptions(select, '1');
    expect(optionOne.selected).toBeTruthy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();

    userEvent.selectOptions(select, '2');
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeTruthy();
    expect(optionThree.selected).toBeFalsy();

    userEvent.selectOptions(select, '3');
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

    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;

    const icon = await screen.findByTestId('test-icon');
    expect(select.parentElement).toContainElement(icon);
  });
});
