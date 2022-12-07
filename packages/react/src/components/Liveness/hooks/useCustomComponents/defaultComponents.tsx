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
import { useTheme } from 'src/hooks/useTheme';

export interface LivenessComponents {
  LivenessHeader?: () => JSX.Element;
  PhotosensitiveWarning?: () => JSX.Element;
  LivenessInstructions?: () => JSX.Element;
}

export const LivenessHeader = (): JSX.Element => {
  return (
    <View flex="1">
      <View color="font.tertiary" fontWeight="bold">
        {translate<string>('Liveness check')}
      </View>
      <View color="font.tertiary">
        {translate<string>(
          'You will go through a face verification process to prove you are a real person.'
        )}
      </View>
    </View>
  );
};

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
          {translate('Photosensitivity warning')}
        </View>
        <View className={ComponentClassNames.AlertBody}>
          {translate(
            'This check displays colored lights. Use caution if you are photosensitive.'
          )}
        </View>
      </View>
      <LivenessIconWithPopover />
    </Flex>
  );
};

export const INSTRUCTIONS = [
  {
    desc: translate(
      'Make sure your face is not covered with sunglasses or a mask.'
    ),
  },
  {
    desc: translate(
      'Move to a well-lit place that is not dark or in direct sunlight.'
    ),
  },
  {
    desc: translate(
      'When check starts, fit face in oval, and hold for colored lights.'
    ),
  },
];

export const LivenessInstructions = (): JSX.Element => {
  return (
    <View>
      <Text color="font.tertiary">
        {translate<string>('Follow the instructions to complete the check: ')}
      </Text>
      <Collection type="list" items={INSTRUCTIONS}>
        {(item, index) => (
          <DescriptionBullet
            key={index + 1}
            index={index + 1}
            desc={item.desc}
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
