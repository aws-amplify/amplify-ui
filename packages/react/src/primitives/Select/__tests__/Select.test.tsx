import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '../Select';
import { ComponentClassNames } from '../../shared';

describe('Select primitive test suite', () => {
  const testId = 'test-select';
  const name = 'select-number';
  const size = 'small';
  const variation = 'filled';
  const placeholder = 'Please select your option';

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
    expect(select).toHaveAttribute('class', ComponentClassNames.Select);
    expect(select).not.toBeDisabled();
    expect(select).not.toBeRequired();
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
    expect(placeholderElement).toBeDisabled();
    expect(placeholderElement.selected).toBeTruthy();
  });

  it('should be able to select an option if not be disabled', async () => {
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

  it('should not be able to select an option if disabled', async () => {
    render(
      <Select
        testId={testId}
        placeholder={placeholder}
        defaultValue=""
        isDisabled
      >
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

    // placeholder will always be selected
    expect(placeholderOption.selected).toBeTruthy();

    userEvent.selectOptions(select, '1');
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();

    userEvent.selectOptions(select, '2');
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();

    userEvent.selectOptions(select, '3');
    expect(optionOne.selected).toBeFalsy();
    expect(optionTwo.selected).toBeFalsy();
    expect(optionThree.selected).toBeFalsy();
  });

  it('should be able to focus with tab if not be disabled', async () => {
    render(
      <Select testId={testId}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );
    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;

    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(select).toHaveFocus();
  });

  it('should not be able to focus with tab if be disabled', async () => {
    render(
      <Select testId={testId} isDisabled>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    );
    const select = (await screen.findByTestId(
      'test-select'
    )) as HTMLSelectElement;

    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(select).not.toHaveFocus();
  });
});
