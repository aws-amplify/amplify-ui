import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../Input';
import { ComponentClassNames } from '../../shared';

describe('Input component', () => {
  it('should render custom classname for Input', async () => {
    render(<Input className="custom-class" />);

    const label = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(label.className).toContain('custom-class');
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

    const field = await screen.findByRole('textbox');
    expect(field.className).toContain('my-input');
    expect(field.id).toBe('testField');
  });

  it('should render the state attributes', async () => {
    render(<Input size="small" hasError isDisabled isReadOnly isRequired />);

    const field = await screen.findByRole('textbox');
    expect(field.getAttribute('disabled')).toBeDefined();
    expect(field.getAttribute('readonly')).toBeDefined();
    expect(field.getAttribute('required')).toBeDefined();
  });

  it('should set size and variation data attributes', async () => {
    render(<Input size="small" variation="quiet" />);

    const field = await screen.findByRole('textbox');
    expect(field.dataset['size']).toBe('small');
    expect(field.dataset['variation']).toBe('quiet');
  });

  it('can set defaultValue (uncontrolled)', async () => {
    render(<Input defaultValue="test" />);

    const field = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(field.value).toBe('test');
  });

  it('can set value (controlled component)', async () => {
    render(<Input value="test" />);

    const field = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(field.value).toBe('test');
  });

  it('show add aria-invalid attribute to input when hasError', async () => {
    render(<Input id="testField" hasError={true} />);
    const field = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(field.getAttribute('aria-invalid')).toBeDefined();
  });

  it('should fire event handlers', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onPaste = jest.fn();
    render(<Input onChange={onChange} onInput={onInput} onPaste={onPaste} />);
    const field = (await screen.findByRole('textbox')) as HTMLInputElement;
    userEvent.type(field, 'hello');
    userEvent.paste(field, 'there');
    expect(onChange).toHaveBeenCalled();
    expect(onInput).toHaveBeenCalled();
    expect(onPaste).toHaveBeenCalled();
  });
});
