import { PropertyTable } from './PropertyTable';

export const positionProperties = [
  'bottom',
  'left',
  'position',
  'right',
  'top',
];

export const PositionStyles = () => {
  return <PropertyTable properties={positionProperties} />;
};
