import React from 'react';
import { translate, DefaultTexts } from '@aws-amplify/ui';
import {
  Flex,
  View,
  ComponentClassNames,
  Text,
  Collection,
  useTheme,
  Image,
} from '@aws-amplify/ui-react';
import { DescriptionBullet } from '../../shared';
import { LivenessIconWithPopover } from '../../shared/LivenessIconWithPopover';

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
  const { tokens } = useTheme();
  return (
    <Flex
      className={ComponentClassNames.Alert}
      color={`${tokens.colors.orange[80]}`}
      backgroundColor={`${tokens.colors.orange[20]}`}
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
    desc: DefaultTexts.LIVENESS_INSTRUCTION_OVAL,
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
      <Image
        alt="Oval Instruction Example"
        src="/ovalInstruction.png"
        width="100%"
      />
      <Collection type="list" items={INSTRUCTIONS}>
        {(item, index) => (
          <DescriptionBullet
            key={index + 1}
            index={index + 1}
            desc={translate(item.desc)}
          />
        )}
      </Collection>
    </Flex>
  );
};

export const defaultComponents: LivenessComponents = {
  LivenessHeader: LivenessHeader,
  PhotosensitiveWarning: PhotosensitiveWarning,
  LivenessInstructions: LivenessInstructions,
};
