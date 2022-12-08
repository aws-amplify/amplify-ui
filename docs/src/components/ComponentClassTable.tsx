import * as React from 'react';
import {
  ComponentClassObject,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from '@aws-amplify/ui-react';
import { ResponsiveTable, ResponsiveTableCell } from './ResponsiveTable';

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
          <ResponsiveTableCell label="Class">
            <code>{value.className}</code>
          </ResponsiveTableCell>
          <ResponsiveTableCell label="Description">
            {value.description}
          </ResponsiveTableCell>
        </TableRow>
      ));
  }, [componentName]);

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCell as="th">Class</TableCell>
          <TableCell as="th">Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{targetClasses}</TableBody>
    </ResponsiveTable>
  );
};
