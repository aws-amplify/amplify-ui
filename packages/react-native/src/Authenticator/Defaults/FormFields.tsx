import { DefaultComponents, TextFieldOptionsType } from './types';

export const DefaultFormFields: DefaultComponents<TextFieldOptionsType>[keyof DefaultComponents]['FormFields'] =
  () => null;
