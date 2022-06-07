import { View, Text } from '@aws-amplify/ui-react';

export function SpaceBlock({ value }) {
  return (
    <View className="docs-spaceBlock">
      <View className="docs-spaceBlock-inner" width={value}></View>
    </View>
  );
}

export function BorderWidthBlock({ value }) {
  return (
    <View
      className="docs-borderBlock"
      backgroundColor="var(--amplify-colors-teal-80)"
      height={value}
    ></View>
  );
}

export function FontBlock({ children }) {
  return (
    <View className="docs-fontBlock" aria-hidden="true">
      {children}
    </View>
  );
}

export function FontSizeBlock({ value }) {
  return (
    <FontBlock>
      <View width="4rem" align="right" fontSize={value}>
        Aa
      </View>
    </FontBlock>
  );
}

export function LineHeightBlock({ value }) {
  return (
    <FontBlock>
      <View
        style={{ display: 'inline-Block' }}
        backgroundColor="var(--amplify-colors-teal-20)"
        fontSize="var(--amplify-fontSizes-large"
        lineHeight={value}
      >
        Aa
      </View>
    </FontBlock>
  );
}

export function FontFamilyBlock({ value }) {
  return (
    <FontBlock>
      <Text fontSize="var(--amplify-font-sizes-xxl" fontFamily={value}>
        The quick brown fox jumps over the lazy dog.
      </Text>
    </FontBlock>
  );
}

export function FontWeightBlock({ value }) {
  return (
    <FontBlock>
      <Text fontSize="var(--amplify-font-sizes-large" fontWeight={value}>
        Aa
      </Text>
    </FontBlock>
  );
}

export function ColorBlock({ value }) {
  return <View className="docs-colorBlock" backgroundColor={value}></View>;
}

export function RadiusBlock({ value }) {
  const minBlockSize = 'calc(2rem + 1px)';
  return (
    <div className="docs-radiusBlock">
      <svg
        width={`max(${minBlockSize}, calc(2 * ${value} + 1px))`}
        height={`max(${minBlockSize}, calc(2 * ${value} + 1px))`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          strokeWidth="1px"
          stroke="var(--amplify-colors-neutral-60)"
          className="docs-radiusBlock-border"
          fill="transparent"
          width={`max(4rem, calc(4 * ${value}))`}
          height={`max(4rem, calc(4 * ${value}))`}
          rx={value}
        ></rect>
        <circle
          fill="hsla(340, 50%, 50%, 60%)"
          cx={`calc(max(${minBlockSize}, calc(2 * ${value} + 1px)) - calc(${value} + 1px))`}
          cy={`calc(${value} + 1px)`}
          r={value}
        ></circle>
      </svg>
    </div>
  );
}
