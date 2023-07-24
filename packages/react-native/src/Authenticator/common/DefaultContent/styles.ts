import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../../theme';
import { DefaultContentStyle } from './types';

export const getDefaultStyle = ({
  tokens: { colors, fontSizes, space },
}: StrictTheme): Required<DefaultContentStyle> =>
  StyleSheet.create({
    body: {
      fontSize: fontSizes.medium,
      paddingHorizontal: space.small,
    },
    buttonPrimary: {
      margin: space.small,
    },
    buttonPrimaryLabel: {}, // themed value only
    buttonSecondary: {
      marginHorizontal: space.medium,
    },
    buttonSecondaryLabel: {}, // themed value only
    errorMessage: {
      marginHorizontal: space.small,
    },
    errorMessageIcon: {}, // themed value only
    errorMessageLabel: {}, // themed value only
    fieldContainer: {
      paddingHorizontal: space.small,
    }, // themed value only
    fieldErrorsContainer: {
      paddingHorizontal: space.medium,
      paddingVertical: space.xs,
    },
    fieldError: {
      color: colors.font.error,
      paddingVertical: 1,
    }, // themed value only
    fieldLabel: {}, // themed value only
    fieldStyle: {}, // themed value only
    footer: {}, // themed value only
    formFields: {
      paddingBottom: space.xs,
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
