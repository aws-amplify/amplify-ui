import { translate } from '../../../i18n/translations';
import { FormFields } from '../../../types';

export const applyTranslation = (formFields: FormFields): FormFields => {
  const newFormFields = { ...formFields };
  for (const [name, options] of Object.entries(formFields)) {
    const { label, placeholder } = options;

    newFormFields[name] = {
      ...options,
      label: label ? translate<string>(label) : undefined,
      placeholder: placeholder ? translate<string>(placeholder) : undefined,
    };
  }
  return newFormFields;
};
