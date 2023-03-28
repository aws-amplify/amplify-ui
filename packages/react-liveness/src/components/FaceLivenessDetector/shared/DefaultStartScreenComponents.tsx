import React from 'react';
import { translate, DefaultTexts } from '@aws-amplify/ui';
import { Flex, View, ComponentClassNames, Text } from '@aws-amplify/ui-react';
import { GoodFitIllustration, TooFarIllustration, StartScreenFigure } from './';
import { LivenessIconWithPopover } from './LivenessIconWithPopover';
import { LivenessClassNames } from '../types/classNames';

export interface LivenessComponents {
  LivenessHeader?: React.ComponentType;
  PhotosensitiveWarning?: React.ComponentType;
  LivenessInstructions?: React.ComponentType;
}

export const defaultLivenessHeaderHeading: string = 'Liveness check';
export const defaultLivenessHeaderBody: string =
  'You will go through a face verification process to prove you are a real person.';

export const LivenessHeader = (): JSX.Element => {
  return (
    <View flex="1">
      <View color="font.primary" fontWeight="bold">
        {translate<string>(defaultLivenessHeaderHeading)}
      </View>
      <View color="font.primary">
        {translate<string>(defaultLivenessHeaderBody)}
      </View>
    </View>
  );
};

export const defaultPhotosensitiveWarningHeader: string =
  'Photosensitivity warning';
export const defaultPhotosensitiveWarningBody: string =
  'This check displays colored lights. Use caution if you are photosensitive.';

export const PhotosensitiveWarning = (): JSX.Element => {
  return (
    <Flex
      className={ComponentClassNames.Alert}
      color="orange.80"
      backgroundColor="orange.20"
      alignItems="center"
    >
      <View flex="1">
        <View className={ComponentClassNames.AlertHeading}>
          {translate(defaultPhotosensitiveWarningHeader)}
        </View>
        <View className={ComponentClassNames.AlertBody}>
          {translate(defaultPhotosensitiveWarningBody)}
        </View>
      </View>
      <LivenessIconWithPopover />
    </Flex>
  );
};

export const INSTRUCTIONS = [
  {
    desc: (
      <span>
        When an oval appears,{' '}
        <strong>completely fill the oval with your face</strong> within 8
        seconds.
      </span>
    ),
  },
  {
    desc: DefaultTexts.LIVENESS_INSTRUCTION_BRIGHTNESS,
  },
  {
    desc: DefaultTexts.LIVENESS_INSTRUCTION_COVER,
  },
  {
    desc: DefaultTexts.LIVENESS_INSTRUCTION_LIGHT,
  },
];

export const defaultLivenessInstructionsHeader: string =
  'Follow the instructions to complete the check: ';

export const LivenessInstructions = (): JSX.Element => {
  return (
    <Flex direction="column">
      <Text color="font.primary" fontWeight="bold">
        {translate<string>(defaultLivenessInstructionsHeader)}
      </Text>
      <Flex className={LivenessClassNames.Figures}>
        <StartScreenFigure variation="success" caption="Good fit">
          <GoodFitIllustration title="Ilustration of a person's face, perfectly fitting inside of an oval." />
        </StartScreenFigure>
        <StartScreenFigure variation="error" caption="Too far">
          <TooFarIllustration title="Illustration of a person's face inside of an oval; there is a gap between the perimeter of the face and the boundaries of the oval." />
        </StartScreenFigure>
      </Flex>
      <Flex as="ol" className={LivenessClassNames.InstructionList}>
        {INSTRUCTIONS.map((item, index) => {
          return (
            <Flex as="li" key={index + 1}>
              <Text as="span" aria-hidden="true">
                {index + 1}.
              </Text>
              <Text as="span">{translate(item.desc as string)}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export const defaultComponents: LivenessComponents = {
  LivenessHeader: LivenessHeader,
  PhotosensitiveWarning: PhotosensitiveWarning,
  LivenessInstructions: LivenessInstructions,
};
