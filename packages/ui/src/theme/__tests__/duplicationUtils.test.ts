import { partialRight } from 'lodash';
import {
  removeDuplicateStateTokens,
  POTENTIALLY_DUPLICATED_STATE_TOKENS,
} from '../duplicationUtils';

describe('duplication utils', () => {
  describe('removeDuplicateStateTokens', () => {
    /**
     * This function will remove duplicate WebDesignTokens based on a constant list of defined tokens and paths.  This function does not try to validate
     * WebDesignTokens that do not appear in the static list `POTENTIALLY_DUPLICATED_STATE_TOKENS`.  If duplicate tokens from `POTENTIALLY_DUPLICATED_STATE_TOKENS`
     * are found then the function will keep the token that has a path matching the path defined for that token in `POTENTIALLY_DUPLICATED_STATE_TOKENS` and if
     * none of the duplicate tokens have a matching path, then the first one found will be kept.
     */

    const createWebDesignToken = ([name, path]) => {
      return {
        name,
        path: path.split('.'),
        original: '',
        toString: () => '',
        value: '',
      };
    };

    const validTokenNamesAndPaths = {
      '--amplify-components-button-color': 'components.button.color',
      '--amplify-components-button-background-color':
        'components.button.backgroundColor',
      '--amplify-components-button-border-radius': 'components.borderRadius',
      '--amplify-components-link-color': 'components.link.color',
      '--amplify-components-badge-info-color': 'components.badge.info.color',
      '--amplify-components-checkbox-cursor': 'components.checkbox.cursor',
    };

    const validTokenList = Object.entries(validTokenNamesAndPaths).map(
      createWebDesignToken
    );

    it('should not remove tokens where no duplicates exist', () => {
      const result = removeDuplicateStateTokens(validTokenList);
      expect(result).toEqual(validTokenList);
    });

    it('should keep the duplicate token that matches the expected path', () => {
      const matchingTokenNameAndPath = Object.entries(
        POTENTIALLY_DUPLICATED_STATE_TOKENS
      )[0];
      const matchingToken = createWebDesignToken(matchingTokenNameAndPath);
      const duplicateToken = createWebDesignToken([
        matchingToken.name,
        'some.path',
      ]);
      const tokenList = [...validTokenList, duplicateToken, matchingToken];
      const result = removeDuplicateStateTokens(tokenList);
      expect(result).toContain(matchingToken);
      expect(result).not.toContain(duplicateToken);
      const expectedResult = [...validTokenList, matchingToken];
      expect(result).toEqual(expectedResult);
    });

    it('should not remove tokens that do not have duplicates', () => {
      const notDuplicatedTokens = Object.entries(
        POTENTIALLY_DUPLICATED_STATE_TOKENS
      ).map(createWebDesignToken);
      const tokenList = [...validTokenList, ...notDuplicatedTokens];
      const result = removeDuplicateStateTokens(tokenList);
      expect(result).toEqual(tokenList);
    });

    it('should keep the first token found of duplicates where none match the desired path', () => {
      const tokenName = Object.entries(
        POTENTIALLY_DUPLICATED_STATE_TOKENS
      )[0][0];
      const firstToken = createWebDesignToken([tokenName, 'path1']);
      const duplicateToken = createWebDesignToken([tokenName, 'path2']);
      const secondDuplicate = createWebDesignToken([tokenName, 'path3']);
      const result = removeDuplicateStateTokens([
        firstToken,
        duplicateToken,
        secondDuplicate,
      ]);
      expect(result).toEqual([firstToken]);
    });
  });
});
