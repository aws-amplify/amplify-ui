import React from 'react';
import { Property } from 'csstype';

import { Icon, Flex, TextField, View, useTheme } from '@aws-amplify/ui-react';
import { Example } from '@/components/Example';
import { Demo } from '@/components/Demo';

const propsToCode = (props) => `<Icon
  pathData=${JSON.stringify(props.pathData)}
  viewBox={{
    width: ${JSON.stringify(props.width)},
    height: ${JSON.stringify(props.height)}
  }}
  fill=${JSON.stringify(props.fill)}
  ariaLabel=${JSON.stringify(props.ariaLabel)}
  />`;

const PropControls = (props) => {
  const { tokens } = useTheme();
  const {
    width,
    setWidth,
    height,
    setHeight,
    ariaLabel,
    setAriaLabel,
    pathData,
    setPathData,
    color,
    setColor,
  } = props;
  return (
    <View padding={`${tokens.space.medium} 0`}>
      <TextField
        label="pathData"
        value={pathData as string}
        onChange={(event) => setPathData(event.target.value)}
      />
      <TextField
        label="width"
        value={width}
        onChange={(event) => setWidth(event.target.value)}
      />
      <TextField
        label="height"
        value={height}
        onChange={(event) => setHeight(event.target.value)}
      />
      <TextField
        label="ariaLabel"
        value={ariaLabel}
        onChange={(event) => setAriaLabel(event.target.value)}
      />
      <TextField
        label="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
    </View>
  );
};

export const IconDemo = () => {
  const [width, setWidth] = React.useState<number>(24);
  const [height, setHeight] = React.useState<number>(24);
  const [color, setColor] = React.useState<Property.Color>('');
  const [ariaLabel, setAriaLabel] = React.useState<string>('search');
  const [pathData, setPathData] = React.useState<string>(
    `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5
     3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5
     4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`
  );
  const props = {
    width,
    setWidth,
    height,
    setHeight,
    ariaLabel,
    setAriaLabel,
    pathData,
    setPathData,
    color,
    setColor,
  };

  return (
    <Demo propControls={<PropControls {...props} />} code={propsToCode(props)}>
      <Icon
        pathData={pathData}
        viewBox={{ width, height }}
        color={color}
        ariaLabel={ariaLabel}
        className="icon-demo-search"
      />
    </Demo>
  );
};
