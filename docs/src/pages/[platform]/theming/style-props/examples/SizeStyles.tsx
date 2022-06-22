import { PropertyTable } from './PropertyTable';

export const sizeProperties = [
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',
];

export const SizeStyles = () => {
  return <PropertyTable properties={sizeProperties} />;
};
