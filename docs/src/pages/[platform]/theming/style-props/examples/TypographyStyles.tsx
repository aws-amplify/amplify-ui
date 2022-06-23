import { PropertyTable } from './PropertyTable';

export const typographyProperties = [
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textDecoration',
  'textTransform',
  'whiteSpace',
];

export const TypographyStyles = () => {
  return <PropertyTable properties={typographyProperties} />;
};
