import React from 'react';
// import { Modal, ModalPropsIOS } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import { MessageWrapperProps } from './types';

// const SUPPORTED_ORIENTATIONS: ModalPropsIOS['supportedOrientations'] = [
//   'portrait',
//   'portrait-upside-down',
//   'landscape',
//   'landscape-left',
//   'landscape-right',
// ];

export default function MessageWrapper({
  children,
  disableSafeAreaView,
  style,
}: MessageWrapperProps): JSX.Element {
  return (
    <div>
      <div>
        {disableSafeAreaView ? (
          children
        ) : (
          <div
          // style={[styles.messageWrapper, style]}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
