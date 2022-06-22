import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ComponentPropsToStylePropsMap,
} from '@aws-amplify/ui-react';

const convertToKebab = (name) => {
  return name.replace(/[A-Z]/g, '-$&').toLowerCase();
};

export const PropertyTable = ({ properties = [] }) => {
  return (
    <Table variation="striped">
      <TableHead>
        <TableRow>
          <TableCell as="th">Style Prop</TableCell>
          <TableCell as="th">CSS Property</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {properties.map((property) => {
          return (
            <TableRow key={property}>
              <TableCell>{property}</TableCell>
              <TableCell>
                {convertToKebab(ComponentPropsToStylePropsMap[property])}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
