import {
  getActorContext,
  LoginMechanism,
  SignUpAttribute,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';
import { useAuthenticator } from '..';
import { PhoneNumberField, TextField } from '../../..';

type AttributeFieldProps = {
  name: LoginMechanism | SignUpAttribute;
};

export function AttributeField({ name, ...attrs }: AttributeFieldProps) {
  const { _state } = useAuthenticator();
  const { country_code, formValues } = getActorContext(_state) as SignUpContext;

  // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
  switch (name) {
    case 'birthdate':
      return (
        <TextField
          autoComplete="bday"
          key={name}
          isRequired
          label={translate('Birthdate')}
          name={name}
          placeholder={translate('Birthdate')}
          type="date"
          {...attrs}
        />
      );

    case 'email':
      return (
        <TextField
          autoComplete="email"
          defaultValue={formValues.email ?? null}
          key={name}
          isRequired
          label={translate('Email')}
          labelHidden
          name={name}
          placeholder={translate('Email')}
          type="email"
          {...attrs}
        />
      );

    case 'family_name':
      return (
        <TextField
          autoComplete="family-name"
          key={name}
          isRequired
          label={translate('Family Name')}
          name={name}
          placeholder={translate('Family Name')}
          {...attrs}
        />
      );

    case 'given_name':
      return (
        <TextField
          autoComplete="given-name"
          key={name}
          isRequired
          label={translate('Given Name')}
          name={name}
          placeholder={translate('Given Name')}
          {...attrs}
        />
      );

    case 'middle_name':
      return (
        <TextField
          autoComplete="additional-name"
          key={name}
          isRequired
          label={translate('Middle Name')}
          name={name}
          placeholder={translate('Middle Name')}
          {...attrs}
        />
      );

    case 'name':
      return (
        <TextField
          autoComplete="name"
          key={name}
          isRequired
          label={translate('Name')}
          name={name}
          placeholder={translate('Name')}
          {...attrs}
        />
      );

    case 'nickname':
      return (
        <TextField
          key={name}
          isRequired
          label={translate('Nickname')}
          name={name}
          placeholder={translate('Nickname')}
          {...attrs}
        />
      );

    case 'phone_number':
      return (
        <>
          <input
            key="phone_number"
            name="phone_number"
            readOnly
            type="hidden"
            value={`${formValues.country_code ?? ''}${formValues.phone ?? ''}`}
          />

          <PhoneNumberField
            autoComplete="tel"
            countryCodeName="country_code"
            defaultCountryCode={country_code}
            // errorMessage={error}
            isRequired
            key="phone"
            label={translate('Phone Number')}
            labelHidden
            name="phone"
            placeholder={translate('Phone Number')}
            {...attrs}
          />
        </>
      );

    case 'preferred_username':
      return (
        <TextField
          isRequired
          key={name}
          label={translate('Preferred Username')}
          name={name}
          placeholder={translate('Preferred Username')}
          required
          {...attrs}
        />
      );

    case 'profile':
      return (
        <TextField
          autoComplete="url"
          isRequired
          key={name}
          label={translate('Profile')}
          name={name}
          placeholder={translate('Profile')}
          type="url"
          {...attrs}
        />
      );

    case 'website':
      return (
        <TextField
          autoComplete="url"
          isRequired
          key={name}
          label={translate('Website')}
          name="website"
          placeholder={translate('Website')}
          type="url"
          {...attrs}
        />
      );

    case 'address':
    case 'gender':
    case 'locale':
    case 'picture':
    case 'updated_at':
    case 'zoneinfo':
    default:
      // There's a `custom:*` attribute or one we don't already have an implementation for
      console.debug(
        `Authenticator does not have a default implementation for ${name}. Customize Authenticator.SignUp.FormFields to add your own.`
      );
  }
}
