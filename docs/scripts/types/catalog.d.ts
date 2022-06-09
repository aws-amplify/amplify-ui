export type ComponentName =
  | 'Alert'
  | 'Badge'
  | 'Button'
  | 'ButtonGroup'
  | 'Card'
  | 'CheckboxField'
  | 'Collection'
  | 'Divider'
  | 'Expander'
  | 'ExpanderItem'
  | 'FieldGroupIcon'
  | 'FieldGroupIconButton'
  | 'Flex'
  | 'Grid'
  | 'Heading'
  | 'Icon'
  | 'Image'
  | 'Link'
  | 'Loader'
  | 'Menu'
  | 'MenuButton'
  | 'MenuItem'
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
  | 'SwitchField'
  | 'Tabs'
  | 'TabItem'
  | 'Text'
  | 'TextAreaField'
  | 'TextField'
  | 'ToggleButton'
  | 'ToggleButtonGroup'
  | 'View'
  | 'VisuallyHidden'
  | 'Table'
  | 'TableBody'
  | 'TableCell'
  | 'TableFoot'
  | 'TableHead'
  | 'TableRow';
export type SharedCategory = 'Base' | 'Style' | 'Flex' | 'Grid' | 'Responsive';
export type Category = ComponentName | SharedCategory;
export type Property = {
  name: string;
  type: string;
  description: string;
  category: Category;
};
export type Properties = Record<string, Property>;

export type Catalog = Record<ComponentName, Record<'properties', Properties>>;
