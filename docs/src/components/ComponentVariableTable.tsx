import * as React from 'react';
import {
  Table,
  View,
  TableRow,
  TableCell,
  useTheme,
} from '@aws-amplify/ui-react';

function extractClasses(themeObject) {
  if (!themeObject || typeof themeObject !== 'object') return [];
  const themeKeys = Object.keys(themeObject);
  let classNames = [];
  themeKeys.forEach((key) => {
    if (themeObject[key]?.name) {
      classNames.push(themeObject[key].name);
    } else if (typeof themeObject[key] === 'object') {
      classNames = classNames.concat(extractClasses(themeObject[key]));
    }
  });
  return classNames;
}

export const ComponentVariableTable = ({ componentName }) => {
  const { tokens } = useTheme();
  const variableNames = React.useMemo(() => {
    const variableNames = extractClasses(
      tokens?.components?.[componentName]
    ).sort();
    let tableRows = [];
    if (variableNames.length) {
      for (let i = 0; i < variableNames.length / 2; i++) {
        const variableOne = variableNames[i * 2];
        const variableTwo = variableNames[i * 2 + 1];
        tableRows.push(
          <TableRow key={`${variableOne}-${variableTwo || ''}`}>
            <TableCell>
              <code>{variableOne}</code>
            </TableCell>
            {variableTwo && (
              <TableCell>
                <code>{variableTwo}</code>
              </TableCell>
            )}
          </TableRow>
        );
      }
    }
    return tableRows;
  }, [componentName]);

  return (
    <View className="docs-css-variables">
      <Table variation="bordered">{variableNames}</Table>
    </View>
  );
};
