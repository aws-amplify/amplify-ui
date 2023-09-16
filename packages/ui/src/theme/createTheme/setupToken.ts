import { has, isObject } from '../../utils';
import { WebDesignToken } from '../types';
import { cssNameTransform } from './cssNameTransform';
import { cssValue } from './cssValue';

export type SetupToken<ReturnType = any> = (args: {
  token: BaseDesignToken;
  path: Array<string>;
}) => ReturnType;

/**
 * This will take a design token and add some data to it for it
 * to be used in JS/CSS. It will create its CSS var name and update
 * the value to use a CSS var if it is a reference. It will also
 * add a `.toString()` method to make it easier to use in JS.
 *
 * We should see if there is a way to share this logic with style dictionary...
 */
export const setupToken: SetupToken<WebDesignToken> = ({ token, path }) => {
  const name = `--${cssNameTransform({ path })}`;
  const { value: original } = token;
  const value = cssValue(token);

  return { name, original, path, value, toString: () => `var(${name})` };
};

type SetupTokensProps = {
  tokens?: Record<string | number, any>;
  path?: Array<string>;
  setupToken: SetupToken;
};

type BaseDesignToken = {
  value: string | number;
};

/**
 * Recursive function that will walk down the token object
 * and perform the setupToken function on each token.
 * Similar to what Style Dictionary does.
 */
export function setupTokens({
  tokens,
  path = [],
  setupToken,
}: SetupTokensProps): any {
  if (has(tokens, 'value')) {
    return setupToken({ token: tokens as BaseDesignToken, path });
  }

  const output: Record<string, any> = {};

  for (const name in tokens) {
    if (has(tokens, name)) {
      const value = tokens[name];
      const nextTokens = isObject(value) ? value : { value };

      output[name] = setupTokens({
        tokens: nextTokens,
        path: path.concat(name),
        setupToken,
      });
    }
  }

  return output;
}
