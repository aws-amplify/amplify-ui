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
} from '@aws-amplify/ui-react';
import {
  ButtonElementProps,
  DescriptionTermElementProps,
  HeadingElementProps,
  InputElementProps,
  LabelElementProps,
  NavElementProps,
  SpanElementProps,
  TableBodyElementProps,
  TableDataCellElementProps,
  TableElementProps,
  TableHeadElementProps,
  TableHeaderElementProps,
  TableRowElementProps,
  TextElementProps,
  ViewElementProps,
} from './definitions';

function Button(props: ButtonElementProps): React.JSX.Element {
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
        />
      );
    case 'cancel':
      return (
        <_Button {...props} size="small" variation="link" colorTheme="error" />
      );
    case 'primary':
      return (
        <_Button
          {...props}
          isDisabled={disabled}
          size="small"
          variation="primary"
        />
      );
    case 'exit':
      return (
        <_Button {...props} size="small" paddingInline="xs" variation="link" />
      );
    case 'message-dismiss':
      return (
        <_Button
          {...props}
          size="small"
          variation="link"
          colorTheme="overlay"
        />
      );
    case 'navigate':
    case 'paginate-current':
    case 'paginate-next':
    case 'paginate-previous':
      return (
        <_Button {...props} size="small" paddingInline="xs" variation="link" />
      );
    case 'actions-menu-toggle':
    case 'download':
    case 'refresh':
    case 'sort':
      return <_Button {...props} size="small" variation="link" />;
    case 'table-data':
      return (
        <_Button
          {...props}
          variation="link"
          size="small"
          textDecoration="underline"
        />
      );
    default:
      return <_Button {...props} size="small" />;
  }
}

function DescriptionTerm(
  props: DescriptionTermElementProps
): React.JSX.Element {
  return <_View {...props} as="dt" fontWeight="bold" />;
}

function Label(props: LabelElementProps): React.JSX.Element {
  const { children } = props;
  return <_Label {...props}>{children}</_Label>;
}

function Input(props: InputElementProps): React.JSX.Element {
  const { type } = props;
  if (type === 'checkbox') {
    return <input {...props} />;
  }
  return <_Input {...props} />;
}

function Heading(props: HeadingElementProps): React.JSX.Element {
  return (
    <_Heading
      {...props}
      level={2}
      fontSize="large"
      fontWeight="bold"
      alignSelf="center"
    />
  );
}

function Span(props: SpanElementProps): React.JSX.Element {
  const { variant } = props;
  if (variant === 'navigate-text') {
    return (
      <_View
        {...props}
        as="span"
        padding="xs"
        color="font.secondary"
        fontSize="small"
      />
    );
  }
  return <_View {...props} as="span" />;
}

function Table(props: TableElementProps): React.JSX.Element {
  return (
    <_Table {...props} size="small" lineHeight="small" variation="striped" />
  );
}

function TableBody(props: TableBodyElementProps): React.JSX.Element {
  return <_TableBody {...props} />;
}

function TableHead(props: TableHeadElementProps): React.JSX.Element {
  return <_TableHead {...props} />;
}

function TableDataCell(props: TableDataCellElementProps): React.JSX.Element {
  return <_TableCell {...props} />;
}

function TableRow(props: TableRowElementProps): React.JSX.Element {
  return <_TableRow {...props} />;
}

function TableHeader(props: TableHeaderElementProps): React.JSX.Element {
  return <_TableCell as="th" {...props} />;
}

function Text(props: TextElementProps): React.JSX.Element {
  const { variant } = props;
  switch (variant) {
    case 'field-error':
      return <_Text {...props} color="font.error" margin="0" />;
    default:
      return <_Text {...props} />;
  }
}

function View({ variant, ...props }: ViewElementProps): React.JSX.Element {
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
        />
      );
    case 'info':
    case 'warning':
    case 'success':
    case 'error':
      return (
        <_Message {...props} hasIcon={false} colorTheme={variant}>
          <Flex gap="small" alignItems="center">
            {props.children}
          </Flex>
        </_Message>
      );
    case 'empty-message':
      return (
        <_Message {...props} colorTheme="neutral">
          <Flex justifyContent="center">{props.children}</Flex>
        </_Message>
      );
    default:
      return <_View {...props} />;
  }
}

const Nav = (props: NavElementProps): JSX.Element => (
  <_View {...props} as="nav" />
);

export const elementsDefault = {
  Button,
  DescriptionTerm,
  Input,
  Label,
  Nav,
  Heading,
  Span,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  View,
};
