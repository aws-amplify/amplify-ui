import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ComponentPropsToStylePropsMap,
  stylePropsToThemeKeys,
} from '@aws-amplify/ui-react';

const convertToKebab = (name) => {
  return name.replace(/[A-Z]/g, '-$&').toLowerCase();
};

export const PropertyTable = ({ properties = [] }) => {
  return (
    <Table variation="striped">
      <TableHead>
        <TableRow>
          <TableCell as="th">Property</TableCell>
          <TableCell as="th">CSS Property</TableCell>
          <TableCell as="th">Theme Root</TableCell>
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
              <TableCell>{stylePropsToThemeKeys[property] || 'none'}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
