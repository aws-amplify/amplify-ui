import { DefaultComponents } from '../../Defaults';
import { TextFieldOptionsType } from '../../hooks';

const DefaultFormFields: DefaultComponents<TextFieldOptionsType>[keyof DefaultComponents]['FormFields'] =
  () => null;

DefaultFormFields.displayName = 'FormFields';

export default DefaultFormFields;
