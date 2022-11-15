import { Properties } from '../../../scripts/types/catalog';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
import {
  ResponsiveTable,
  ResponsiveTableCell,
} from '@/components/ResponsiveTable';

export function PropsTable({ properties }: { properties: Properties }) {
  return (
    <ResponsiveTable className="docs-prop-table">
      <TableHead>
        <TableRow>
          <TableCell as="th">Name</TableCell>
          <TableCell as="th">Type</TableCell>
          <TableCell as="th">Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(properties).map(
          ([propName, { name, type, description, isOptional }]) => (
            <TableRow key={name}>
              <ResponsiveTableCell label="Name">
                {name}
                {isOptional ? '' : '<sup>*</sup>'}
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Type">
                <code>{type}</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Description">
                {description ? description : '-'}
              </ResponsiveTableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
}
