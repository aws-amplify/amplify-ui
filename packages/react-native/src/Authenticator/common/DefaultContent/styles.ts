import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../../theme';
import { DefaultContentStyle } from './types';

export const getDefaultStyle = ({
  tokens: { space },
}: StrictTheme): Required<DefaultContentStyle> =>
  StyleSheet.create({
    buttonPrimary: {
      marginVertical: space.medium,
    },
    buttonPrimaryLabel: {}, // themed value only
    buttonSecondary: {
      marginVertical: space.xs,
      minWidth: '50%',
    },
    buttonSecondaryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    buttonSecondaryLabel: {}, // themed value only
    errorMessage: { marginVertical: space.small },
    errorMessageLabel: {}, // themed value only
    fieldContainerStyle: {}, // themed value only
    fieldErrorStyle: {}, // themed value only
    fieldLabelStyle: {}, // themed value only
    fieldStyle: {}, // themed value only
    footer: { height: 24, width: '100%' },
    formFields: { marginVertical: space.small },
    header: { marginVertical: space.small },
  });
