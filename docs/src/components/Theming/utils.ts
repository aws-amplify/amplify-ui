import { isDesignToken } from '@aws-amplify/ui';

export function createTokenList(tokens) {
  // Creates a flattened array out of the token object passed to createTokenList()
  let tokenList = [];
  function iterateGroup(group) {
    Object.values(group).forEach((value) => {
      if (isDesignToken(value)) {
        tokenList.push({
          ...value,
        });
      } else {
        iterateGroup(value);
      }
    });
  }
  if (isDesignToken(tokens)) {
    tokenList.push(tokens);
  } else {
    iterateGroup(tokens);
  }
  return tokenList;
}
