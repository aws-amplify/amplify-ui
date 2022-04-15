import * as React from 'react';
import { View, ViewProps } from '@aws-amplify/ui-react';
import { useViewProps } from './useViewProps';
import { ViewPropControls } from './ViewPropControls';
import { Demo } from '@/components/Demo';

const propsToCode = (props: ViewProps) => {
  return (
    `<View` +
    (props.ariaLabel ? `\n  ariaLabel="${props.ariaLabel}"` : '') +
    `\n  as="${props.as}"` +
    (props.backgroundColor
      ? `\n  backgroundColor="${props.backgroundColor}"`
      : '') +
    (props.borderRadius ? `\n  borderRadius="${props.borderRadius}"` : '') +
    (props.border ? `\n  border="${props.border}"` : '') +
    (props.boxShadow ? `\n  boxShadow="${props.boxShadow}"` : '') +
    (props.color ? `\n  color="${props.color}"` : '') +
    (props.height ? `\n  height="${props.height}"` : '') +
    (props.opacity ? `\n  opacity="${props.opacity}"` : '') +
    (props.padding ? `\n  padding="${props.padding}"` : '') +
    (props.width ? `\n  width="${props.width}"` : '') +
    `\n  onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
  >
  {"I\'m a <${props.as}>! 🤩"}
</View>`
  );
};

export const ViewDemo = () => {
  const props = useViewProps({
    as: 'div',
    ariaLabel: 'View example',
    width: '20rem',
    height: '4rem',
    color: 'var(--amplify-colors-blue-60)',
    backgroundColor: 'var(--amplify-colors-white)',
    boxShadow: '3px 3px 5px 6px var(--amplify-colors-neutral-60)',
    padding: '1rem',
    border: '1px solid var(--amplify-colors-black)',
    borderRadius: '12px',
    opacity: '100%',
  });

  const {
    ariaLabel,
    as,
    backgroundColor,
    borderRadius,
    boxShadow,
    border,
    color,
    height,
    opacity,
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
        onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
        opacity={opacity}
        padding={padding}
        width={width}
      >
        {`I'm a <${as.toString()}>! 🤩`}
      </View>
    </Demo>
  );
};
