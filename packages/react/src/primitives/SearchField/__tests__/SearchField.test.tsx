import * as React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassName } from '@aws-amplify/ui';

import { SearchField } from '../SearchField';
import { ComponentText } from '../../shared/constants';

const label = 'Search Amplify UI';
const { searchButtonLabel } = ComponentText.SearchField;
const { clearButtonLabel } = ComponentText.Fields;

const testId = 'SearchFieldTestId';
const searchQuery = 'Amplify UI components';

describe('SearchField component', () => {
  const ControlledSearchField = ({ isDisabled = false }) => {
    const [value, setValue] = React.useState('');
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(event.target.value);
    };
    const onClear = () => {
      setValue('');
    };
    return (
      <SearchField
        label={label}
        name="q"
        onChange={onChange}
        onClear={onClear}
        value={value}
        isDisabled={isDisabled}
      />
    );
  };

  it('should render classname for SearchField', async () => {
    render(
      <SearchField
        testId={testId}
        label={label}
        name="q"
        className="custom-class"
      />
    );

    const searchFieldWrapper = await screen.findByTestId(testId);

    expect(searchFieldWrapper).toHaveClass('custom-class');
    expect(searchFieldWrapper).toHaveClass(ComponentClassName.SearchField);
  });

  it('should forward refs to DOM elements', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const searchButtonRef = React.createRef<HTMLButtonElement>();

    render(
      <SearchField
        className="custom-class"
        label={label}
        name="q"
        ref={ref}
        searchButtonRef={searchButtonRef}
        testId={testId}
      />
    );

    await screen.findByRole('button');

    expect(ref?.current?.nodeName).toBe('INPUT');
    expect(searchButtonRef?.current?.nodeName).toBe('BUTTON');
  });

  it('should be text input type', () => {
    render(<SearchField label={label} name="q" />);

    const searchField = screen.getByLabelText(label);
    expect(searchField.getAttribute('type')).toBe('text');
  });

  it('should be able to set a size', () => {
    render(<SearchField label={label} name="q" size="large" />);

    const searchField = screen.getByLabelText(label);
    expect(searchField).toHaveClass(`${ComponentClassName.Input}--large`);
  });

  it('should render size classes for SearchField', async () => {
    render(
      <div>
        <SearchField label={label} size="small" testId="small" />
        <SearchField label={label} size="large" testId="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassName['Field']}--small`);
    expect(large.classList).toContain(`${ComponentClassName['Field']}--large`);
  });

  it('should be able to set a quiet variation', () => {
    render(<SearchField label={label} name="q" variation="quiet" />);

    const searchField = screen.getByLabelText(label);
    expect(searchField).toHaveClass(`${ComponentClassName.Input}--quiet`);
  });

  it('should have search button', async () => {
    render(<SearchField label={label} name="q" />);

    const button = await screen.findByRole('button');
    expect(button).toBeDefined();
    expect(button).toHaveAttribute('aria-label', searchButtonLabel);
    expect(button).toHaveClass(ComponentClassName.SearchFieldSearch);
  });

  it('should pass query text to onSubmit handler on Enter', async () => {
    const onSubmit = jest.fn();
    render(<SearchField label={label} name="q" onSubmit={onSubmit} />);

    const searchField = await screen.findByLabelText(label);
    await act(async () => {
      await userEvent.type(searchField, searchQuery);
    });

    fireEvent.keyDown(searchField, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(searchQuery);
  });

  it('should clear text for uncontrolled component when user types Esc', async () => {
    render(<SearchField label={label} name="q" />);

    const searchField = await screen.findByLabelText(label);

    await act(async () => {
      await userEvent.type(searchField, searchQuery);
    });
    expect(searchField).toHaveValue(searchQuery);

    fireEvent.keyDown(searchField, { key: 'Esc', code: 'Esc' });
    expect(searchField).toHaveValue('');
  });

  it('should clear text for controlled component when user types Esc', async () => {
    render(<ControlledSearchField />);

    const searchField = await screen.findByLabelText(label);

    await act(async () => {
      await userEvent.type(searchField, searchQuery);
    });
    expect(searchField).toHaveValue(searchQuery);

    fireEvent.keyDown(searchField, { key: 'Esc', code: 'Esc' });
    expect(searchField).toHaveValue('');
  });

  describe('- search button', () => {
    it('should call onSubmit handler when clicked', async () => {
      const onSubmit = jest.fn();
      render(<SearchField label={label} name="q" onSubmit={onSubmit} />);

      const button = await screen.findByRole('button');
      const searchField = await screen.findByLabelText(label);
      await act(async () => {
        await userEvent.type(searchField, searchQuery);
      });
      await act(async () => {
        await userEvent.click(button);
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(searchQuery);
    });
  });

  describe('- clear button', () => {
    it('should have clear button only after text is entered', async () => {
      render(<SearchField label={label} name="q" />);

      let clearButton = screen.queryByLabelText(clearButtonLabel);
      const searchField = await screen.findByLabelText(label);

      expect(clearButton).toBeNull();

      await act(async () => {
        await userEvent.type(searchField, searchQuery);
      });
      clearButton = await screen.findByLabelText(clearButtonLabel);

      expect(clearButton).toBeDefined();
    });

    it('should clear text and refocus uncontrolled input when clicked', async () => {
      render(<SearchField label={label} name="q" />);

      const searchField = await screen.findByLabelText(label);
      await act(async () => {
        await userEvent.type(searchField, searchQuery);
      });

      const clearButton = await screen.findByLabelText(clearButtonLabel);

      expect(searchField).toHaveValue(searchQuery);
      await act(async () => {
        await userEvent.click(clearButton);
      });
      expect(searchField).toHaveValue('');
      expect(searchField).toHaveFocus();
    });

    it('should be focusable via keyboard', async () => {
      const user = userEvent.setup();
      render(<SearchField label={label} name="q" />);

      const searchField = await screen.findByLabelText(label);

      await act(async () => user.type(searchField, searchQuery));

      const clearButton = await screen.findByLabelText(clearButtonLabel);
      expect(clearButton).not.toHaveFocus();

      await user.tab();
      await waitFor(() => {
        expect(clearButton).toHaveFocus();
      });
    });

    it('should clear text and refocus controlled input when clicked', async () => {
      render(<ControlledSearchField />);

      const searchField = await screen.findByLabelText(label);
      await act(async () => {
        await userEvent.type(searchField, searchQuery);
      });

      const clearButton = await screen.findByLabelText(clearButtonLabel);

      expect(searchField).toHaveValue(searchQuery);
      await act(async () => {
        await userEvent.click(clearButton);
      });
      expect(searchField).toHaveValue('');
      expect(searchField).toHaveFocus();
    });

    it('should be able to customize clear button text', async () => {
      const clearButtonLabel = 'Reset search';
      render(
        <SearchField
          label={label}
          clearButtonLabel={clearButtonLabel}
          name="q"
        />
      );

      const searchField = await screen.findByLabelText(label);
      await act(async () => {
        await userEvent.type(searchField, searchQuery);
      });

      const clearButton = await screen.findByLabelText(clearButtonLabel);
      expect(clearButton).toHaveAttribute('aria-label', clearButtonLabel);
    });

    it('should remove clear button when input is disabled', async () => {
      render(<ControlledSearchField isDisabled />);

      const clearButton = screen.queryByLabelText(clearButtonLabel);

      expect(clearButton).toBeNull();
    });
  });
});
