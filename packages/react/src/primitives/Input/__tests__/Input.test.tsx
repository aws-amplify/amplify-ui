import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../Input';
import { ComponentClassNames } from '../../shared';

describe('Input component', () => {
  it('should render custom classname for Input', async () => {
    render(<Input className="custom-class" />);

    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass(ComponentClassNames.Input);
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

  it('should render the state attributes', async () => {
    render(<Input size="small" hasError isDisabled isReadOnly isRequired />);

    const input = await screen.findByRole('textbox');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('required');
  });

  it('should set size and variation data attributes', async () => {
    render(<Input size="small" variation="quiet" />);

    const input = await screen.findByRole('textbox');
    expect(input.dataset['size']).toBe('small');
    expect(input.dataset['variation']).toBe('quiet');
  });

  it('can set defaultValue (uncontrolled)', async () => {
    render(<Input defaultValue="test" />);

    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input.value).toBe('test');
  });

  it('can set value (controlled component)', async () => {
    render(<Input value="test" />);

    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input.value).toBe('test');
  });

  it('show add aria-invalid attribute to input when hasError', async () => {
    render(<Input id="testField" hasError={true} />);
    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input).toHaveAttribute('aria-invalid');
  });

  it('should fire event handlers', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onPaste = jest.fn();
    render(<Input onChange={onChange} onInput={onInput} onPaste={onPaste} />);
    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    userEvent.type(input, 'hello');
    userEvent.paste(input, 'there');
    expect(onChange).toHaveBeenCalled();
    expect(onInput).toHaveBeenCalled();
    expect(onPaste).toHaveBeenCalled();
  });
});
