import { PropertyTable } from './PropertyTable';
import { ComponentPropsToStylePropsMap } from '@aws-amplify/ui-react';
import { backgroundProperties } from './BackgroundStyles';
import { borderProperties } from './BorderStyles';
import { colorProperties } from './ColorStyles';
import { flexProperties } from './FlexStyles';
import { gridProperties } from './GridStyles';
import { marginProperties } from './MarginAndPaddingStyles';
import { positionProperties } from './PositionStyles';
import { shadowProperties } from './ShadowStyles';
import { sizeProperties } from './SizeStyles';
import { typographyProperties } from './TypographyStyles';

const allProperties = [
  ...backgroundProperties,
  ...borderProperties,
  ...colorProperties,
  ...flexProperties,
  ...gridProperties,
  ...marginProperties,
  ...positionProperties,
  ...shadowProperties,
  ...sizeProperties,
  ...typographyProperties,
];

const otherProperties = Object.keys(ComponentPropsToStylePropsMap).filter(
  (propName) => {
    return allProperties.indexOf(propName) === -1;
  }
);

export const OtherStyles = () => {
  return <PropertyTable properties={otherProperties} />;
};
