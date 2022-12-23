import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from '../TextArea';
import { ComponentClassNames } from '../../shared';

describe('TextArea component', () => {
  it('should render custom classname for TextArea', async () => {
    render(<TextArea className="custom-class" />);

    const textarea = (await screen.findByRole(
      'textbox'
    )) as HTMLTextAreaElement;
    expect(textarea).toHaveClass('custom-class');
    expect(textarea).toHaveClass(ComponentClassNames.Textarea);
  });

  it('should render expected classname, id TextArea field', async () => {
    render(
      <TextArea
        id="testField"
        testId="testId"
        className="my-textarea"
        defaultValue="Hello there"
      />
    );

    const textarea = await screen.findByRole('textbox');
    expect(textarea).toHaveClass('my-textarea');
    expect(textarea.id).toBe('testField');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTextAreaElement>();

    render(<TextArea ref={ref} />);
    await screen.findByRole('textbox');
    expect(ref.current?.nodeName).toBe('TEXTAREA');
  });

  it('should render the state attributes', async () => {
    render(<TextArea size="small" hasError isDisabled isReadOnly isRequired />);

    const textarea = await screen.findByRole('textbox');
    expect(textarea).toHaveAttribute('disabled', '');
    expect(textarea).toHaveAttribute('readonly', '');
    expect(textarea).toHaveAttribute('required', '');
  });

  it('should set size and variation data attributes', async () => {
    render(<TextArea size="small" variation="quiet" />);

    const textarea = await screen.findByRole('textbox');
    expect(textarea).toHaveAttribute('data-size', 'small');
    expect(textarea).toHaveAttribute('data-variation', 'quiet');
  });

  it('can set defaultValue (uncontrolled)', async () => {
    render(<TextArea defaultValue="test" />);

    const textarea = (await screen.findByRole(
      'textbox'
    )) as HTMLTextAreaElement;
    expect(textarea).toHaveValue('test');
  });

  it('can set value (controlled component)', async () => {
    // onChange added to silence console error
    render(<TextArea value="test" onChange={() => {}} />);

    const textarea = (await screen.findByRole(
      'textbox'
    )) as HTMLTextAreaElement;
    expect(textarea).toHaveValue('test');
  });

  it('show add aria-invalid attribute to textarea when hasError', async () => {
    render(<TextArea id="testField" hasError={true} />);
    const textarea = (await screen.findByRole(
      'textbox'
    )) as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should fire event handlers', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onPaste = jest.fn();
    render(
      <TextArea onChange={onChange} onInput={onInput} onPaste={onPaste} />
    );
    const textarea = (await screen.findByRole(
      'textbox'
    )) as HTMLTextAreaElement;
    userEvent.type(textarea, 'hello');
    userEvent.paste(textarea, 'there');
    expect(onChange).toHaveBeenCalled();
    expect(onInput).toHaveBeenCalled();
    expect(onPaste).toHaveBeenCalled();
  });
});
