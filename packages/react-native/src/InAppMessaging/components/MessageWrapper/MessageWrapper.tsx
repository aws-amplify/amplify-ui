import React from 'react';
import type { ModalPropsIOS } from 'react-native';
import { Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import type { MessageWrapperProps } from './types';

const SUPPORTED_ORIENTATIONS: ModalPropsIOS['supportedOrientations'] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

export default function MessageWrapper({
  children,
  disableSafeAreaView,
  style,
}: MessageWrapperProps): React.JSX.Element {
  return (
    <Modal transparent visible supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <SafeAreaProvider>
        {disableSafeAreaView ? (
          children
        ) : (
          <SafeAreaView style={[styles.messageWrapper, style]}>
            {children}
          </SafeAreaView>
        )}
      </SafeAreaProvider>
    </Modal>
  );
}
