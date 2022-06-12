import * as React from 'react';
import {
  Expander,
  ExpanderItem,
  useTheme,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Tabs,
  TabItem,
} from '@aws-amplify/ui-react';

const flattenTokens = (tokenObject) => {
  if (tokenObject.value) {
    return [tokenObject];
  } else {
    return Object.values(tokenObject).reduce((prev: [], current) => {
      return [...prev, ...flattenTokens(current)];
    }, []);
  }
};

const convertValueToString = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  return JSON.stringify(value);
};

const createExpander = (designObject) => {
  const tokenExpanders = Object.keys(designObject).map((key) => {
    return (
      <ExpanderItem title={key} value={key} key={key}>
        <Table variation="striped">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Variable Name</TableCell>
              <TableCell>Original Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designObject[key].map((value) => {
              return (
                <TableRow key={value.name}>
                  <TableCell>{['tokens', ...value.path].join('.')}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{convertValueToString(value.original)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ExpanderItem>
    );
  });
  return <Expander>{tokenExpanders}</Expander>;
};

export const DesignTokenTable = () => {
  const { tokens } = useTheme();
  const { components, ...rest } = tokens;

  const generalTokens = Object.entries(rest).reduce((prev, current) => {
    const [key, value] = current;
    prev[key] = flattenTokens(value);
    return prev;
  }, {});

  const generalExpander = React.useMemo(() => {
    return createExpander(generalTokens);
  }, [createExpander]);

  return (
    <Tabs>
      <TabItem title="Tokens">{generalExpander}</TabItem>
    </Tabs>
  );
};
