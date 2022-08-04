import {
  Badge,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  View,
} from '@aws-amplify/ui-react';
import {
  ResponsiveTable,
  ResponsiveTableCell,
} from '@/components/ResponsiveTable';

export type Prop = {
  name: string;
  isOptional: boolean;
  type: string;
  description: string;
};

interface PropTableProps {
  props: Prop[];
}

export const PropsTable = ({ props }: PropTableProps) => {
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
        {props.map((prop, index) => {
          const { name, isOptional, type, description } = prop;
          return (
            <TableRow key={`${prop}-${index}`}>
              <ResponsiveTableCell label="Name">{name}</ResponsiveTableCell>
              <ResponsiveTableCell label="Type">
                <code>{type}</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Description">
                <View marginBottom="xs">
                  {!isOptional && (
                    <Badge variation="info" size="small">
                      required
                    </Badge>
                  )}
                </View>
                {description}
              </ResponsiveTableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};
