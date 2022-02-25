import {
  ActorContextWithForms,
  authInputAttributes,
  getActorContext,
  translate,
  isSupportedAuthField,
} from '@aws-amplify/ui';
import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';
import { useAuthenticator } from '../hooks/useAuthenticator';

export function AttributeField({ name, ...passedAttrs }) {
  const { _state } = useAuthenticator();
  const { country_code } = getActorContext(_state) as ActorContextWithForms;

  if (!isSupportedAuthField(name)) {
    console.debug(
      `Authenticator does not have a default implementation for ${name}. Customize Authenticator.SignUp.FormFields to add your own.`
    );
    return null;
  }

  const defaultAttrs = authInputAttributes[name];

  // merged passed attributes with default attributes
  const attrs = { ...defaultAttrs, ...passedAttrs } as Record<string, string>;

  // "autocomplete" is "autoComplete" in React:
  if (!!attrs.autocomplete) {
    attrs.autoComplete = attrs.autoComplete || attrs.autocomplete;
    delete attrs.autocomplete;
  }

  const label = translate<string>(attrs.label);
  const placeholder = translate<string>(attrs.placeholder);

  if (name === 'phone_number') {
    return (
      <PhoneNumberField
        label={label}
        placeholder={placeholder}
        defaultCountryCode={country_code}
        isRequired
        key="phone"
        name="phone"
        labelHidden
        {...attrs}
      />
    );
  } else if (name === 'password') {
    return (
      <PasswordField
        label={label}
        placeholder={placeholder}
        isRequired
        labelHidden
        name="password"
        key={name}
        {...attrs}
      />
    );
  } else {
    return (
      <TextField
        label={label}
        placeholder={placeholder}
        isRequired
        labelHidden
        key={name}
        {...attrs}
      />
    );
  }
}
