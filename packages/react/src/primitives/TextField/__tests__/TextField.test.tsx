import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassNames } from '../../shared';
import { TextField } from '../TextField';
import {
  testFlexProps,
  expectFlexStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('TextField component', () => {
  describe('wrapper Flex', () => {
    it('should render default and custom classname ', async () => {
      render(
        <TextField
          label="Field"
          id="testField"
          testId="testId"
          className="my-textfield"
        />
      );

      const field = await screen.findByTestId('testId');
      expect(field).toHaveClass('my-textfield');
      expect(field).toHaveClass(ComponentClassNames.Field);
    });

    it('should render all flex style props', async () => {
      render(<TextField testId="testId" label="field" {...testFlexProps} />);
      const field = await screen.findByTestId('testId');
      expectFlexStyleProps(field);
    });
  });

  describe('Label ', () => {
    it('should render expected field classname', async () => {
      render(<TextField label="Field" />);

      const label = (await screen.findByText('Field')) as HTMLLabelElement;
      expect(label).toHaveClass(ComponentClassNames.Label);
    });

    it('should have `sr-only` class when labelHidden is true', async () => {
      render(<TextField label="Search" labelHidden={true} />);

      const label = await screen.findByText('Search');
      expect(label).toHaveClass('sr-only');
    });
  });

  describe('Input field', () => {
    it('should render expected classname, id and aria-labelledby for TextField input field', async () => {
      render(
        <TextField
          label="Field"
          id="testField"
          testId="testId"
          className="my-textfield"
          defaultValue="Hello there"
        />
      );

      const field = await screen.findByRole('textbox');
      expect(field).toHaveClass(ComponentClassNames.Input);
      expect(field.id).toBe('testField');
      expect(field).toHaveAttribute('aria-labelledby', 'testField');
    });

    it('should render the state attributes', async () => {
      render(
        <TextField
          label="Field"
          size="small"
          defaultValue=""
          hasError
          isDisabled
          isReadOnly
          isRequired
        />
      );

      const field = await screen.findByRole('textbox');
      expect(field).toHaveAttribute('disabled');
      expect(field).toHaveAttribute('readonly');
      expect(field).toHaveAttribute('required');
    });

    it('should set size and variation data attributes', async () => {
      render(
        <TextField
          label="Field"
          size="small"
          testId="testField"
          variation="quiet"
        />
      );

      const textField = await screen.findByTestId('testField');
      const input = await screen.findByRole('textbox');
      expect(textField).toHaveAttribute('data-size', 'small');
      expect(input).toHaveAttribute('data-variation', 'quiet');
    });

    it('can set defaultValue', async () => {
      render(<TextField label="Field" defaultValue="test" />);

      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      expect(field.value).toBe('test');
    });

    it('show add aria-invalid attribute to input when hasError', async () => {
      render(
        <TextField
          label="Field"
          id="testField"
          hasError={true}
          errorMessage={'Error message'}
        />
      );
      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      expect(field).toHaveAttribute('aria-invalid');
    });

    it('should fire event handlers', async () => {
      const onChange = jest.fn();
      const onInput = jest.fn();
      const onPaste = jest.fn();
      render(
        <TextField
          label="Field"
          onChange={onChange}
          onInput={onInput}
          onPaste={onPaste}
        />
      );
      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      userEvent.type(field, 'hello');
      userEvent.paste(field, 'there');
      expect(onChange).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalled();
      expect(onPaste).toHaveBeenCalled();
    });
  });

  describe('error messages', () => {
    const errorMessage = 'This is an error message';
    it("don't show when hasError is false", async () => {
      render(
        <TextField label="Field" id="testField" errorMessage={errorMessage} />
      );

      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('show when hasError and errorMessage', async () => {
      render(
        <TextField
          label="Field"
          id="testField"
          hasError={true}
          errorMessage={errorMessage}
        />
      );
      const errorText = await screen.queryByText(errorMessage);
      expect(errorText.innerHTML).toContain(errorMessage);
    });
  });

  describe('descriptive message', () => {
    it('renders when descriptiveText is provided', async () => {
      render(
        <TextField label="Field" id="testField" descriptiveText="Description" />
      );

      const descriptiveText = await screen.queryByText('Description');
      expect(descriptiveText.innerHTML).toContain('Description');
    });
  });
});
