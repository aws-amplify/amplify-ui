/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Loader, View } from '../../../../primitives';

export function Tracker({
  file,
  percentage,
  onPause,
  onResume,
  onCancel,
  isPaused,
}: {
  file: File;
  percentage: number;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  isPaused: boolean;
}): JSX.Element {
  return (
    <View>
      <View></View>
    </View>
  );
}
