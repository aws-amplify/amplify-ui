import React, { useMemo } from 'react';
import { useTheme } from '@aws-amplify/ui-react';
import { createTokenList, getTokenBlock } from './utils';

export type Namespace =
  | 'colors'
  | 'radii'
  | 'space'
  | 'borderWidths'
  | 'lineHeights'
  | 'fonts'
  | 'fontSizes'
  | 'fontWeights';

type TokenItemProps = {
  namespace: Namespace;
  children: React.ReactNode;
};

export function TokenItem({ namespace, children }: TokenItemProps) {
  return (
    <li className={`docs-tokenItem docs-tokenItem--${namespace}`}>
      {children}
    </li>
  );
}

type TokenPathProps = {
  path: Array<string>;
};

export function TokenPath({ path }: TokenPathProps) {
  return (
    <div className="docs-tokenItem-path">
      {path.map((pathFragment, index) => {
        /**
         * We show a delimiter (.) between path fragments, unless that
         * fragment is first in the list, or can be interpreted as a number.
         * We use isNaN() here because our path returns all fragments as strings.
         **/
        const showDelimiter = index !== 1 && isNaN(pathFragment as any);

        /**
         * Wrap any path fragments that can be interpreted as a number in brackets.
         */
        const wrapFragmentInBrackets = !isNaN(pathFragment as any);

        /**
         * Skip the first index which matches our namespace and is redundant in the UI
         */
        return index !== 0 ? (
          <React.Fragment key={index}>
            {showDelimiter && '.'}
            {wrapFragmentInBrackets ? `[${pathFragment}]` : pathFragment}
          </React.Fragment>
        ) : null;
      })}
    </div>
  );
}

type TokenMetaProps = {
  children: string;
};

export function TokenMeta({ children }: TokenMetaProps) {
  return <div className="docs-tokenItem-meta">{children}</div>;
}

type TokenListProps = {
  namespace: Namespace;
  /**
   * TODO: better type for childNamespace? This should be children
   * of whatever namespace you chose. e.g. namespace: 'colors', childNamespace: 'brand,primary'
   */
  childNamespace?: Array<string>;
};

export function TokenList({ namespace, childNamespace }: TokenListProps) {
  const { tokens } = useTheme();

  /**
   * Get the tokens from useTheme() depending on what namespace
   * and childNamespace(s) are passed to the TokenList
   */
  let tokenNamespace = tokens[namespace];
  if (childNamespace) {
    for (var i = 0; i < childNamespace.length; i++) {
      tokenNamespace = tokenNamespace[childNamespace[i]];
    }
  }

  /**
   * Create a more iteratable list (array) from our tokens
   */
  const tokenList = createTokenList(tokenNamespace);

  /**
   * getTokenBlock() returns a visual element (like a color circle)
   * depending on the namespace.
   */
  const TokenBlock = getTokenBlock(namespace);

  const tokenItems = useMemo(() => {
    return (
      <>
        {tokenList.map((tokenItem) => {
          const { name, path, value } = tokenItem;

          return (
            <TokenItem namespace={namespace} key={name}>
              <TokenBlock value={value} />
              <TokenPath path={path} />
              <TokenMeta>{value}</TokenMeta>
              <TokenMeta>{name}</TokenMeta>
            </TokenItem>
          );
        })}
      </>
    );
  }, [tokenList, TokenBlock, namespace]);
  return (
    <ul className="docs-tokenGroup docs-tokenGroup--list">{tokenItems}</ul>
  );
}
