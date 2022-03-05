import { FormField } from '@aws-amplify/ui';
import { AttributeField } from './AttributeField';

export interface BaseFormFieldsProps {
  formFields: FormField;
}
export function BaseFormFields({ formFields }: BaseFormFieldsProps) {
  return (
    <>
      {Object.entries(formFields).flatMap(([name, options]) => (
        <AttributeField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
