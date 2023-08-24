import { PropertyTable } from './PropertyTable';

export const borderProperties = [
  'border',
  'borderStyle',
  'borderRadius',
  'borderWidth',
  'borderColor',
];

export const BorderStyles = () => {
  return <PropertyTable properties={borderProperties} />;
};
