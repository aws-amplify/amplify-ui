import { SignUpAttribute } from '../../../types';
import {
  getFormDataFromEvent,
  setFormOrder,
  isAuthFieldWithDefaults,
  getErrors,
} from '../form';

describe('getFormDataFromEvent', () => {
  it('should return form data from event', () => {
    const mockEvent: Event = {
      target: document.createElement('form'),
    } as unknown as Event;

    const form = mockEvent.target as HTMLFormElement;
    const usernameInput = document.createElement('input');
    usernameInput.name = 'username';
    usernameInput.value = 'testuser';
    form.appendChild(usernameInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.value = 'testpassword';
    form.appendChild(passwordInput);

    // Call getFormDataFromEvent and check output
    const formData = getFormDataFromEvent(mockEvent);

    expect(formData).toEqual({
      username: 'testuser',
      password: 'testpassword',
    });
  });
});
describe('setFormOrder', () => {
  it('should return correct order when no order property present', () => {
    const formFields = {
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
      firstName: {
        label: 'First Name',
        placeholder: 'Enter your first name',
      },
    };
    const fieldNames = [
      'email',
      'password',
      'firstName',
    ] as Array<SignUpAttribute>;
    const expected = ['email', 'password', 'firstName'];
    const result = setFormOrder(formFields, fieldNames);
    expect(result).toEqual(expected);
  });

  it('should return correct order when order property present', () => {
    const formFields = {
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
        order: 2,
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
        order: 3,
      },
      firstName: {
        label: 'First Name',
        placeholder: 'Enter your first name',
        order: 1,
      },
    };
    const fieldNames = [
      'email',
      'password',
      'firstName',
    ] as Array<SignUpAttribute>;
    const expected = ['firstName', 'email', 'password'];
    const result = setFormOrder(formFields, fieldNames);
    expect(result).toEqual(expected);
  });
});

describe('isAuthFieldWithDefaults', () => {
  it('should return true for valid auth field with defaults', () => {
    const field = 'email';
    expect(isAuthFieldWithDefaults(field)).toBe(true);
  });

  it('should return false for non-auth fields', () => {
    const field = 'firstName';
    expect(isAuthFieldWithDefaults(field)).toBe(false);
  });

  it('should return false for invalid auth fields', () => {
    const field = 'invalidField';
    expect(isAuthFieldWithDefaults(field)).toBe(false);
  });
});

describe('getErrors', () => {
  it('should return null for falsy values', () => {
    expect(getErrors(null)).toBeNull();
    expect(getErrors(undefined)).toBeNull();
    expect(getErrors('')).toBeNull();
  });

  it('should return an array with a single element for a string', () => {
    expect(getErrors('error message')).toEqual(['error message']);
  });

  it('should return the input array for an array of strings', () => {
    const errors = ['error message 1', 'error message 2'];
    expect(getErrors(errors)).toEqual(errors);
  });
});
