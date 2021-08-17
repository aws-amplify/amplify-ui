export interface ISignUpField {
  label: string;
  key: string;
  placeholder: string;
  required: boolean;
  displayOrder: number;
  invalid?: boolean;
  custom?: boolean;
  type?: string;
}
export declare const signUpWithUsernameFields: (
  | {
      label: string;
      key: string;
      required: boolean;
      placeholder: string;
      displayOrder: number;
      type?: undefined;
    }
  | {
      label: string;
      key: string;
      required: boolean;
      placeholder: string;
      type: string;
      displayOrder: number;
    }
)[];
export declare const signUpWithEmailFields: ISignUpField[];
export declare const signUpWithPhoneNumberFields: ISignUpField[];
