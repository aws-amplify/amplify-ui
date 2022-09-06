import { WebDesignToken } from './tokens/types/designToken';

/**
 * All of this code is to be removed in the next major version release and is being used to temporarily duplicate misnamed state tokens
 * i.e. `hover` instead of `_hover`.  These tokens both map to the same css variable name which means we need special logic to remove duplicates
 * should multiple instances of this variable exist.
 */

type TokenName = string;
type TokenPath = string;
interface DuplicateStateTokens {
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
  const duplicateTokens = {};

  return tokens
    .reduce(
      (prev: WebDesignToken[], current: WebDesignToken): WebDesignToken[] => {
        if (DUPLICATE_STATE_TOKENS[current.name]) {
          if (duplicateTokens[current.name]) {
            duplicateTokens[current.name] =
              current.path.join('.') === DUPLICATE_STATE_TOKENS[current.name]
                ? current
                : duplicateTokens[current.name];
          } else {
            duplicateTokens[current.name] = current;
          }
        } else {
          prev.push(current);
        }
        return prev;
      },
      []
    )
    .concat(Object.values(duplicateTokens));
}

const DUPLICATE_STATE_TOKENS: DuplicateStateTokens = {
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
