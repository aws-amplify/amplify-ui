export type PasswordValidator = (password: string) => string;

export type MinLengthValidator = (minLength: number) => PasswordValidator;

export type ConfirmPasswordValidator = (
  newPassword: string,
  confirmPassword: string
) => string;
