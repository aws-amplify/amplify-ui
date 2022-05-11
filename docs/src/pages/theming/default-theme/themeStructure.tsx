import * as React from 'react';
import { useTheme } from '@aws-amplify/ui-react';

function flattenTheme(obj, arr = []) {
  if (obj.hasOwnProperty('value')) {
    arr.push(obj);
  } else {
    for (const name in obj) {
      if (obj.hasOwnProperty(name)) {
        flattenTheme(obj[name], arr);
      }
    }
  }

  return arr;
}

export const ThemeStructure = () => {
  const allTokens = flattenTheme(useTheme().tokens);
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Value</td>
        </tr>
      </thead>
      {allTokens.map(({ name, value }) => (
        <tr key={name}>
          <td>
            <code>{name}</code>
          </td>
          <td>
            <code>{value}</code>
          </td>
        </tr>
      ))}
    </table>
  );
};
