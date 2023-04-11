import React from 'react';

import { Flex, View, FlexProps } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';

interface StartScreenFigureProps extends FlexProps {
  caption: string;
  variation?: 'defaut' | 'error' | 'success';
}

export const StartScreenFigure: React.FC<StartScreenFigureProps> = ({
  children,
  caption,
  variation = 'default',
  ...rest
}) => {
  return (
    <Flex
      as="figure"
      className={`${LivenessClassNames.Figure} ${LivenessClassNames.Figure}--${variation}`}
      {...rest}
    >
      <View
        className={`${LivenessClassNames.FigureImage} ${LivenessClassNames.FigureImage}--${variation}`}
      >
        {variation === 'success' ? (
          <svg
            className={LivenessClassNames.FigureIcon}
            aria-hidden="true"
            width="24"
            height="24"
          >
            <g fill="none">
              <path fill="#365E3D" d="M0 0h24v24H0z" />
              <path
                fill="#FFF"
                d="m9.435 15.62-4.054-4.055L4 12.936l5.435 5.435L21.101 6.704l-1.37-1.371z"
              />
            </g>
          </svg>
        ) : null}
        {variation === 'error' ? (
          <svg
            className={LivenessClassNames.FigureIcon}
            aria-hidden="true"
            width="24"
            height="24"
          >
            <g fill="none">
              <path fill="#600" d="M0 0h24v24H0z" />
              <path
                fill="#FFF"
                d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </g>
          </svg>
        ) : null}
        {children}
      </View>
      <View
        as="figcaption"
        className={`${LivenessClassNames.FigureCaption} ${LivenessClassNames.FigureCaption}--${variation}`}
      >
        {caption}
      </View>
    </Flex>
  );
};
