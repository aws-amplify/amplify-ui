import { View, useTheme, defaultTheme } from '@aws-amplify/ui-react';

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

export function TokenGroup({ variation, children }) {
  return (
    <ul className={`docs-tokenGroup docs-tokenGroup--${variation}`}>
      {children}
    </ul>
  );
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

export function ColorBlock({ color }) {
  return <View className="docs-colorBlock" backgroundColor={color}></View>;
}

export function ColorGroup({ color }) {
  const { tokens } = useTheme();
  const colors = createTokenList(tokens.colors[color]);
  return (
    <TokenGroup variation="list">
      {colors.map((colorItem) => {
        const { name, path, value } = colorItem;
        path.shift();
        return (
          <TokenItem variation="color" key={name}>
            <ColorBlock color={value} />
            <TokenPath path={path} />
            <TokenMeta>{name}</TokenMeta>
            <TokenMeta>{value}</TokenMeta>
          </TokenItem>
        );
      })}
    </TokenGroup>
  );
}

export function SpaceBlock({ space }) {
  return (
    <div className="docs-spaceBlock">
      <View className="docs-spaceBlock-inner" width={space}></View>
    </div>
  );
}

export function SpaceGroup() {
  const { tokens } = useTheme();
  const spaces = createTokenList(tokens.space);
  return (
    <TokenGroup variation="list">
      {spaces.map((space) => {
        const { name, path, value } = space;
        path.shift();
        return (
          <TokenItem variation="space" key={name}>
            <TokenPath path={path} />
            <SpaceBlock space={value} />
            <TokenMeta>{value}</TokenMeta>

            <TokenMeta>{name}</TokenMeta>
          </TokenItem>
        );
      })}
    </TokenGroup>
  );
}

export function TokenItemVisual({ children }) {
  return <div className="docs-tokenItem-visual">{children}</div>;
}

export function RadiusBlock({ radius }) {
  return (
    <div className="docs-radiusBlock">
      <svg
        width={`max(40px, calc(2 * ${radius} + 1px))`}
        height={`max(40px, calc(2 * ${radius} + 1px))`}
        viewBox={`0 0 max(40px, calc(2 * ${radius} + 1px)) max(40px, calc(2 * ${radius} + 1px))`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          strokeWidth="1px"
          stroke="var(--amplify-colors-neutral-60)"
          fill="hsla(210, 25%, 25%, 10%)"
          width={`max(50px, calc(4 * ${radius}))`}
          height={`max(50px, calc(4 * ${radius}))`}
          rx={radius}
        ></rect>
        <circle
          fill="hsla(340, 50%, 50%, 60%)"
          cx={`calc(${radius} + 1px)`}
          cy={`calc(${radius} + 1px)`}
          r={radius}
        ></circle>
      </svg>
    </div>
  );
}

export function RadiiGroup() {
  const { tokens } = useTheme();
  const radii = createTokenList(tokens.radii);
  return (
    <TokenGroup variation="list">
      {radii.map((radius) => {
        const { name, path, value } = radius;
        path.shift();
        return (
          <TokenItem variation="radius" key={name}>
            <TokenPath path={path} />
            <TokenMeta>{value}</TokenMeta>
            <TokenMeta>{name}</TokenMeta>
            {/* <RadiusBlock radius={value} /> */}
          </TokenItem>
        );
      })}
    </TokenGroup>
  );
}
