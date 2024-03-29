import { Category } from './catalog';

export type TypeFileName =
  | 'Alert'
  | 'Badge'
  | 'Base'
  | 'Button'
  | 'ButtonGroup'
  | 'Card'
  | 'CheckboxField'
  | 'Collection'
  | 'Datastore'
  | 'Divider'
  | 'Expander'
  | 'Field'
  | 'FieldGroup'
  | 'FieldGroupIcon'
  | 'Flex'
  | 'Heading'
  | 'Icon'
  | 'Input'
  | 'Image'
  | 'Label'
  | 'Link'
  | 'Loader'
  | 'Menu'
  | 'Message'
  | 'Pagination'
  | 'PasswordField'
  | 'PhoneNumberField'
  | 'Placeholder'
  | 'Radio'
  | 'RadioGroupField'
  | 'Rating'
  | 'ScrollView'
  | 'SearchField'
  | 'SelectField'
  | 'SliderField'
  | 'StepperField'
  | 'Style'
  | 'SwitchField'
  | 'Table'
  | 'Tabs'
  | 'Text'
  | 'TextArea'
  | 'TextAreaField'
  | 'TextField'
  | 'ToggleButton'
  | 'ToggleButtonGroup'
  | 'View'
  | 'VisuallyHidden'
  | 'Grid';

export type TypeFileData = Map<string, Map<string, string | boolean | object>>;
export type AllTypeFileData = Map<TypeFileName, TypeFileData>;
export type TypeData = Map<string, string | boolean | { description: string }>;
