import { WebDesignToken } from './tokens/types/designToken';

/**
 * All of this code is to be removed in the next major version release and is being used to temporarily duplicate misnamed state tokens
 * i.e. `hover` instead of `_hover`.  These tokens both map to the same css variable name which means we need special logic to remove duplicates
 * should multiple instances of this variable exist.
 */

type TokenName = string;
type TokenPath = string;
interface PotentiallyDuplicatedStateTokens {
  [key: TokenName]: TokenPath;
}

/**
 * This function takes in an array of WebDesignTokens and filters out the duplicate WebDesignTokens
 * that are defined in the DUPLICATE_STATE_TOKENS list. This is designed to remove the duplicate tokens
 * that were created due to inconsistent naming.  This should be removed when the tokens are removed in the
 * next major version release.
 * @param tokens
 * @returns WebDesignTokens[]
 */
export function removeDuplicateStateTokens(
  tokens: WebDesignToken[]
): WebDesignToken[] {
  const seenTokens = {};

  return tokens.reduce(
    (acc: WebDesignToken[], current: WebDesignToken): WebDesignToken[] => {
      const { name, path } = current;
      const duplicateTokenPath = POTENTIALLY_DUPLICATED_STATE_TOKENS[name];
      const tokenPath = path.join('.');

      // Not listed as a potential duplicate token
      if (!duplicateTokenPath) {
        acc.push(current);
        return acc;
      }

      // First time seeing this token, just add to the list and track its index
      if (!seenTokens[name]) {
        acc.push(current);
        seenTokens[name] = {
          token: current,
          idx: acc.length - 1,
        };
        return acc;
      }

      // Not the first time we see this token, check its path against the preferred path found in DUPLICATE_STATE_TOKENS and if the current path
      // matches, replace the token already added to acc with the current using the index that was noted previously
      if (tokenPath === duplicateTokenPath) {
        const { idx } = seenTokens[name];
        acc[idx] = current;
        return acc;
      }

      // Not the first time we are seeing the current token name, but the path of the current doesn't match the preferred path so leave it out of the list
      return acc;
    },
    []
  );
}

export const POTENTIALLY_DUPLICATED_STATE_TOKENS: PotentiallyDuplicatedStateTokens =
  {
    '--amplify-components-link-active-color': 'components.link._active.color',
    '--amplify-components-link-focus-color': 'components.link._focus.color',
    '--amplify-components-link-hover-color': 'components.link._hover.color',
    '--amplify-components-link-visited-color': 'components.link._visited.color',
    '--amplify-components-pagination-button-hover-background-color':
      'components.pagination.button._hover.backgroundColor',
    '--amplify-components-pagination-button-hover-color':
      'components.pagination.button._hover.color',
    '--amplify-components-pagination-button-disabled-color':
      'components.pagination.button._disabled.color',
    '--amplify-components-switchfield-thumb-checked-transform':
      'components.switchfield.thumb._checked.transform',
    '--amplify-components-switchfield-track-checked-background-color':
      'components.switchfield.track._checked.backgroundColor',
    '--amplify-components-table-row-hover-background-color':
      'components.table.row._hover.backgroundColor',
  };
