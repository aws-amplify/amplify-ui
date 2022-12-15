import React from 'react';
import { translate } from '@aws-amplify/ui';
import {
  Flex,
  View,
  ComponentClassNames,
  Text,
  Collection,
} from '../../../../primitives';
import { DescriptionBullet } from '../../shared';
import { LivenessIconWithPopover } from '../../shared/LivenessIconWithPopover';
import { useTheme } from '../../../../hooks/useTheme';

export interface LivenessComponents {
  LivenessHeader?: () => JSX.Element;
  PhotosensitiveWarning?: () => JSX.Element;
  LivenessInstructions?: () => JSX.Element;
}

export const defaultLivenessHeaderHeading: string = 'Liveness check';
export const defaultLivenessHeaderBody: string =
  'You will go through a face verification process to prove you are a real person.';

export const LivenessHeader = (): JSX.Element => {
  return (
    <View flex="1">
      <View color="font.tertiary" fontWeight="bold">
        {translate<string>(defaultLivenessHeaderHeading)}
      </View>
      <View color="font.tertiary">
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
    desc: 'Make sure your face is not covered with sunglasses or a mask.',
  },
  {
    desc: 'Move to a well-lit place that is not dark or in direct sunlight.',
  },
  {
    desc: 'When check starts, fit face in oval, and hold for colored lights.',
  },
];

export const defaultLivenessInstructionsHeader: string =
  'Follow the instructions to complete the check: ';

export const LivenessInstructions = (): JSX.Element => {
  return (
    <View>
      <Text color="font.tertiary">
        {translate<string>(defaultLivenessInstructionsHeader)}
      </Text>
      <Collection type="list" items={INSTRUCTIONS}>
        {(item, index) => (
          <DescriptionBullet
            key={index + 1}
            index={index + 1}
            desc={translate(item.desc)}
          />
        )}
      </Collection>
    </View>
  );
};

export const defaultComponents: LivenessComponents = {
  LivenessHeader: LivenessHeader,
  PhotosensitiveWarning: PhotosensitiveWarning,
  LivenessInstructions: LivenessInstructions,
};
