import { SortedFormFields } from '@aws-amplify/ui';
import { FormField } from './FormField';

export interface BaseFormFieldsProps {
  /** Sorted formFields array */
  formFields: SortedFormFields;
}
export function BaseFormFields({ formFields }: BaseFormFieldsProps) {
  return (
    <>
      {formFields.flatMap(([name, options]) => (
        <FormField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
