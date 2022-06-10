import React from 'react';
import { useTheme } from '@aws-amplify/ui-react';
import { isDesignToken } from '@aws-amplify/ui';
import {
  SpaceBlock,
  BorderWidthBlock,
  FontFamilyBlock,
  FontSizeBlock,
  LineHeightBlock,
  FontWeightBlock,
  ColorBlock,
  RadiusBlock,
} from './TokenBlocks';

type Namespaces =
  | 'colors'
  | 'radii'
  | 'space'
  | 'borderWidths'
  | 'lineHeights'
  | 'fonts'
  | 'fontSizes'
  | 'fontWeights';

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

type TokenItemProps = {
  variation: Namespaces;
  children: React.ReactNode;
};

export function TokenItem({ variation, children }: TokenItemProps) {
  return (
    <li>
      <div className={`docs-tokenItem docs-tokenItem--${variation}`}>
        {children}
      </div>
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
        return (
          <React.Fragment key={index}>
            {
              /**
               * Path fragments start with a '.' unless it's the first
               * item or a number, e.g. 'neutral[80]'.
               */
              index !== 0 && isNaN(pathFragment as any) && '.'
            }
            {
              // Path fragments that are a number should be wrapped in
              isNaN(pathFragment as any) ? pathFragment : `[${pathFragment}]`
            }
          </React.Fragment>
        );
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
  namespace: Namespaces;
  // TODO: better type for childNamespace? This should be children
  // of whatever namespace you chose. e.g. namespace: 'colors', childNamespace: 'brand,primary'
  childNamespace?: string;
};

export function TokenList({ namespace, childNamespace }: TokenListProps) {
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
      case 'radii':
        return <RadiusBlock value={value} />;
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
