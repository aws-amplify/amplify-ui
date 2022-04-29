import * as React from 'react';

export type RouterContainerProps = {
  children: React.ReactNode;
  className: string;
  variation: 'default' | 'modal';
};

export type RouterProps = {
  hideSignUp: boolean;
};
