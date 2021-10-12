import * as React from 'react';
import { defaultTheme } from '@aws-amplify/ui-react';

function DesignToken({ token }) {
  return (
    <div>
      {token.name}:{token.value}
    </div>
  );
}

function recursiveObj(obj: {}, depth = 0) {
  return (
    <div data-level={depth}>
      {Object.keys(obj).map((key) => {
        const value = obj[key];
        return (
          <div>
            {obj.hasOwnProperty('value') ? (
              <DesignToken token={obj} />
            ) : (
              recursiveObj(value, depth + 1)
            )}
          </div>
        );
      })}
    </div>
  );
}

export const ThemeStructure = () => {
  console.log(defaultTheme);
  return <div>{recursiveObj(defaultTheme.tokens)}</div>;
};
