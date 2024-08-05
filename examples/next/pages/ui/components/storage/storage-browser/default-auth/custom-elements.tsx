import React from 'react';
import {
  Button as _Button,
  Table as _Table,
  TableBody as _TableBody,
  TableCell as _TableCell,
  TableHead as _TableHead,
  TableRow as _TableRow,
  Heading as _Heading,
} from '@aws-amplify/ui-react';

const Button = React.forwardRef<HTMLButtonElement>(function Button(props, ref) {
  const { variant } = props as any;
  console.log(variant);
  switch (variant) {
    case 'navigate':
      return (
        <_Button {...props} size="small" variation="link" ref={ref as any} />
      );
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
    case 'table-data':
      return (
        <_Button
          {...props}
          variation="link"
          size="small"
          textDecoration="underline"
          ref={ref as any}
        />
      );
    default:
      return <_Button {...props} ref={ref as any} />;
  }
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
        ref={ref as any}
      />
    );
  }
);
const Table = React.forwardRef<HTMLTableElement>(function Table(props, ref) {
  return (
    <_Table {...props} size="small" variation="striped" ref={ref as any} />
  );
});

const TableBody = React.forwardRef<HTMLTableSectionElement>(
  function Table(props, ref) {
    return <_TableBody {...props} ref={ref as any} />;
  }
);

const TableHead = React.forwardRef<HTMLTableSectionElement>(
  function TableHead(props, ref) {
    return <_TableHead {...props} ref={ref as any} />;
  }
);

const TableData = React.forwardRef<HTMLTableCellElement>(
  function TableData(props, ref) {
    return <_TableCell {...props} ref={ref as any} />;
  }
);

const TableRow = React.forwardRef<HTMLTableRowElement>(
  function TableRow(props, ref) {
    return <_TableRow {...props} ref={ref as any} />;
  }
);

const TableHeader = React.forwardRef<HTMLTableCellElement>(
  function TableHeader(props, ref) {
    return <_TableCell as="th" {...props} ref={ref as any} />;
  }
);

export const elements = {
  Button,
  Title,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
};
