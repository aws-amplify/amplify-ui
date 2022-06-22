import { PropertyTable } from './PropertyTable';

export const colorProperties = ['color', 'opacity'];

export const ColorStyles = () => {
  return <PropertyTable properties={colorProperties} />;
};
