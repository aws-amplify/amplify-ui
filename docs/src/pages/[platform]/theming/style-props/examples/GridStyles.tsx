import { PropertyTable } from './PropertyTable';

export const gridProperties = [
  'autoColumns',
  'autoFlow',
  'autoRows',
  'templateAreas',
  'templateColumns',
  'templateRows',
  'area',
  'column',
  'columnEnd',
  'columnSpan',
  'columnStart',
  'row',
  'rowEnd',
  'rowSpan',
  'rowStart',
  'gap',
  'columnGap',
  'rowGap',
];

export const GridStyles = () => {
  return <PropertyTable properties={gridProperties} />;
};
