import { PropertyTable } from './PropertyTable';

export const layoutProperties = [
  'alignSelf',
  'display',
  'overflow',
  'alignItems',
  'alignContent',
  'justifyContent',
  'gap',
  'columnGap',
  'rowGap',
];

export const LayoutStyles = () => {
  return <PropertyTable properties={layoutProperties} />;
};
