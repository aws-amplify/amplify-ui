import { View, Text, useTheme } from '@aws-amplify/ui-react';
import {
  TokenGroup,
  TokenItem,
  TokenMeta,
  TokenPath,
  createTokenList,
} from './TokenGroup';

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
            <TokenMeta>{value}</TokenMeta>
            <TokenMeta>{name}</TokenMeta>
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
    <div>
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
    </div>
  );
}

export function BorderBlock({ borderWidth }) {
  return (
    <View
      className="docs-borderBlock"
      backgroundColor="var(--amplify-colors-teal-80)"
      height={borderWidth}
    ></View>
  );
}

export function BorderGroup() {
  const { tokens } = useTheme();
  const borders = createTokenList(tokens.borderWidths);
  return (
    <div>
      <TokenGroup variation="list">
        {borders.map((border) => {
          const { name, path, value } = border;
          path.shift();
          return (
            <TokenItem variation="border" key={name}>
              <TokenPath path={path} />
              <BorderBlock borderWidth={value} />
              <TokenMeta>{value}</TokenMeta>
              <TokenMeta>{name}</TokenMeta>
            </TokenItem>
          );
        })}
      </TokenGroup>
    </div>
  );
}

export function FontBlock({ children }) {
  return <div className="docs-fontBlock">{children}</div>;
}

export function FontWeightGroup() {
  const { tokens } = useTheme();
  const weights = createTokenList(tokens.fontWeights);
  return (
    <div>
      <TokenGroup variation="list">
        {weights.map((weight) => {
          const { name, path, value } = weight;
          path.shift();
          return (
            <TokenItem variation="font" key={name}>
              <FontBlock>
                <Text fontSize={tokens.fontSizes.large} fontWeight={value}>
                  Aa
                </Text>
              </FontBlock>
              <TokenPath path={path} />
              <TokenMeta>{value}</TokenMeta>
              <TokenMeta>{name}</TokenMeta>
            </TokenItem>
          );
        })}
      </TokenGroup>
    </div>
  );
}

export function FontSizeGroup() {
  const { tokens } = useTheme();
  const fontSizes = createTokenList(tokens.fontSizes);
  return (
    <div>
      <TokenGroup variation="list">
        {fontSizes.map((fontSize) => {
          const { name, path, value } = fontSize;
          path.shift();
          return (
            <TokenItem variation="font" key={name}>
              <FontBlock>
                <View width="4rem" align="right" fontSize={value}>
                  Aa
                </View>
              </FontBlock>
              <TokenPath path={path} />
              <TokenMeta>{value}</TokenMeta>
              <TokenMeta>{name}</TokenMeta>
            </TokenItem>
          );
        })}
      </TokenGroup>
    </div>
  );
}

export function LineHeightGroup() {
  const { tokens } = useTheme();
  const lineHeights = createTokenList(tokens.lineHeights);
  return (
    <div>
      <TokenGroup variation="list">
        {lineHeights.map((lineHeight) => {
          const { name, path, value } = lineHeight;
          path.shift();
          return (
            <TokenItem variation="font" key={name}>
              <FontBlock>
                <View
                  style={{ display: 'inline-Block' }}
                  backgroundColor={tokens.colors.teal[20]}
                  fontSize={tokens.fontSizes.large}
                  lineHeight={value}
                >
                  Aa
                </View>
              </FontBlock>
              <TokenPath path={path} />
              <TokenMeta>{value}</TokenMeta>
              <TokenMeta>{name}</TokenMeta>
            </TokenItem>
          );
        })}
      </TokenGroup>
    </div>
  );
}

export function FontFamilyGroup() {
  const { tokens } = useTheme();
  const fonts = createTokenList(tokens.fonts);
  return (
    <div>
      <TokenGroup variation="list">
        {fonts.map((font) => {
          const { name, path, value } = font;
          path.shift();
          return (
            <TokenItem variation="fontFamily" key={name}>
              <TokenPath path={path} />
              <TokenMeta>{value}</TokenMeta>
              <TokenMeta>{name}</TokenMeta>
              <FontBlock>
                <Text fontSize={tokens.fontSizes.xxl} fontFamily={value}>
                  The quick brown fox jumps over the lazy dog.
                </Text>
              </FontBlock>
            </TokenItem>
          );
        })}
      </TokenGroup>
    </div>
  );
}

export function TypographyGroup() {
  const { tokens } = useTheme();
}
