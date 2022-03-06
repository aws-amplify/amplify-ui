import { SortedFormFields } from '@aws-amplify/ui';
import { AttributeField } from './AttributeField';

export interface BaseFormFieldsProps {
  formFields: SortedFormFields;
}
export function BaseFormFields({ formFields }: BaseFormFieldsProps) {
  console.log(formFields);
  return (
    <>
      {formFields.flatMap(([name, options]) => (
        <AttributeField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
