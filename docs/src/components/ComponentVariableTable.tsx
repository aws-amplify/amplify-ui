import * as React from 'react';
import { Alert, Grid, ScrollView, useTheme } from '@aws-amplify/ui-react';

function extractClasses(themeObject) {
  console.log('themeObject: ', themeObject);
  if (!themeObject || typeof themeObject !== 'object') return [];
  const themeKeys = Object.keys(themeObject);
  let classNames = [];

  themeKeys.forEach((key) => {
    // 'value' is a special attribute, only design tokens will have 'value'
    // however, there could be a 'name' in part of the object
    if (themeObject[key]?.value) {
      classNames.push(themeObject[key].name);
    } else if (typeof themeObject[key] === 'object') {
      classNames = classNames.concat(extractClasses(themeObject[key]));
    }
  });
  return classNames;
}

export const ComponentVariableTable = ({ componentName }) => {
  const { tokens } = useTheme();
  console.log(componentName);
  const variableNames = extractClasses(
    tokens?.components?.[componentName.toLowerCase()]
  ).sort();

  return variableNames.length > 0 ? (
    <ScrollView tabIndex={0}>
      <Grid
        className="docs-grid-bordered"
        as="ul"
        templateColumns={{ base: '1fr', medium: 'auto auto' }}
      >
        {variableNames.map((name) => {
          return (
            <li key={name}>
              <code>{name}</code>
            </li>
          );
        })}
      </Grid>
    </ScrollView>
  ) : (
    <Alert role="none">No variables available for this component</Alert>
  );
};
