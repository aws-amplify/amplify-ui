import { PropertyTable } from './PropertyTable';

export const flexProperties = [
  'direction',
  'wrap',
  'flex',
  'order',
  'grow',
  'justifyContent',
  'alignContent',
  'alignItems',
  'alignSelf',
  'shrink',
  'basis',
];

export const FlexStyles = () => {
  return <PropertyTable properties={flexProperties} />;
};
