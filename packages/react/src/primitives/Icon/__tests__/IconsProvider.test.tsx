import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { IconsProvider } from '../context';
import { Alert } from '../../Alert';
import { View } from '../../View';
import { Accordion } from '../../Accordion';
import { Checkbox } from '../../Checkbox';
import { Menu } from '../../Menu';
import { FieldClearButton } from '../../Field';
import { Pagination } from '../../Pagination';
import { PasswordField } from '../../PasswordField';
import { SearchField } from '../../SearchField';
import { Select } from '../../Select';
import { Rating } from '../../Rating';
import { StepperField } from '../../StepperField';

describe('IconsProvider', () => {
  it('should render children', () => {
    render(
      <IconsProvider>
        <div>test</div>
      </IconsProvider>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render icons in Alert', () => {
    render(
      <IconsProvider
        icons={{
          alert: {
            success: <View testId="success" />,
            error: <View testId="error" />,
            info: <View testId="info" />,
            warning: <View testId="warning" />,
          },
        }}
      >
        <Alert variation="success" />
        <Alert variation="error" />
        <Alert variation="info" />
        <Alert variation="warning" />
      </IconsProvider>
    );

    expect(screen.getByTestId('success')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('warning')).toBeInTheDocument();
  });

  it('should render icons in Expander', () => {
    render(
      <IconsProvider
        icons={{
          accordion: {
            more: <View testId="more" />,
          },
        }}
      >
        <Accordion.Container>
          <Accordion.Item value="1">
            <Accordion.Trigger>
              Trigger
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Container>
      </IconsProvider>
    );
    expect(screen.getByTestId('more')).toBeInTheDocument();
  });

  it('should render icons in the checkbox', () => {
    render(
      <IconsProvider
        icons={{
          checkbox: {
            checked: <View testId="checked" />,
            indeterminate: <View testId="indeterminate" />,
          },
        }}
      >
        <Checkbox label="test" value="test" name="test" checked />
        <Checkbox label="test2" value="test2" name="test2" isIndeterminate />
      </IconsProvider>
    );
    expect(screen.getByTestId('checked')).toBeInTheDocument();
    expect(screen.getByTestId('indeterminate')).toBeInTheDocument();
  });

  it('should render icons in the Menu', () => {
    render(
      <IconsProvider
        icons={{
          menu: {
            menu: <View testId="menu" />,
          },
        }}
      >
        <Menu></Menu>
      </IconsProvider>
    );
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('should render icons in the Field', () => {
    render(
      <IconsProvider
        icons={{
          field: {
            clear: <View testId="clear" />,
          },
        }}
      >
        <FieldClearButton />
      </IconsProvider>
    );
    expect(screen.getByTestId('clear')).toBeInTheDocument();
  });

  it('should render icons in the Pagination', () => {
    render(
      <IconsProvider
        icons={{
          pagination: {
            next: <View testId="next" />,
            previous: <View testId="previous" />,
          },
        }}
      >
        <Pagination currentPage={1} totalPages={10} siblingCount={1} />
      </IconsProvider>
    );
    expect(screen.getByTestId('next')).toBeInTheDocument();
    expect(screen.getByTestId('previous')).toBeInTheDocument();
  });

  it('should render icons in the PasswordField', () => {
    render(
      <IconsProvider
        icons={{
          passwordField: {
            visibility: <View testId="visibility" />,
          },
        }}
      >
        <PasswordField label="Password" />
      </IconsProvider>
    );
    expect(screen.getByTestId('visibility')).toBeInTheDocument();
  });

  it('should render icons in Rating', () => {
    render(
      <IconsProvider
        icons={{
          rating: {
            filled: <View testId="filled" />,
            empty: <View testId="empty" />,
          },
        }}
      >
        <Rating value={3.5} />
      </IconsProvider>
    );
    expect(screen.getAllByTestId('filled')).toHaveLength(4);
    expect(screen.getAllByTestId('empty')).toHaveLength(2);
  });

  it('should render icons in the SearchField', () => {
    render(
      <IconsProvider
        icons={{
          searchField: {
            search: <View testId="search" />,
          },
        }}
      >
        <SearchField label="Search" />
      </IconsProvider>
    );
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('should render icons in the SelectField', () => {
    render(
      <IconsProvider
        icons={{
          select: {
            expand: <View testId="expand" />,
          },
        }}
      >
        <Select />
      </IconsProvider>
    );
    expect(screen.getByTestId('expand')).toBeInTheDocument();
  });

  it('should render icons in the StepperField', () => {
    render(
      <IconsProvider
        icons={{
          stepperField: {
            add: <View testId="add" />,
            remove: <View testId="remove" />,
          },
        }}
      >
        <StepperField label="label" />
      </IconsProvider>
    );
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('remove')).toBeInTheDocument();
  });
});
