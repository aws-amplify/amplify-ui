import * as React from 'react';
import {
  Table,
  ComponentClassObject,
  View,
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
      .map((value: any) => (
        <TableRow key={value.className}>
          <TableCell>
            <code>{value.className}</code>
          </TableCell>
          <TableCell>{value.description}</TableCell>
        </TableRow>
      ));
  }, [componentName]);

  return (
    <View className="docs-css-classes">
      <Table variation="bordered">
        <TableHead>
          <TableRow>
            <TableCell as="th">Class</TableCell>
            <TableCell as="th">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{targetClasses}</TableBody>
      </Table>
    </View>
  );
};
