import React, { Fragment, useMemo } from 'react';
import { View } from 'react-native';

import { Button, ErrorMessage } from '../../../primitives';
import { TextFieldOptionsType, RadioFieldOptions } from '../../hooks';
import { StrictTheme, useTheme } from '../../../theme';

import { getDefaultStyle } from './styles';
import { DefaultContentProps } from './types';

function useThemedStyles<Style>(getStyle: (theme: StrictTheme) => Style) {
  const theme = useTheme();
  return useMemo(() => getStyle(theme), [getStyle, theme]);
}

export default function DefaultContent<
  FieldsType extends TextFieldOptionsType | RadioFieldOptions
>({
  body,
  buttons: { primary, secondary },
  error,
  fields,
  Footer,
  FormFields,
  isPending,
  Header,
  headerText,
}: DefaultContentProps<FieldsType>): JSX.Element {
  const themedStyles = useThemedStyles(getDefaultStyle);

  const secondaryButtons = useMemo(
    () =>
      Array.isArray(secondary) ? (
        <View style={themedStyles.buttonSecondaryContainer}>
          {secondary.map((button) => (
            <Fragment key={`${button.children}`}>
              <Button
                {...button}
                style={themedStyles.buttonSecondary}
                variant="link"
              />
            </Fragment>
          ))}
        </View>
      ) : (
        <Button
          {...secondary}
          style={themedStyles.buttonSecondary}
          variant="link"
        />
      ),
    [secondary, themedStyles]
  );

  return (
    <>
      {headerText ? (
        <Header style={themedStyles.header}>{headerText}</Header>
      ) : (
        <Header />
      )}
      {body ? body : null}
      <FormFields
        fieldContainerStyle={themedStyles.fieldContainerStyle}
        fieldErrorStyle={themedStyles.fieldErrorStyle}
        fieldLabelStyle={themedStyles.fieldLabelStyle}
        fieldStyle={themedStyles.fieldStyle}
        fields={fields}
        isPending={isPending}
        style={themedStyles.formFields}
      />
      {error ? (
        <ErrorMessage
          style={themedStyles.errorMessage}
          labelStyle={themedStyles.errorMessageLabel}
        >
          {error}
        </ErrorMessage>
      ) : null}
      <Button
        {...primary}
        variant="primary"
        textStyle={themedStyles.buttonPrimaryLabel}
        style={themedStyles.buttonPrimary}
      />
      {secondaryButtons}
      <Footer style={themedStyles.footer} />
    </>
  );
}
