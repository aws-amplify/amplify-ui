import * as React from 'react';
import { View, ViewProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { getPropString } from '../utils/getPropString';
import { useViewProps } from './useViewProps';
import { ViewPropControls } from './ViewPropControls';
import { demoState } from '@/utils/demoState';

const propsToCode = (props: ViewProps) => {
  return (
    `<View` +
    `\n  as="${props.as}"` +
    getPropString(props.ariaLabel, 'ariaLabel') +
    getPropString(props.backgroundColor, 'backgroundColor') +
    getPropString(props.borderRadius, 'borderRadius') +
    getPropString(props.border, 'border') +
    getPropString(props.boxShadow, 'boxShadow') +
    getPropString(props.color, 'color') +
    getPropString(props.height, 'height') +
    getPropString(props.maxWidth, 'maxWidth') +
    getPropString(props.padding, 'padding') +
    getPropString(props.width, 'width') +
    `\n  onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
  >
  {"I'm a <${props.as}>! 🤩"}
</View>`
  );
};

const defaultViewProps = {
  as: 'div',
  ariaLabel: 'View example',
  width: '20rem',
  maxWidth: '100%',
  height: '4rem',
  color: 'var(--amplify-colors-blue-60)',
  backgroundColor: 'var(--amplify-colors-white)',
  boxShadow: '3px 3px 5px 6px var(--amplify-colors-neutral-60)',
  padding: '1rem',
  border: '1px solid var(--amplify-colors-black)',
  borderRadius: '6px',
};

export const ViewDemo = () => {
  const props = useViewProps(
    demoState.get(View.displayName) || defaultViewProps
  );

  const {
    ariaLabel,
    as,
    backgroundColor,
    borderRadius,
    boxShadow,
    border,
    color,
    height,
    maxWidth,
    padding,
    width,
  } = props;

  return (
    <Demo
      code={propsToCode(props)}
      propControls={<ViewPropControls {...props} />}
    >
      <View
        ariaLabel={ariaLabel}
        as={as}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        border={border}
        boxShadow={boxShadow}
        color={color}
        height={height}
        maxWidth={maxWidth}
        onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
        padding={padding}
        width={width}
      >
        {`I'm a <${as.toString()}>! 🤩`}
      </View>
    </Demo>
  );
};
