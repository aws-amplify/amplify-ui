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
  let tokenList = [];
  function iterateGroup(group) {
    for (const [key, value] of Object.entries(group)) {
      // console.log(value);
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
          <>
            {index !== 0 && isNaN(pathFragment) && '.'}
            {!isNaN(pathFragment) ? `[${pathFragment}]` : pathFragment}
          </>
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
  console.log('tokens: ', tokens);
  const tokenList = createTokenList(
    childNamespace ? tokens[namespace][childNamespace] : tokens[namespace]
  );

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
        return <div>{value}</div>;
    }
  }

  return (
    <ul className="docs-tokenGroup docs-tokenGroup--list">
      {tokenList.map((tokenItem) => {
        const { name, path, value } = tokenItem;
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
