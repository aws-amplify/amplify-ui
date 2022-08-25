type ComponentNameKey =
  | 'Alert'
  | 'Badge'
  | 'Button'
  | 'Button'
  | 'Card'
  | 'Checkbox'
  | 'CheckboxField'
  | 'Collection'
  | 'PhoneNumberField'
  | 'Divider'
  | 'Expander'
  | 'Flex'
  | 'Grid'
  | 'Heading'
  | 'Icon'
  | 'Image'
  | 'Link'
  | 'Loader'
  | 'Menu'
  | 'Pagination'
  | 'PasswordField'
  | 'PhoneNumberField'
  | 'Placeholder'
  | 'Radio'
  | 'RadioGroupField'
  | 'Rating'
  | 'ScrollView'
  | 'SearchField'
  | 'Select'
  | 'SliderField'
  | 'SelectField'
  | 'StepperField'
  | 'SwitchField'
  | 'Table'
  | 'Tabs'
  | 'Text'
  | 'TextAreaField'
  | 'TextField'
  | 'ToggleButton'
  | 'ToggleButtonGroup'
  | 'VisuallyHidden';

type ComponentClassNameKey =
  | 'Alert'
  | 'AlertIcon'
  | 'AlertHeading'
  | 'AlertBody'
  | 'AlertDismiss'
  | 'Badge'
  | 'Button'
  | 'ButtonGroup'
  | 'ButtonLoaderWrapper'
  | 'Card'
  | 'Checkbox'
  | 'CheckboxButton'
  | 'CheckboxIcon'
  | 'CheckboxInput'
  | 'CheckboxLabel'
  | 'CheckboxField'
  | 'Collection'
  | 'CollectionItems'
  | 'CollectionSearch'
  | 'CollectionPagination'
  | 'CountryCodeSelect'
  | 'DialCodeSelect'
  | 'Divider'
  | 'DividerLabel'
  | 'Expander'
  | 'ExpanderContent'
  | 'ExpanderContentText'
  | 'ExpanderHeader'
  | 'ExpanderIcon'
  | 'ExpanderItem'
  | 'ExpanderTrigger'
  | 'Field'
  | 'FieldDescription'
  | 'FieldErrorMessage'
  | 'FieldGroup'
  | 'FieldGroupControl'
  | 'FieldGroupOuterEnd'
  | 'FieldGroupOuterStart'
  | 'FieldGroupInnerEnd'
  | 'FieldGroupInnerStart'
  | 'FieldGroupIcon'
  | 'FieldGroupIconButton'
  | 'FieldGroupHasInnerEnd'
  | 'FieldGroupHasInnerStart'
  | 'FieldShowPassword'
  | 'FieldGroupFieldWrapper'
  | 'Flex'
  | 'Grid'
  | 'Heading'
  | 'Icon'
  | 'Image'
  | 'Input'
  | 'Label'
  | 'Link'
  | 'Loader'
  | 'LoaderDeterminate'
  | 'LoaderPercentageText'
  | 'MenuContent'
  | 'MenuItem'
  | 'MenuTrigger'
  | 'Pagination'
  | 'PaginationItemButton'
  | 'PaginationItemCurrent'
  | 'PaginationItemEllipsis'
  | 'PasswordField'
  | 'PhoneNumberField'
  | 'Placeholder'
  | 'Radio'
  | 'RadioButton'
  | 'RadioInput'
  | 'RadioLabel'
  | 'RadioGroupField'
  | 'RadioGroup'
  | 'Rating'
  | 'ScrollView'
  | 'SearchField'
  | 'SearchFieldClear'
  | 'SearchFieldSearch'
  | 'Select'
  | 'SelectField'
  | 'SelectWrapper'
  | 'SelectIconWrapper'
  | 'SliderField'
  | 'SliderFieldGroup'
  | 'SliderFieldLabel'
  | 'SliderFieldRange'
  | 'SliderFieldRoot'
  | 'SliderFieldThumb'
  | 'SliderFieldTrack'
  | 'StepperField'
  | 'StepperFieldButtonDecrease'
  | 'StepperFieldButtonIncrease'
  | 'StepperFieldInput'
  | 'SwitchField'
  | 'SwitchLabel'
  | 'SwitchThumb'
  | 'SwitchTrack'
  | 'SwitchWrapper'
  | 'Table'
  | 'TableCaption'
  | 'TableBody'
  | 'TableTd'
  | 'TableTh'
  | 'TableFoot'
  | 'TableHead'
  | 'TableRow'
  | 'Tabs'
  | 'TabItems'
  | 'Text'
  | 'Textarea'
  | 'TextAreaField'
  | 'TextField'
  | 'ToggleButton'
  | 'ToggleButtonGroup'
  | 'VisuallyHidden';

export enum ComponentClassName {
  Alert = 'amplify-alert',
  AlertIcon = 'amplify-alert__icon',
  AlertHeading = 'amplify-alert__heading',
  AlertBody = 'amplify-alert__body',
  AlertDismiss = 'amplify-alert__dismiss',
  Badge = 'amplify-badge',
  Button = 'amplify-button',
  ButtonGroup = 'amplify-buttongroup',
  ButtonLoaderWrapper = 'amplify-button__loader-wrapper',
  Card = 'amplify-card',
  Checkbox = 'amplify-checkbox',
  CheckboxButton = 'amplify-checkbox__button',
  CheckboxIcon = 'amplify-checkbox__icon',
  CheckboxInput = 'amplify-checkbox__input',
  CheckboxLabel = 'amplify-checkbox__label',
  CheckboxField = 'amplify-checkboxfield',
  Collection = 'amplify-collection',
  CollectionItems = 'amplify-collection-items',
  CollectionSearch = 'amplify-collection-search',
  CollectionPagination = 'amplify-collection-pagination',
  CountryCodeSelect = 'amplify-countrycodeselect',
  DialCodeSelect = 'amplify-dialcodeselect',
  Divider = 'amplify-divider',
  DividerLabel = 'amplify-divider--label',
  Expander = 'amplify-expander',
  ExpanderContent = 'amplify-expander__content',
  ExpanderContentText = 'amplify-expander__content__text',
  ExpanderHeader = 'amplify-expander__header',
  ExpanderIcon = 'amplify-expander__icon',
  ExpanderItem = 'amplify-expander__item',
  ExpanderTrigger = 'amplify-expander__trigger',
  Field = 'amplify-field',
  FieldDescription = 'amplify-field__description',
  FieldErrorMessage = 'amplify-field__error-message',
  FieldGroup = 'amplify-field-group',
  FieldGroupControl = 'amplify-field-group__control',
  FieldGroupOuterEnd = 'amplify-field-group__outer-end',
  FieldGroupOuterStart = 'amplify-field-group__outer-start',
  FieldGroupInnerEnd = 'amplify-field-group__inner-end',
  FieldGroupInnerStart = 'amplify-field-group__inner-start',
  FieldGroupIcon = 'amplify-field-group__icon',
  FieldGroupIconButton = 'amplify-field-group__icon-button',
  FieldGroupHasInnerEnd = 'amplify-field-group--has-inner-end',
  FieldGroupHasInnerStart = 'amplify-field-group--has-inner-start',
  FieldShowPassword = 'amplify-field__show-password',
  FieldGroupFieldWrapper = 'amplify-field-group__field-wrapper',
  Flex = 'amplify-flex',
  Grid = 'amplify-grid',
  Heading = 'amplify-heading',
  Icon = 'amplify-icon',
  Image = 'amplify-image',
  Input = 'amplify-input',
  Label = 'amplify-label',
  Link = 'amplify-link',
  Loader = 'amplify-loader',
  LoaderDeterminate = 'amplify-loader--determinate',
  LoaderPercentageText = 'amplify-loader__percentage-text',
  MenuContent = 'amplify-menu-content',
  MenuItem = 'amplify-menu-content__item',
  MenuTrigger = 'amplify-menu-trigger',
  Pagination = 'amplify-pagination',
  PaginationItemButton = 'amplify-pagination__item-button',
  PaginationItemCurrent = 'amplify-pagination__item-current',
  PaginationItemEllipsis = 'amplify-pagination__item-ellipsis',
  PasswordField = 'amplify-passwordfield',
  PhoneNumberField = 'amplify-phonenumberfield',
  Placeholder = 'amplify-placeholder',
  Radio = 'amplify-radio',
  RadioButton = 'amplify-radio__button',
  RadioInput = 'amplify-radio__input',
  RadioLabel = 'amplify-radio__label',
  RadioGroupField = 'amplify-radiogroupfield',
  RadioGroup = 'amplify-radiogroup',
  Rating = 'amplify-rating',
  ScrollView = 'amplify-scrollview',
  SearchField = 'amplify-searchfield',
  SearchFieldClear = 'amplify-searchfield__clear',
  SearchFieldSearch = 'amplify-searchfield__search',
  Select = 'amplify-select',
  SelectField = 'amplify-selectfield',
  SelectWrapper = 'amplify-select__wrapper',
  SelectIconWrapper = 'amplify-select__icon-wrapper',
  SliderField = 'amplify-sliderfield',
  SliderFieldGroup = 'amplify-sliderfield__group',
  SliderFieldLabel = 'amplify-sliderfield__label',
  SliderFieldRange = 'amplify-sliderfield__range',
  SliderFieldRoot = 'amplify-sliderfield__root',
  SliderFieldThumb = 'amplify-sliderfield__thumb',
  SliderFieldTrack = 'amplify-sliderfield__track',
  StepperField = 'amplify-stepperfield',
  StepperFieldButtonDecrease = 'amplify-stepperfield__button--decrease',
  StepperFieldButtonIncrease = 'amplify-stepperfield__button--increase',
  StepperFieldInput = 'amplify-stepperfield__input',
  SwitchField = 'amplify-switchfield',
  SwitchLabel = 'amplify-switch-label',
  SwitchThumb = 'amplify-switch-thumb',
  SwitchTrack = 'amplify-switch-track',
  SwitchWrapper = 'amplify-switch__wrapper',
  Table = 'amplify-table',
  TableCaption = 'amplify-table__caption',
  TableBody = 'amplify-table__body',
  TableTd = 'amplify-table__td',
  TableTh = 'amplify-table__th',
  TableFoot = 'amplify-table__foot',
  TableHead = 'amplify-table__head',
  TableRow = 'amplify-table__row',
  Tabs = 'amplify-tabs',
  TabItems = 'amplify-tabs-item',
  Text = 'amplify-text',
  Textarea = 'amplify-textarea',
  TextAreaField = 'amplify-textareafield',
  TextField = 'amplify-textfield',
  ToggleButton = 'amplify-togglebutton',
  ToggleButtonGroup = 'amplify-togglebuttongroup',
  VisuallyHidden = 'amplify-visually-hidden',
}

interface ComponentClassNameMetadata {
  className: ComponentClassName;
  components?: ComponentNameKey[];
  description?: string;
}

export type ComponentClassNameItems = {
  [Name in ComponentClassNameKey]: ComponentClassNameMetadata;
};

export type ComponentClassNames = {
  [Name in ComponentClassNameKey]: ComponentClassNameMetadata['className'];
};
