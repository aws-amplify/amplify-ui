import { DefaultComponents, TextFieldOptionsType } from '../../Defaults/types';

const DefaultFormFields: DefaultComponents<TextFieldOptionsType>[keyof DefaultComponents]['FormFields'] =
  () => null;

DefaultFormFields.displayName = 'FormFields';

export default DefaultFormFields;
