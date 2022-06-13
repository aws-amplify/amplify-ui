import { View, Text } from '@aws-amplify/ui-react';
import {
  ColorValue,
  FontWeightValue,
  FontValue,
  LineHeightValue,
  FontSizeValue,
  BorderWidthValue,
  SpaceValue,
  RadiusValue,
} from '@aws-amplify/ui';

type GenericBlockProps = {
  value: string;
};

export function GenericBlock({ value }: GenericBlockProps) {
  return <div></div>;
}

type SpaceBlockProps = {
  value: SpaceValue;
};

export function SpaceBlock({ value }: SpaceBlockProps) {
  return (
    <View className="docs-spaceBlock">
      <View className="docs-spaceBlock-inner" width={value}></View>
    </View>
  );
}

type BorderWidthBlockProps = {
  value: BorderWidthValue;
};

export function BorderWidthBlock({ value }: BorderWidthBlockProps) {
  return (
    <View
      className="docs-borderBlock"
      backgroundColor="var(--amplify-colors-teal-80)"
      height={value}
    ></View>
  );
}

type FontBlockProps = {
  children: React.ReactNode;
};

export function FontBlock({ children }: FontBlockProps) {
  return (
    <View className="docs-fontBlock" aria-hidden="true">
      {children}
    </View>
  );
}

type FontSizeBlockProps = {
  value: FontSizeValue;
};

export function FontSizeBlock({ value }: FontSizeBlockProps) {
  return (
    <FontBlock>
      <View width="4rem" align="right" fontSize={value}>
        Aa
      </View>
    </FontBlock>
  );
}

type LineHeightBlockProps = {
  value: LineHeightValue;
};

export function LineHeightBlock({ value }: LineHeightBlockProps) {
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

type FontFamilyBlockProps = {
  value: FontValue;
};

export function FontFamilyBlock({ value }: FontFamilyBlockProps) {
  return (
    <FontBlock>
      <Text fontSize="var(--amplify-font-sizes-xxl" fontFamily={value}>
        The quick brown fox jumps over the lazy dog.
      </Text>
    </FontBlock>
  );
}

type FontWeightBlockProps = {
  value: FontWeightValue;
};

export function FontWeightBlock({ value }: FontWeightBlockProps) {
  return (
    <FontBlock>
      <Text fontSize="var(--amplify-font-sizes-large" fontWeight={value}>
        Aa
      </Text>
    </FontBlock>
  );
}

type ColorBlockProps = {
  value: ColorValue;
};

export function ColorBlock({ value }: ColorBlockProps) {
  return <View className="docs-colorBlock" backgroundColor={value}></View>;
}

type RadiusBlockProps = {
  value: RadiusValue;
};

export function RadiusBlock({ value }: RadiusBlockProps) {
  const minBlockSize = 'calc(2rem + 1px)';
  const svgDims = `max(${minBlockSize}, calc(2 * ${value} + 1px))`;
  const rectDims = `max(4rem, calc(4 * ${value}))`;
  const circleCenter = `calc(${value} + 1px)`;

  return (
    <div className="docs-radiusBlock">
      <svg width={svgDims} height={svgDims} xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1"
          strokeWidth="1px"
          stroke="var(--amplify-colors-neutral-60)"
          className="docs-radiusBlock-border"
          fill="transparent"
          width={rectDims}
          height={rectDims}
          rx={value}
        ></rect>
        <circle
          fill="hsla(340, 50%, 50%, 60%)"
          cx={`calc(${svgDims} - ${circleCenter}`}
          cy={circleCenter}
          r={value}
        ></circle>
      </svg>
    </div>
  );
}
