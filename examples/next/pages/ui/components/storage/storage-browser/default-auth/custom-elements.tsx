import React from 'react';
import {
  Button as _Button,
  Table as _Table,
  TableBody as _TableBody,
  TableCell as _TableCell,
  TableHead as _TableHead,
  TableRow as _TableRow,
  Heading as _Heading,
  View as _View,
} from '@aws-amplify/ui-react';

const Button = React.forwardRef<HTMLButtonElement>(function Button(props, ref) {
  const { variant } = props as any;
  switch (variant) {
    case 'action-select-toggle':
      return (
        <_Button {...props} variation="link" size="small" ref={ref as any} />
      );
    case 'action-select-item':
      return (
        <_Button
          {...props}
          variation="link"
          size="small"
          borderRadius="0"
          justifyContent="flex-start"
          ref={ref as any}
        />
      );
    case 'navigate':
      return <_Button {...props} size="small" variation="link" ref={ref} />;
    case 'paginate-current':
    case 'paginate-next':
    case 'paginate-previous':
      return <_Button {...props} size="small" ref={ref} />;
    case 'refresh':
      return <_Button {...props} variation="link" size="small" ref={ref} />;
    case 'sort':
      return <_Button {...props} variation="link" size="small" ref={ref} />;
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
      return <_Button {...props} ref={ref} />;
  }
});

const DefinitionTerm = React.forwardRef<HTMLElement>(
  function DefinitionTerm(props, ref) {
    return <_View {...props} as="dt" fontWeight="bold" ref={ref} />;
  }
);

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
const Table = React.forwardRef<HTMLTableElement>(function Table(props, ref) {
  return <_Table {...props} size="small" variation="striped" ref={ref} />;
});

const TableBody = React.forwardRef<HTMLTableSectionElement>(
  function Table(props, ref) {
    return <_TableBody {...props} ref={ref} />;
  }
);

const TableHead = React.forwardRef<HTMLTableSectionElement>(
  function TableHead(props, ref) {
    return <_TableHead {...props} ref={ref} />;
  }
);

const TableData = React.forwardRef<HTMLTableCellElement>(
  function TableData(props, ref) {
    return <_TableCell {...props} ref={ref} />;
  }
);

const TableRow = React.forwardRef<HTMLTableRowElement>(
  function TableRow(props, ref) {
    return <_TableRow {...props} ref={ref} />;
  }
);

const TableHeader = React.forwardRef<HTMLTableCellElement>(
  function TableHeader(props, ref) {
    return <_TableCell as="th" {...props} ref={ref} />;
  }
);

const View = React.forwardRef<HTMLDivElement>(function View(props, ref) {
  const { variant } = props as any;
  switch (variant) {
    case 'action-select-menu':
      return (
        <_View
          {...props}
          marginTop="2px"
          borderRadius="medium"
          boxShadow="0 1px 3px hsla(210, 50%, 10%, 0.25)"
          backgroundColor="background.primary"
          padding="small"
          ref={ref as any}
        />
      );
    default:
      return <_View {...props} ref={ref as any} />;
  }
});
export const elements = {
  Button,
  DefinitionTerm,
  Title,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  View,
};
