import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
import { ResponsiveTable } from '@/components/ResponsiveTable';
import { Properties } from '../../../scripts/types/catalog';
import { PropsTableBody } from './PropsTableBody';

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
        {Object.entries(properties)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(PropsTableBody)}
      </TableBody>
    </ResponsiveTable>
  );
}
