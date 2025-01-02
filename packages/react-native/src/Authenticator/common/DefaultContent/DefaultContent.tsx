import React, { Fragment, useMemo } from 'react';
import { View } from 'react-native';

import { Button, Label, ErrorMessage } from '../../../primitives';
import { TextFieldOptionsType, RadioFieldOptions } from '../../hooks';
import { StrictTheme, useTheme } from '../../../theme';

import { getDefaultStyle } from './styles';
import { DefaultContentProps } from './types';

function useThemedStyles<Style>(getStyle: (theme: StrictTheme) => Style) {
  const theme = useTheme();
  return useMemo(() => getStyle(theme), [getStyle, theme]);
}

export default function DefaultContent<
  FieldsType extends TextFieldOptionsType | RadioFieldOptions,
>({
  body,
  buttons: { primary, links, secondary },
  error,
  fields,
  Footer,
  FormFields,
  isPending,
  Header,
  headerText,
  validationErrors,
}: DefaultContentProps<FieldsType>): JSX.Element {
  const themedStyles = useThemedStyles(getDefaultStyle);

  const linkButtons = useMemo(
    () =>
      links?.length ? (
        <View style={themedStyles.linksContainer}>
          {links.map((button) => (
            <Fragment key={`${button.children}`}>
              <Button {...button} style={themedStyles.link} variant="link" />
            </Fragment>
          ))}
        </View>
      ) : null,
    [links, themedStyles]
  );

  return (
    <>
      <Header style={themedStyles.header}>{headerText}</Header>
      {body ? (
        typeof body === 'string' ? (
          <Label style={themedStyles.body}>{body}</Label>
        ) : (
          body
        )
      ) : null}
      <FormFields
        fieldContainerStyle={themedStyles.fieldContainer}
        fieldErrorsContainer={themedStyles.fieldErrorsContainer}
        fieldErrorStyle={themedStyles.fieldError}
        fieldLabelStyle={themedStyles.fieldLabel}
        fieldStyle={themedStyles.fieldStyle}
        fields={fields}
        isPending={isPending}
        validationErrors={validationErrors}
        style={themedStyles.formFields}
      />
      {error ? (
        <ErrorMessage
          iconStyle={themedStyles.errorMessageIcon}
          labelStyle={themedStyles.errorMessageLabel}
          style={themedStyles.errorMessage}
          testID="amplify__error-message"
        >
          {error}
        </ErrorMessage>
      ) : null}
      <Button
        {...primary}
        variant="primary"
        textStyle={themedStyles.buttonPrimaryLabel}
        style={themedStyles.buttonPrimary}
        testID="amplify__button"
      />
      {secondary ? (
        <Button
          {...secondary}
          textStyle={themedStyles.buttonSecondaryLabel}
          style={themedStyles.buttonSecondary}
        />
      ) : null}
      {linkButtons}
      <Footer style={themedStyles.footer} />
    </>
  );
}
