import React from 'react';
import { Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
var SUPPORTED_ORIENTATIONS = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];
export default function MessageWrapper(_a) {
    var children = _a.children, disableSafeAreaView = _a.disableSafeAreaView, style = _a.style;
    return (<Modal transparent visible supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <SafeAreaProvider>
        {disableSafeAreaView ? (children) : (<SafeAreaView style={[styles.messageWrapper, style]}>
            {children}
          </SafeAreaView>)}
      </SafeAreaProvider>
    </Modal>);
}
