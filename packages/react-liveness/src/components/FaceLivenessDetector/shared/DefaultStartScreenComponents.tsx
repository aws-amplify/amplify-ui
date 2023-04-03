import React from 'react';
import { Flex, View, ComponentClassNames, Text } from '@aws-amplify/ui-react';
import { GoodFitIllustration, TooFarIllustration, StartScreenFigure } from './';
import { LivenessIconWithPopover } from './LivenessIconWithPopover';
import { LivenessClassNames } from '../types/classNames';

export interface StartScreenComponents {
  Header?: React.ComponentType;
  PhotosensitiveWarning?: React.ComponentType;
  Instructions?: React.ComponentType;
}

interface DefaultHeaderProps {
  headingText: string;
  bodyText: string;
}

export const DefaultHeader = ({
  headingText,
  bodyText,
}: DefaultHeaderProps): JSX.Element => {
  return (
    <View flex="1">
      <View color="font.primary" fontWeight="bold">
        {headingText}
      </View>
      <View color="font.primary">{bodyText}</View>
    </View>
  );
};

interface DefaultPhotosensitiveWarningProps {
  headingText: string;
  bodyText: string;
  infoText: string;
}

export const DefaultPhotosensitiveWarning = ({
  headingText,
  bodyText,
  infoText,
}: DefaultPhotosensitiveWarningProps): JSX.Element => {
  return (
    <Flex
      className={ComponentClassNames.Alert}
      color="orange.80"
      backgroundColor="orange.20"
      alignItems="center"
    >
      <View flex="1">
        <View className={ComponentClassNames.AlertHeading}>{headingText}</View>
        <View className={ComponentClassNames.AlertBody}>{bodyText}</View>
      </View>
      <LivenessIconWithPopover>{infoText}</LivenessIconWithPopover>
    </Flex>
  );
};

interface DefaultInstructionsProps {
  headingText: string;
  goodFitCaptionText: string;
  goodFitAltText: string;
  tooFarCaptionText: string;
  tooFarAltText: string;
  steps: string[];
}

export const DefaultInstructions = ({
  headingText,
  goodFitCaptionText,
  goodFitAltText,
  tooFarCaptionText,
  tooFarAltText,
  steps,
}: DefaultInstructionsProps): JSX.Element => {
  return (
    <Flex direction="column">
      <Text color="font.primary" fontWeight="bold">
        {headingText}
      </Text>
      <Flex className={LivenessClassNames.Figures}>
        <StartScreenFigure variation="success" caption={goodFitCaptionText}>
          <GoodFitIllustration title={goodFitAltText} />
        </StartScreenFigure>
        <StartScreenFigure variation="error" caption={tooFarCaptionText}>
          <TooFarIllustration title={tooFarAltText} />
        </StartScreenFigure>
      </Flex>
      <Flex as="ol" className={LivenessClassNames.InstructionList}>
        {steps.map((item, index) => {
          return (
            <Flex as="li" key={index + 1}>
              <Text as="span" aria-hidden="true">
                {index + 1}.
              </Text>
              <Text as="span">{item}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
