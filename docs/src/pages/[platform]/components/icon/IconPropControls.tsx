import * as React from 'react';
import { Flex, TextField, IconProps, View } from '@aws-amplify/ui-react';

export interface IconPropControlsProps extends IconProps {
  setPathData: (value: React.SetStateAction<IconProps['pathData']>) => void;
  setViewBox: (value: React.SetStateAction<IconProps['viewBox']>) => void;
  setWidth: (value: React.SetStateAction<IconProps['width']>) => void;
  setHeight: (value: React.SetStateAction<IconProps['height']>) => void;
  setAriaLabel: (value: React.SetStateAction<IconProps['ariaLabel']>) => void;
  setColor: (value: React.SetStateAction<IconProps['color']>) => void;
}

interface IconPropControlsInterface {
  (props: IconPropControlsProps): JSX.Element;
}

export const IconPropControls: IconPropControlsInterface = ({
  pathData,
  setPathData,
  viewBox,
  setViewBox,
  ariaLabel,
  setAriaLabel,
  width,
  setWidth,
  height,
  setHeight,
  color,
  setColor,
}) => {
  return (
    <Flex direction="column">
      <TextField
        value={pathData}
        onChange={(event) => setPathData(event.target.value)}
        label="pathData"
      />
      <TextField
        value={width as string}
        onChange={(event) => setWidth(event.target.value)}
        label="width"
      />
      <TextField
        value={height as string}
        onChange={(event) => setHeight(event.target.value)}
        label="height"
      />
      <TextField
        value={color as string}
        onChange={(event) => setColor(event.target.value)}
        label="color"
      />
      <TextField
        value={ariaLabel}
        onChange={(event) => setAriaLabel(event.target.value)}
        label="ariaLabel"
      />
      <Flex
        as="fieldset"
        direction="column"
        gap="var(--amplify-components-field-gap)"
      >
        <legend className="amplify-visually-hidden">viewBox</legend>
        <View className="amplify-label" aria-hidden="true">
          viewBox
        </View>
        <Flex>
          <TextField
            value={viewBox.width}
            onChange={(event) =>
              setViewBox({
                width: parseInt(event.target.value),
                height: viewBox.height,
              })
            }
            label="viewBox width"
            labelHidden={true}
            placeholder="width"
          />
          <TextField
            value={viewBox.height}
            onChange={(event) =>
              setViewBox({
                width: viewBox.width,
                height: parseInt(event.target.value, 10),
              })
            }
            label="viewBox height"
            labelHidden={true}
            placeholder="height"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
