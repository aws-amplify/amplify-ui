export type FieldValidator = (password: string) => string;

export type MinLengthValidator = (minLength: number) => FieldValidator;

export type ConfirmPasswordValidator = (
  newPassword: string,
  confirmPassword: string
) => string;
