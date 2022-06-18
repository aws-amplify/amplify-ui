import { PropertyTable } from './PropertyTable';

export const backgroundProperties = ['backgroundColor', 'backgroundImage'];

export const BackgroundStyles = () => {
  return <PropertyTable properties={backgroundProperties} />;
};
