import React from 'react';

export interface ButtonProps {
  children?: Array<string>;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export interface ButtonStyles {
  text: React.CSSProperties;
}
