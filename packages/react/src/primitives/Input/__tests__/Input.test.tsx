import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../Input';
import { Fieldset } from '../../Fieldset';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Input component', () => {
  it('should render custom classname for Input', async () => {
    render(<Input className="custom-class" />);

    const input = await screen.findByRole('textbox');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass(ComponentClassName.Input);
  });

  it('should render variation classes for Input', async () => {
    render(
      <div>
        <Input testId="quiet" variation="quiet" />
      </div>
    );

    const quiet = await screen.findByTestId('quiet');

    expect(quiet.classList).toContain(`${ComponentClassName['Input']}--quiet`);
  });

  it('should render error classes for Input', async () => {
    render(
      <div>
        <Input testId="error" hasError />
      </div>
    );

    const error = await screen.findByTestId('error');

    expect(error.classList).toContain(`${ComponentClassName['Input']}--error`);
  });

  it('should render size classes for Input', async () => {
    render(
      <div>
        <Input testId="small" size="small" />
        <Input testId="large" size="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassName['Input']}--small`);
    expect(large.classList).toContain(`${ComponentClassName['Input']}--large`);
  });

  it('should render expected classname, id Input field', async () => {
    render(
      <Input
        id="testField"
        testId="testId"
        className="my-input"
        defaultValue="Hello there"
      />
    );

    const input = await screen.findByRole('textbox');
    expect(input).toHaveClass('my-input');
    expect(input.id).toBe('testField');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} />);
    await screen.findByRole('textbox');
    expect(ref.current?.nodeName).toBe('INPUT');
  });

  it('should render the state attributes', async () => {
    render(<Input size="small" hasError isDisabled isReadOnly isRequired />);

    const input = await screen.findByRole('textbox');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('required');
  });

  it('should always be disabled if parent Fieldset isDisabled', async () => {
    render(
      <Fieldset legend="legend" isDisabled>
        <Input testId="input" />
        <Input testId="inputWithDisabledProp" isDisabled={false} />
      </Fieldset>
    );

    const input = await screen.findByTestId('input');
    const inputDisabled = await screen.findByTestId('inputWithDisabledProp');
    expect(input).toHaveAttribute('disabled');
    expect(inputDisabled).toHaveAttribute('disabled');
  });

  it('should set size and variation classes', async () => {
    render(<Input size="small" variation="quiet" />);

    const input = await screen.findByRole('textbox');
    expect(input).toHaveClass(`${ComponentClassName.Input}--small`);
    expect(input).toHaveClass(`${ComponentClassName.Input}--quiet`);
  });

  it('can set defaultChecked (uncontrolled)', async () => {
    render(<Input type="radio" defaultChecked />);

    const radio = await screen.findByRole('radio');
    expect(radio).toBeChecked();
  });

  it('can set defaultValue (uncontrolled)', async () => {
    render(<Input defaultValue="test" />);

    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('test');
  });

  it('can set checked (controlled component)', async () => {
    const onChange = jest.fn();
    render(<Input type="radio" checked onChange={onChange} />);

    const radio = await screen.findByRole('radio');
    expect(radio).toBeChecked();
  });

  it('can set value (controlled component)', async () => {
    render(<Input value="test" onChange={jest.fn()} />);

    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('test');
  });

  it('show add aria-invalid attribute to input when hasError', async () => {
    render(<Input id="testField" hasError />);
    const input = await screen.findByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid');
  });

  it('should fire event handlers', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onPaste = jest.fn();
    render(<Input onChange={onChange} onInput={onInput} onPaste={onPaste} />);
    const input = await screen.findByRole('textbox');
    userEvent.type(input, 'hello');
    // userEvent.paste(input, 'there');
    expect(onChange).toHaveBeenCalled();
    expect(onInput).toHaveBeenCalled();
    expect(onPaste).toHaveBeenCalled();
  });
});
