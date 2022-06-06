import { PropertyTable } from './PropertyTable';

export const marginProperties = [
  'margin',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
];

export const MarginAndPaddingStyles = () => {
  return <PropertyTable properties={marginProperties} />;
};
