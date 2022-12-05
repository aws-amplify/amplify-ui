import { Logger } from 'aws-amplify';
import { TypedField } from '../../types';

import {
  getRouteTypedFields,
  getSanitizedRadioFields,
  getSanitizedTextFields,
} from '../utils';

const warnSpy = jest.spyOn(Logger.prototype, 'warn');

const idle = 'idle';
const signIn = 'signIn';
const verifyUser = 'verifyUser';

const passwordField = {
  type: 'password',
  name: 'password',
  label: 'Password',
  required: true,
};
const phoneField = {
  name: 'phonenumber',
  type: 'tel',
};
const textField = { order: 3, name: 'username', isRequired: true };

const radioField = { type: 'radio', name: 'email', value: 'hello@world.com' };

describe('getSanitizedTextFields', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the expected values in the happy path', () => {
    const fields: TypedField[] = [{ name: 'test', type: 'default' }];
    const output = getSanitizedTextFields(fields, 'SignIn');

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual(fields);
  });

  it('logs a warning and ignores the field when name is missing', () => {
    const validField: TypedField = { name: 'test', type: 'default' };
    const fields: TypedField[] = [
      validField,
      { type: 'password', label: 'Password' } as TypedField,
    ];

    const output = getSanitizedTextFields(fields, 'SignIn');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Each field must have a name. field has been ignored.'
    );

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([validField]);
  });

  it('logs a warning and ignores the field when type is radio', () => {
    const validField: TypedField = { name: 'test', type: 'default' };
    const fields: TypedField[] = [
      validField,
      { name: 'Phone Number', type: 'radio', value: 'value' },
    ];

    const output = getSanitizedTextFields(fields, 'SignIn');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'SignIn component does not support radio fields. field has been ignored.'
    );

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([validField]);
  });

  it('logs a warning and ignores the field when name is a duplicate', () => {
    const validField: TypedField = { name: 'test', type: 'default' };
    const fields: TypedField[] = [
      validField,
      { name: 'test', type: 'password' },
    ];

    const output = getSanitizedTextFields(fields, 'SignIn');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Each field name must be unique. field with duplicate name of test has been ignored.'
    );

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([validField]);
  });
});

describe('getSanitizedRadioFields', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('logs a warning and ignores the field when not a radio field', () => {
    const validField: TypedField = {
      name: 'email',
      type: 'radio',
      value: 'value',
    };
    const fields: TypedField[] = [
      validField,
      { type: 'password', value: 'value' } as TypedField,
    ];

    const output = getSanitizedRadioFields(fields, 'VerifyUser');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'VerifyUser component does not support text fields. field with type password has been ignored.'
    );

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([validField]);
  });

  it('logs a warning and ignores the field when value is missing.', () => {
    const validField: TypedField = {
      name: 'email',
      type: 'radio',
      value: 'value',
    };
    const fields: TypedField[] = [
      validField,
      { name: 'phone_number', type: 'radio' } as TypedField,
    ];

    const output = getSanitizedRadioFields(fields, 'VerifyUser');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Each radio field must have a value. field has been ignored.'
    );

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([validField]);
  });

  it('logs a warning and ignores the field when a duplicate value is found.', () => {
    const validField: TypedField = {
      name: 'email',
      type: 'radio',
      value: 'testValue',
    };
    const fields: TypedField[] = [
      validField,
      { name: 'email', type: 'radio', value: 'testValue' } as TypedField,
    ];

    const output = getSanitizedRadioFields(fields, 'VerifyUser');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Each radio field value must be unique. field with duplicate value of testValue has been ignored.'
    );

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([validField]);
  });
});

describe('getRouteTypedFields', () => {
  it('returns the expected value for a non-component route', () => {
    const fields = getRouteTypedFields({ fields: [], route: idle });

    expect(fields).toStrictEqual([]);
    expect(fields).toHaveLength(0);
  });

  it('returns the expected result for the verifyUser route', () => {
    const fields = getRouteTypedFields({
      fields: [radioField],
      route: verifyUser,
    });

    expect(fields).toStrictEqual([radioField]);
  });

  it('returns the expected value for varied fields', () => {
    const fields = getRouteTypedFields({
      fields: [passwordField, phoneField, textField],
      route: signIn,
    });

    const expected = [
      passwordField,
      {
        name: phoneField.name,
        type: 'phone',
      },
      {
        name: textField.name,
        required: textField.isRequired,
        type: 'default',
      },
    ];

    expect(fields).toStrictEqual(expected);
  });
});
