import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchField } from '../SearchField';
import { ComponentClassNames, SharedText } from '../../shared';

const label = 'Search Amplify UI';
const searchButtonLabel = SharedText.SearchField.ariaLabel.search;
const clearButtonLabel = SharedText.Fields.ariaLabel.clearField;

const testId = 'SearchFieldTestId';
const searchQuery = 'Amplify UI components';

describe('SearchField component', () => {
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
    expect(searchFieldWrapper).toHaveClass(ComponentClassNames.SearchField);
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

    expect(ref.current.nodeName).toBe('INPUT');
    expect(searchButtonRef.current.nodeName).toBe('BUTTON');
  });

  it('should be text input type', async () => {
    render(<SearchField label={label} name="q" />);

    const searchField = await screen.getByLabelText(label);
    expect(searchField.getAttribute('type')).toBe('text');
  });

  it('should be able to set a size', async () => {
    render(<SearchField label={label} name="q" size="large" />);

    const searchField = await screen.getByLabelText(label);
    expect(searchField.dataset['size']).toBe('large');
  });

  it('should be able to set a quiet variation', async () => {
    render(<SearchField label={label} name="q" variation="quiet" />);

    const searchField = await screen.getByLabelText(label);
    expect(searchField).toHaveAttribute('data-variation', 'quiet');
  });

  it('should have search button', async () => {
    render(<SearchField label={label} name="q" />);

    const button = await screen.findByRole('button');
    expect(button).toBeDefined();
    expect(button).toHaveAttribute('aria-label', searchButtonLabel);
    expect(button).toHaveClass(ComponentClassNames.SearchFieldSearch);
  });

  it('should have clear button only after text is entered', async () => {
    render(<SearchField label={label} name="q" />);

    let clearButton = await screen.queryByLabelText(clearButtonLabel);
    const searchField = await screen.findByLabelText(label);

    expect(clearButton).toBeNull();

    userEvent.type(searchField, searchQuery);
    clearButton = await screen.findByLabelText(clearButtonLabel);

    expect(clearButton).toBeDefined();
  });

  it('should pass query text to onSubmit handler on Enter', async () => {
    const onSubmit = jest.fn();
    render(<SearchField label={label} name="q" onSubmit={onSubmit} />);

    const searchField = await screen.findByLabelText(label);
    userEvent.type(searchField, searchQuery);

    fireEvent.keyDown(searchField, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(searchQuery);
  });

  it('should clear text when user types Esc', async () => {
    render(<SearchField label={label} name="q" />);

    const searchField = (await screen.findByLabelText(
      label
    )) as HTMLInputElement;

    userEvent.type(searchField, searchQuery);
    expect(searchField).toHaveValue(searchQuery);

    fireEvent.keyDown(searchField, { key: 'Esc', code: 'Esc' });
    expect(searchField).toHaveValue('');
  });

  describe(' - search button', () => {
    it('should call onSubmit handler when clicked', async () => {
      const onSubmit = jest.fn();
      render(<SearchField label={label} name="q" onSubmit={onSubmit} />);

      const button = await screen.findByRole('button');
      const searchField = await screen.findByLabelText(label);
      userEvent.type(searchField, searchQuery);
      userEvent.click(button);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(searchQuery);
    });
  });

  describe(' - clear button', () => {
    it('should clear text when clicked', async () => {
      render(<SearchField label={label} name="q" />);

      const searchField = (await screen.findByLabelText(
        label
      )) as HTMLInputElement;
      userEvent.type(searchField, searchQuery);

      const clearButton = await screen.findByLabelText(clearButtonLabel);

      expect(searchField).toHaveValue(searchQuery);
      userEvent.click(clearButton);
      expect(searchField).toHaveValue('');
    });
  });
});
