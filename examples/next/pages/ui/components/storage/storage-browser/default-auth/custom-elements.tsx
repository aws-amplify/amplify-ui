import React from 'react';
import {
  Button as _Button,
  Table as _Table,
  TableRow as _TableRow,
  TableCell as _TableCell,
} from '@aws-amplify/ui-react';

const Button = React.forwardRef<HTMLButtonElement>(function Button(props, ref) {
  const { variant } = props;
  console.log(variant);
  switch (variant) {
    case 'paginate-current':
    case 'paginate-next':
    case 'paginate-previous':
      return <_Button {...props} size="small" ref={ref as any} />;
    case 'refresh':
      return (
        <_Button {...props} variation="link" size="small" ref={ref as any} />
      );
    case 'sort':
      return (
        <_Button {...props} variation="link" size="small" ref={ref as any} />
      );
    default:
      return <_Button {...props} ref={ref as any} />;
  }
});

const Table = React.forwardRef<HTMLTableElement>(function Table(props, ref) {
  return (
    <_Table {...props} size="small" variation="striped" ref={ref as any} />
  );
});

const TableData = React.forwardRef<HTMLTableElement>(
  function TableData(props, ref) {
    return <_TableCell {...props} ref={ref as any} />;
  }
);

const TableRow = React.forwardRef<HTMLTableElement>(
  function TableRow(props, ref) {
    return <_TableRow {...props} ref={ref as any} />;
  }
);

const TableHeader = React.forwardRef<HTMLTableElement>(
  function TableHeader(props, ref) {
    return <_TableCell as="th" {...props} ref={ref as any} />;
  }
);

export const elements = {
  Button,
  Table,
  TableData,
  TableHeader,
  TableRow,
};
