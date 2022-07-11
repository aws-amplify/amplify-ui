import * as React from 'react';
import {
  Table,
  ComponentClassObject,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from '@aws-amplify/ui-react';

export const ComponentClassTable = ({ componentName }) => {
  const targetClasses = React.useMemo(() => {
    return Object.values(ComponentClassObject)
      .filter((value: any) => {
        return (
          value &&
          Array.isArray(value.components) &&
          value.components.includes(componentName)
        );
      })
      .map((value: { className: string; description?: string }) => (
        <TableRow key={value.className}>
          <TableCell>
            <span className="docs-responsive-table__label" aria-hidden="true">
              Class
            </span>
            <span className="docs-responsive-table__value">
              <code>{value.className}</code>
            </span>
          </TableCell>
          <TableCell>
            <span className="docs-responsive-table__label" aria-hidden="true">
              Description
            </span>
            <span className="docs-responsive-table__value">
              {value.description}
            </span>
          </TableCell>
        </TableRow>
      ));
  }, [componentName]);

  return (
    <Table variation="bordered" size="small" className="docs-responsive-table">
      <TableHead>
        <TableRow>
          <TableCell as="th">Class</TableCell>
          <TableCell as="th">Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{targetClasses}</TableBody>
    </Table>
  );
};
