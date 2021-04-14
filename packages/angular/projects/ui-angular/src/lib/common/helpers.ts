import { AbstractControl } from '@angular/forms';
import { AttributeInfoProvider } from './types';

export const getAttributeMap: AttributeInfoProvider = () => ({
  // TODO: Replace this with I18n translations
  username: {
    label: 'Username',
    placeholder: 'Enter your username'
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your password'
  },
  email: {
    label: 'Email',
    placeholder: 'Enter your email'
  },
  phone_number: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number'
  }
});

export const mapInputErrors = (controls: Record<string, AbstractControl>) => {
  const errors = {};
  for (const [inputName, control] of Object.entries(controls)) {
    errors[inputName] = control.errors;
  }
  return errors;
};
