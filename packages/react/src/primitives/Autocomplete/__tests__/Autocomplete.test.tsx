import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';

import { Autocomplete } from '../Autocomplete';
import { ComponentText } from '../../shared/constants';
import { classNameModifier } from '../../shared/utils';
import type {
  AutocompleteProps,
  ComboBoxOption,
} from '../../types/autocomplete';

describe('Autocomplete:', () => {
  const label = 'Autocomplete';
  const testId = 'autocomplete-test-id';
  const options = [
    { id: 'apple', label: 'apple' },
    { id: 'banana', label: 'banana' },
    { id: 'cherry', label: 'cherry' },
  ];

  const ControlledAutocomplete = ({ onSubmit }: Partial<AutocompleteProps>) => {
    const [value, setValue] = React.useState('');

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(event.target.value);
    };

    // It is your responsibility to set up onSelect
    const onSelect = (option: ComboBoxOption) => {
      const { label } = option;
      setValue(label);
    };

    // It is your responsibility to set up onClear
    const onClear = () => {
      setValue('');
    };

    return (
      <Autocomplete
        label="Controlled autocomplete"
        options={options}
        value={value}
        onChange={onChange}
        onClear={onClear}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
    );
  };

  const expectWorkflow = async (onSubmit: jest.Mock) => {
    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.type(textInput, 'Hello world!');
    });
    // No options found
    const noOption = screen.queryByText(ComponentText.Autocomplete.emptyText);
    expect(noOption).toBeInTheDocument();
    expect(textInput).toHaveValue('Hello world!');

    // Close menu on ESC if menu is open
    await act(async () => {
      await userEvent.keyboard('{Esc}');
    });
    expect(textInput).toHaveValue('Hello world!');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Clear text on ESC if menu is closed
    expect(textInput).toHaveFocus();
    await act(async () => {
      await userEvent.keyboard('{Esc}');
    });
    expect(textInput).toHaveValue('');

    // Focus will not open menu
    await act(async () => {
      await userEvent.click(document.body);
    });
    expect(textInput).not.toHaveFocus();
    textInput.focus();
    expect(textInput).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Click will open menu
    expect(textInput).toHaveFocus();
    await act(async () => {
      await userEvent.click(textInput);
    });
    expect(screen.queryByRole('listbox')).toBeInTheDocument();

    // Close menu when lose focus
    await act(async () => {
      await userEvent.click(document.body);
    });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Type random text and submit
    await act(async () => {
      await userEvent.type(textInput, 'Hello world!');
    });
    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('Hello world!');
    expect(textInput).toHaveFocus();
    // menu closed
    expect(noOption).not.toBeInTheDocument();

    /**
     * Mouse testing section
     */
    await act(async () => {
      await userEvent.clear(textInput);
    });
    // Select via mouse and submit
    const listbox = await screen.findByRole('listbox');
    const appleOption = screen.getByText('apple')
      .parentElement as HTMLLIElement;
    await act(async () => {
      await userEvent.selectOptions(listbox, appleOption);
    });
    expect(textInput).toHaveFocus();
    expect(textInput).toHaveValue('apple');

    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(onSubmit).toHaveBeenCalledWith('apple');
    expect(textInput).toHaveFocus();
    // menu closed
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    /**
     * Keyboard testing section
     */
    await act(async () => {
      await userEvent.clear(textInput);
    });
    // menu open
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
    // Select via keyboard and submit
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    expect(textInput).toHaveFocus();
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    expect(textInput).toHaveFocus();
    await act(async () => {
      await userEvent.keyboard('{ArrowUp}');
    });
    expect(textInput).toHaveFocus();
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    expect(textInput).toHaveFocus();

    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(textInput).toHaveFocus();
    expect(textInput).toHaveValue('banana');

    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onSubmit).toHaveBeenCalledTimes(3);
    expect(onSubmit).toHaveBeenCalledWith('banana');
    expect(textInput).toHaveFocus();
    // menu closed
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  };

  it('should render classname', async () => {
    render(<Autocomplete label={label} options={options} testId={testId} />);

    const autocomplete = await screen.findByTestId(testId);
    expect(autocomplete).toHaveClass(ComponentClassName.Autocomplete);
  });

  it('should work in uncontrolled way', async () => {
    const onSubmit = jest.fn();
    render(
      <Autocomplete label={label} options={options} onSubmit={onSubmit} />
    );
    await expectWorkflow(onSubmit);
  });

  it('should work in controlled way', async () => {
    const onSubmit = jest.fn();
    render(<ControlledAutocomplete onSubmit={onSubmit} />);
    await expectWorkflow(onSubmit);
  });

  it('should forward refs to DOM elements', async () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Autocomplete label={label} options={options} ref={ref} />);

    await screen.findByRole('combobox');
    expect(ref?.current?.nodeName).toBe('INPUT');
  });

  it('should be able to set a placeholder', async () => {
    const placeholder = 'This is a placeholder';
    render(
      <Autocomplete label={label} options={options} placeholder={placeholder} />
    );

    const textInput = await screen.findByRole('combobox');
    expect(textInput).toHaveAttribute('placeholder', placeholder);
  });

  it('should be able to set a size', async () => {
    render(<Autocomplete label={label} options={options} size="large" />);

    const textInput = await screen.findByRole('combobox');
    expect(textInput).toHaveClass('amplify-input--large');
  });

  it('should render size classes for Autocomplete', async () => {
    render(
      <div>
        <Autocomplete
          label={label}
          options={options}
          size="small"
          testId="small"
        />
        <Autocomplete
          label={label}
          options={options}
          size="large"
          testId="large"
        />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.firstChild).toHaveClass(
      `${ComponentClassName['Field']}--small`
    );
    expect(large.firstChild).toHaveClass(
      `${ComponentClassName['Field']}--large`
    );
  });

  it('should be able to set a quiet variation', async () => {
    render(<Autocomplete label={label} options={options} variation="quiet" />);

    const textInput = await screen.findByRole('combobox');
    expect(textInput).toHaveClass('amplify-input--quiet');
  });

  it('should be in loading state when isLoading is set to true', async () => {
    render(<Autocomplete label={label} options={options} isLoading />);

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.click(textInput);
    });
    const listbox = screen.queryByRole('listbox');
    expect(listbox).not.toBeInTheDocument();
    const loading = screen.getByText(ComponentText.Autocomplete.loadingText);
    expect(loading).toHaveClass(ComponentClassName.AutocompleteMenuLoading);
  });

  it('should render classname on active option correctly', async () => {
    render(<Autocomplete label={label} options={options} />);

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.click(textInput);
    });

    const appleOption = screen.getByText('apple')
      .parentElement as HTMLLIElement;
    const bananaOption = screen.getByText('banana')
      .parentElement as HTMLLIElement;
    const cherryOption = screen.getByText('cherry')
      .parentElement as HTMLLIElement;

    expect(appleOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(bananaOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(cherryOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );

    await act(async () => {
      await userEvent.hover(bananaOption);
    });
    expect(appleOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(bananaOption).toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(cherryOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );

    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    expect(textInput).toHaveFocus();
    expect(appleOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(bananaOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(cherryOption).toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );

    await act(async () => {
      await userEvent.keyboard('{ArrowUp}');
    });
    await act(async () => {
      await userEvent.keyboard('{ArrowUp}');
    });
    expect(textInput).toHaveFocus();
    expect(appleOption).toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(bananaOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
    expect(cherryOption).not.toHaveClass(
      classNameModifier(ComponentClassName.AutocompleteMenuOption, 'active')
    );
  });

  it('should be case insensitive filtering', async () => {
    render(<Autocomplete label={label} options={options} />);

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.type(textInput, 'ap');
    });
    let optionElements = await screen.findAllByRole('option');
    expect(optionElements).toHaveLength(1);
    expect(optionElements[0]).toHaveTextContent('apple');
    await act(async () => {
      await userEvent.clear(textInput);
    });
    await act(async () => {
      await userEvent.type(textInput, 'AP');
    });

    optionElements = await screen.findAllByRole('option');
    expect(optionElements).toHaveLength(1);
    expect(optionElements[0]).toHaveTextContent('apple');
  });

  it('should be able to apply custom filtering', async () => {
    const optionFilter = jest.fn();
    render(
      <Autocomplete
        label={label}
        options={options}
        optionFilter={optionFilter}
      />
    );

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.type(textInput, 'test');
    });
    expect(optionFilter).toHaveBeenCalled();
  });

  it('should be able to customize option', async () => {
    const renderOption = jest.fn();
    render(
      <Autocomplete
        label={label}
        options={options}
        renderOption={renderOption}
      />
    );

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.click(textInput);
    });
    expect(renderOption).toHaveBeenCalled();
  });

  it('should be able to customize loading', async () => {
    const LoadingIndicator = 'This is a custom loading';
    render(
      <Autocomplete
        label={label}
        options={options}
        menuSlots={{ LoadingIndicator }}
        isLoading
      />
    );

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.click(textInput);
    });

    const loading = screen.getByText(LoadingIndicator);
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveClass(ComponentClassName.AutocompleteMenuLoading);
  });

  it('should be able to customize empty menu', async () => {
    const Empty = 'This is a custom empty';
    render(<Autocomplete label={label} options={[]} menuSlots={{ Empty }} />);

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.click(textInput);
    });

    const empty = screen.getByText(Empty);
    expect(empty).toBeInTheDocument();
    expect(empty).toHaveClass(ComponentClassName.AutocompleteMenuEmpty);
  });

  it('should be able to customize header and footer', async () => {
    const Header = 'This is a custom header';
    const Footer = 'This is a custom footer';
    render(
      <Autocomplete
        label={label}
        options={options}
        menuSlots={{ Footer, Header }}
      />
    );

    const textInput = await screen.findByRole('combobox');
    await act(async () => {
      await userEvent.click(textInput);
    });

    const header = screen.getByText(Header);
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(ComponentClassName.AutocompleteMenuHeader);

    const footer = screen.getByText(Footer);
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(ComponentClassName.AutocompleteMenuFooter);
  });

  it('should set accessible props correctly', async () => {
    render(<Autocomplete label={label} options={options} />);

    const textInput = await screen.findByRole('combobox');
    expect(textInput).toHaveAttribute('aria-autocomplete', 'list');
    expect(textInput).toHaveAttribute('aria-haspopup', 'listbox');
    expect(textInput).toHaveAttribute('aria-expanded', 'false');

    await act(async () => {
      await userEvent.click(textInput);
    });
    const menu = screen.getByRole('listbox').parentElement;
    expect(textInput).toHaveAttribute('aria-expanded', 'true');
    expect(textInput).toHaveAttribute('aria-controls', menu?.id);
    expect(textInput).toHaveAttribute('aria-owns', menu?.id);
    expect(textInput).not.toHaveAttribute('aria-activedescendant');

    const appleOption = screen.getByText('apple')
      .parentElement as HTMLLIElement;
    const bananaOption = screen.getByText('banana')
      .parentElement as HTMLLIElement;
    const cherryOption = screen.getByText('cherry')
      .parentElement as HTMLLIElement;
    expect(appleOption).toHaveAttribute('role', 'option');
    expect(appleOption).toHaveAttribute('aria-selected', 'false');
    expect(bananaOption).toHaveAttribute('aria-selected', 'false');
    expect(cherryOption).toHaveAttribute('aria-selected', 'false');
    await act(async () => {
      await userEvent.hover(appleOption);
    });
    expect(appleOption).toHaveAttribute('aria-selected', 'true');
    expect(bananaOption).toHaveAttribute('aria-selected', 'false');
    expect(cherryOption).toHaveAttribute('aria-selected', 'false');
    expect(textInput).toHaveAttribute('aria-activedescendant', appleOption.id);

    await act(async () => {
      await userEvent.hover(bananaOption);
    });
    expect(appleOption).toHaveAttribute('aria-selected', 'false');
    expect(bananaOption).toHaveAttribute('aria-selected', 'true');
    expect(cherryOption).toHaveAttribute('aria-selected', 'false');
    expect(textInput).toHaveAttribute('aria-activedescendant', bananaOption.id);

    await act(async () => {
      await userEvent.hover(cherryOption);
    });
    expect(appleOption).toHaveAttribute('aria-selected', 'false');
    expect(bananaOption).toHaveAttribute('aria-selected', 'false');
    expect(cherryOption).toHaveAttribute('aria-selected', 'true');
    expect(textInput).toHaveAttribute('aria-activedescendant', cherryOption.id);

    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    expect(appleOption).toHaveAttribute('aria-selected', 'true');
    expect(bananaOption).toHaveAttribute('aria-selected', 'false');
    expect(cherryOption).toHaveAttribute('aria-selected', 'false');
    expect(textInput).toHaveAttribute('aria-activedescendant', appleOption.id);

    await act(async () => {
      await userEvent.keyboard('{ArrowUp}');
    });
    expect(appleOption).toHaveAttribute('aria-selected', 'false');
    expect(bananaOption).toHaveAttribute('aria-selected', 'false');
    expect(cherryOption).toHaveAttribute('aria-selected', 'true');
    expect(textInput).toHaveAttribute('aria-activedescendant', cherryOption.id);
  });
});
