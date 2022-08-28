import * as React from 'react';
import { Icon, IconProps } from '@aws-amplify/ui-react';
import { IconPropControls } from './IconPropControls';
import { useIconProps } from './useIconProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = ({
  pathData,
  viewBox,
  color,
  width,
  height,
  ariaLabel,
}: IconProps) => {
  const hasViewBox = viewBox.width || viewBox.height;
  return (
    `<Icon` +
    getPropString(pathData, 'pathData') +
    (hasViewBox ? `\n  viewBox={{` : '') +
    (viewBox.width ? `\n    width: ${viewBox.width},` : '') +
    (viewBox.height ? `\n    height: ${viewBox.height},` : '') +
    (hasViewBox ? `\n  }}` : '') +
    getPropString(width, 'width') +
    getPropString(height, 'height') +
    getPropString(color, 'color') +
    getPropString(ariaLabel, 'ariaLabel') +
    `\n/>`
  );
};

const defaultIconProps = {
  pathData:
    'M142.938822,125.786164 L133.905089,125.786164 L130.703259,122.698685 C142.296993,109.25125 148.66898,92.0834126 148.656375,74.3281875 C148.656375,33.2778631 115.378512,0 74.3281875,0 C33.2778631,0 0,33.2778631 0,74.3281875 C0,115.378512 33.2778631,148.656375 74.3281875,148.656375 C92.7387078,148.656375 109.662664,141.909663 122.698685,130.703259 L125.786164,133.905089 L125.786164,142.938822 L182.961692,200 L200,182.961692 L142.938822,125.786164 Z M73.5042735,124.786325 C45.1282051,124.786325 22.2222222,101.880342 22.2222222,73.5042735 C22.2222222,45.1282051 45.1282051,22.2222222 73.5042735,22.2222222 C101.880342,22.2222222 124.786325,45.1282051 124.786325,73.5042735 C124.786325,101.880342 101.880342,124.786325 73.5042735,124.786325 Z',
  viewBox: {
    width: 200,
    height: 200,
  },
  color: '',
  width: '',
  height: '',
  ariaLabel: 'Search',
};

export const IconDemo = () => {
  const iconProps = useIconProps(
    (demoState.get(Icon.displayName) as IconProps) || defaultIconProps
  );

  return (
    <Demo
      code={propsToCode(iconProps)}
      propControls={<IconPropControls {...iconProps} />}
    >
      <Icon
        pathData={iconProps.pathData}
        width={iconProps.width}
        height={iconProps.height}
        viewBox={iconProps.viewBox}
        color={iconProps.color}
        ariaLabel={iconProps.ariaLabel}
      />
    </Demo>
  );
};
