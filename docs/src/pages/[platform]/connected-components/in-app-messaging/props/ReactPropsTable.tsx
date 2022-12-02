import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@aws-amplify/ui-react';
import {
  ResponsiveTable,
  ResponsiveTableCell,
} from '@/components/ResponsiveTable';

interface PropMetaData {
  name: string;
  description: string;
  type: string;
}

export type ReactPlatform = 'react' | 'react-native' | unknown;

interface ReactPropsTableProps {
  platform?: ReactPlatform;
  props: ((platform: ReactPlatform) => PropMetaData[]) | PropMetaData[];
}

const Row = ({ description, name, type }: PropMetaData) => (
  <TableRow key={`${name}:${description}:${type}`}>
    <ResponsiveTableCell label="Name">{name}</ResponsiveTableCell>
    <ResponsiveTableCell label="Description">{description}</ResponsiveTableCell>
    <ResponsiveTableCell label="Type">{type}</ResponsiveTableCell>
  </TableRow>
);

export default function ReactPropsTable({
  platform,
  props,
}: ReactPropsTableProps) {
  const rows = (typeof props === 'function' ? props(platform) : props)?.map(
    Row
  );

  return (
    <ResponsiveTable highlightOnHover>
      <TableHead>
        <TableRow>
          <TableCell as="th">Name</TableCell>
          <TableCell as="th">Description</TableCell>
          <TableCell as="th">Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </ResponsiveTable>
  );
}
