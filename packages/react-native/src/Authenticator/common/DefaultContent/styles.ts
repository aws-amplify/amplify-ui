import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../../theme';
import { DefaultContentStyle } from './types';

export const getDefaultStyle = ({
  tokens: { fontSizes, space },
}: StrictTheme): Required<DefaultContentStyle> =>
  StyleSheet.create({
    body: {
      fontSize: fontSizes.medium,
      paddingHorizontal: space.small,
    },
    buttonPrimary: {
      margin: space.medium,
    },
    buttonPrimaryLabel: {}, // themed value only
    buttonSecondary: {}, // themed value only
    buttonSecondaryLabel: {}, // themed value only
    errorMessage: {
      marginVertical: space.small,
    },
    errorMessageLabel: {}, // themed value only
    fieldContainerStyle: {
      paddingHorizontal: space.small,
    }, // themed value only
    fieldErrorStyle: {}, // themed value only
    fieldLabelStyle: {}, // themed value only
    fieldStyle: {}, // themed value only
    footer: {}, // themed value only
    formFields: {
      paddingBottom: space.small,
    },
    header: {
      marginVertical: space.small,
      paddingHorizontal: space.small,
    },
    link: {
      marginVertical: space.xs,
      minWidth: '50%',
    },
    linksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  });
