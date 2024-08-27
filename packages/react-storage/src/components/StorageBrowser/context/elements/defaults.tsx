import React from 'react';
import {
  Button as _Button,
  Flex,
  Heading as _Heading,
  Input as _Input,
  Label as _Label,
  Message as _Message,
  Table as _Table,
  TableBody as _TableBody,
  TableCell as _TableCell,
  TableHead as _TableHead,
  TableRow as _TableRow,
  Text as _Text,
  View as _View,
  ViewProps,
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableCellProps,
  TableRowProps,
} from '@aws-amplify/ui-react';
import {
  ButtonElementProps,
  LabelElementProps,
  TextElementProps,
} from './definitions';

const Button = React.forwardRef<HTMLButtonElement, ButtonElementProps>(
  function Button(props, ref) {
    const { disabled, variant } = props;
    switch (variant) {
      case 'actions-menu-item':
        return (
          <_Button
            {...props}
            variation="link"
            size="small"
            borderRadius="0"
            justifyContent="flex-start"
            ref={ref}
          />
        );
      case 'cancel':
        return (
          <_Button
            {...props}
            size="small"
            variation="link"
            colorTheme="error"
            ref={ref}
          />
        );
      case 'primary':
        return (
          <_Button
            {...props}
            isDisabled={disabled}
            size="small"
            variation="primary"
            ref={ref}
          />
        );
      case 'exit':
        return (
          <_Button
            {...props}
            size="small"
            paddingInline="xs"
            variation="link"
            ref={ref}
          />
        );
      case 'message-dismiss':
        return (
          <_Button
            {...props}
            size="small"
            variation="link"
            colorTheme="overlay"
            ref={ref}
          />
        );
      case 'navigate':
      case 'paginate-current':
      case 'paginate-next':
      case 'paginate-previous':
        return (
          <_Button
            {...props}
            size="small"
            paddingInline="xs"
            variation="link"
            ref={ref}
          />
        );
      case 'actions-menu-toggle':
      case 'download':
      case 'refresh':
      case 'sort':
        return <_Button {...props} size="small" variation="link" ref={ref} />;
      case 'table-data':
        return (
          <_Button
            {...props}
            variation="link"
            size="small"
            textDecoration="underline"
            ref={ref}
          />
        );
      default:
        return <_Button {...props} size="small" ref={ref} />;
    }
  }
);

const DefinitionTerm = React.forwardRef<HTMLElement>(
  function DefinitionTerm(props, ref) {
    return <_View {...props} as="dt" fontWeight="bold" ref={ref} />;
  }
);

const Label = React.forwardRef<HTMLLabelElement, LabelElementProps>(
  function Label(props, ref) {
    const { children } = props;
    return (
      <_Label {...props} ref={ref}>
        {children}
      </_Label>
    );
  }
);

const Input = React.forwardRef<HTMLInputElement>(function Input(props, ref) {
  return <_Input {...props} ref={ref} />;
});

const Title = React.forwardRef<HTMLHeadingElement>(
  function Heading(props, ref) {
    return (
      <_Heading
        {...props}
        level={2}
        fontSize="large"
        fontWeight="bold"
        alignSelf="center"
        ref={ref}
      />
    );
  }
);

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  function Table(props, ref) {
    return (
      <_Table
        {...props}
        size="small"
        lineHeight="small"
        variation="striped"
        ref={ref}
      />
    );
  }
);

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function Table(props, ref) {
    return <_TableBody {...props} ref={ref} />;
  }
);

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead(props, ref) {
    return <_TableHead {...props} ref={ref} />;
  }
);

const TableData = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableData(props, ref) {
    return <_TableCell padding="xxxs" {...props} ref={ref} />;
  }
);

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    return <_TableRow {...props} ref={ref} />;
  }
);

const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHeader(props, ref) {
    return <_TableCell padding="xxxs" as="th" {...props} ref={ref} />;
  }
);

const Text = React.forwardRef<HTMLParagraphElement, TextElementProps>(
  function Text(props, ref) {
    const { variant } = props;
    switch (variant) {
      case 'field-error':
        return <_Text {...props} color="font.error" margin="0" ref={ref} />;
      default:
        return <_Text {...props} ref={ref} />;
    }
  }
);

const View = React.forwardRef<HTMLDivElement, ViewProps & { variant?: string }>(
  function View({ variant, ...props }, ref) {
    switch (variant) {
      case 'actions-menu-list':
        return (
          <_View
            {...props}
            marginTop="2px"
            borderRadius="medium"
            boxShadow="0 1px 3px hsla(210, 50%, 10%, 0.25)"
            backgroundColor="background.primary"
            padding="small"
            ref={ref}
          />
        );
      case 'info':
      case 'warning':
      case 'success':
      case 'error':
        return (
          <_Message {...props} hasIcon={false} colorTheme={variant} ref={ref}>
            <Flex gap="small" alignItems="center">
              {props.children}
            </Flex>
          </_Message>
        );
      case 'empty-message':
        return (
          <_Message {...props} colorTheme="neutral" ref={ref}>
            <Flex justifyContent="center">{props.children}</Flex>
          </_Message>
        );
      default:
        return <_View {...props} ref={ref} />;
    }
  }
);

const Nav = (props: ViewProps<'nav'>): JSX.Element => (
  <_View {...props} as="nav" />
);

export const elementsDefault = {
  Button,
  DefinitionTerm,
  Input,
  Label,
  Nav,
  Title,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  View,
};
