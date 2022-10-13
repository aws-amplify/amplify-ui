// as a safeguard against known React Native lineHeight issues, e.g. https://github.com/facebook/react-native/issues/29507

import React, { isValidElement, ReactChild } from 'react';

// use a value of 1.5 as the default line height multiplier
const LINE_HEIGHT_MULTIPLIER = 1.5;

export const getLineHeight = (fontSize: number): number =>
  fontSize * LINE_HEIGHT_MULTIPLIER;

export function capitalize<T extends string>(value: T): Capitalize<T> {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<T>;
}

export function childIsValidComponent<T>(
  child: ReactChild,
  componentType: React.FC<T>
): boolean {
  return (
    isValidElement(child) &&
    JSON.stringify(child.type) === JSON.stringify(componentType)
  );
}
