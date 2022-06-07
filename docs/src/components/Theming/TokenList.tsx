import React from 'react';
import { useTheme } from '@aws-amplify/ui-react';
import {
  SpaceBlock,
  BorderWidthBlock,
  FontFamilyBlock,
  FontSizeBlock,
  LineHeightBlock,
  FontWeightBlock,
  ColorBlock,
} from './TokenBlocks';

export function createTokenList(tokens) {
  // Creates an array out of the token object passed to createTokenList()
  let tokenList = [];
  function iterateGroup(group) {
    for (const [key, value] of Object.entries(group)) {
      if (typeof value === 'object' && value.hasOwnProperty('name')) {
        tokenList.push({
          ...value,
        });
      } else {
        iterateGroup(value);
      }
    }
  }
  if (tokens.hasOwnProperty('name')) {
    tokenList.push(tokens);
  } else {
    iterateGroup(tokens);
  }
  return tokenList;
}

export function TokenItem({ variation, children }) {
  return (
    <li>
      <div className={`docs-tokenItem docs-tokenItem--${variation}`}>
        {children}
      </div>
    </li>
  );
}

export function TokenPath({ path }) {
  return (
    <div className="docs-tokenItem-path">
      {path.map((pathFragment, index) => {
        return (
          <React.Fragment key={index}>
            {
              /**
               * Path fragments start with a '.' unless it's the first
               * item or a number, e.g. 'neutral[80]'.
               */
              index !== 0 && isNaN(pathFragment) && '.'
            }
            {
              // Path fragments that are a number should be wrapped in
              isNaN(pathFragment) ? pathFragment : `[${pathFragment}]`
            }
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function TokenMeta({ children }) {
  return <div className="docs-tokenItem-meta">{children}</div>;
}

export function TokenList({ namespace, childNamespace }) {
  const { tokens } = useTheme();

  /**
   * Get the tokens from useTheme() depending on what namespace
   * and childNamespace(s) are passed to the TokenList
   */
  let tokenNamespace = tokens[namespace];
  if (childNamespace) {
    let childNamespaceArr = childNamespace.trim().split(',');
    for (var i = 0; i < childNamespaceArr.length; i++) {
      tokenNamespace = tokenNamespace[childNamespaceArr[i]];
    }
  }

  // Create a more iteratable list (array) from our tokens
  const tokenList = createTokenList(tokenNamespace);

  /**
   * Depending on the namespace,  render a different visual
   * element for the token list (like a color swatch for 'colors')
   */
  function renderVisualElement(value) {
    switch (namespace) {
      case 'fontWeights':
        return <FontWeightBlock value={value} />;
      case 'fontSizes':
        return <FontSizeBlock value={value} />;
      case 'fonts':
        return <FontFamilyBlock value={value} />;
      case 'lineHeights':
        return <LineHeightBlock value={value} />;
      case 'borderWidths':
        return <BorderWidthBlock value={value} />;
      case 'space':
        return <SpaceBlock value={value} />;
      case 'colors':
        return <ColorBlock value={value} />;
      default:
        return <div></div>;
    }
  }

  return (
    <ul className="docs-tokenGroup docs-tokenGroup--list">
      {tokenList.map((tokenItem) => {
        const { name, path, value } = tokenItem;

        // Remove the first path fragment which is the same as the namespace.
        path.shift();

        return (
          <TokenItem variation={namespace} key={name}>
            {renderVisualElement(value)}
            <TokenPath path={path} />
            <TokenMeta>{value}</TokenMeta>
            <TokenMeta>{name}</TokenMeta>
          </TokenItem>
        );
      })}
    </ul>
  );
}
