import { ComponentClassName } from '@aws-amplify/ui';

// includes primiitve subcomponent names, like `AlertIcon`
type ComponentClassNameKey = keyof typeof ComponentClassName;

type ComponentNameKey =
  | 'Accordion'
  | 'Alert'
  | 'Autocomplete'
  | 'Badge'
  | 'Breadcrumbs'
  | 'Button'
  | 'Button'
  | 'Card'
  | 'Checkbox'
  | 'CheckboxField'
  | 'Collection'
  | 'PhoneNumberField'
  | 'Divider'
  | 'DropZone'
  | 'Fieldset'
  | 'Flex'
  | 'Grid'
  | 'Heading'
  | 'HighlightMatch'
  | 'Icon'
  | 'Image'
  | 'Input'
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
  | 'Select'
  | 'SliderField'
  | 'SelectField'
  | 'StepperField'
  | 'StorageImage'
  | 'StorageManager'
  | 'SwitchField'
  | 'Table'
  | 'Tabs'
  | 'Text'
  | 'TextAreaField'
  | 'TextField'
  | 'ToggleButton'
  | 'ToggleButtonGroup'
  | 'VisuallyHidden';

interface ComponentMetadata {
  className: string;
  components?: ComponentNameKey[];
  description?: string;
}

type ComponentClassNameItems = {
  [Name in ComponentClassNameKey]: ComponentMetadata;
};

export const ComponentsMetadata: ComponentClassNameItems = {
  Accordion: {
    className: ComponentClassName.Accordion,
    components: ['Accordion'],
    description: 'Top level element that wraps the Accordion primitive',
  },
  AccordionItem: {
    className: ComponentClassName.AccordionItem,
    components: ['Accordion'],
    description: 'Accordion item (containier for header, trigger, and content)',
  },
  AccordionItemContent: {
    className: ComponentClassName.AccordionItemContent,
    components: ['Accordion'],
    description: 'Accordion content container',
  },
  AccordionItemIcon: {
    className: ComponentClassName.AccordionItemIcon,
    components: ['Accordion'],
    description: 'Icon to indicate whether an item is expanded or collapsed',
  },
  AccordionItemTrigger: {
    className: ComponentClassName.AccordionItemTrigger,
    components: ['Accordion'],
    description: 'Accordion item trigger (summary element)',
  },
  Alert: {
    className: ComponentClassName.Alert,
    components: ['Alert'],
    description: 'Top level element that wraps the Alert primitive',
  },
  AlertIcon: {
    className: ComponentClassName.AlertIcon,
    components: ['Alert'],
    description: 'Class applied to Icon component within the Alert primitive',
  },
  AlertHeading: {
    className: ComponentClassName.AlertHeading,
    components: ['Alert'],
    description: 'Class applied to the heading View',
  },
  AlertBody: {
    className: ComponentClassName.AlertBody,
    components: ['Alert'],
    description: 'Class applied to the body View',
  },
  AlertDismiss: {
    className: ComponentClassName.AlertDismiss,
    components: ['Alert'],
    description: 'Class applied to the close Button',
  },
  Autocomplete: {
    className: ComponentClassName.Autocomplete,
    components: ['Autocomplete'],
    description: 'Top level element that wraps the Autocomplete primitive',
  },
  AutocompleteMenu: {
    className: ComponentClassName.AutocompleteMenu,
    components: ['Autocomplete'],
    description: 'Top level element that wraps the dropdown menu',
  },
  AutocompleteMenuEmpty: {
    className: ComponentClassName.AutocompleteMenuEmpty,
    components: ['Autocomplete'],
    description: 'Class applied to the no options slot of menu',
  },
  AutocompleteMenuFooter: {
    className: ComponentClassName.AutocompleteMenuFooter,
    components: ['Autocomplete'],
    description: 'Class applied to menu footer',
  },
  AutocompleteMenuHeader: {
    className: ComponentClassName.AutocompleteMenuHeader,
    components: ['Autocomplete'],
    description: 'Class applied to menu header',
  },
  AutocompleteMenuLoading: {
    className: ComponentClassName.AutocompleteMenuLoading,
    components: ['Autocomplete'],
    description: 'Class applied to the loading slot of menu',
  },
  AutocompleteMenuOption: {
    className: ComponentClassName.AutocompleteMenuOption,
    components: ['Autocomplete'],
    description: 'Class applied to each li option',
  },
  AutocompleteMenuOptions: {
    className: ComponentClassName.AutocompleteMenuOptions,
    components: ['Autocomplete'],
    description: 'Class applied to ul container element',
  },
  Badge: {
    className: ComponentClassName.Badge,
    components: ['Badge'],
    description: 'Top level element that wraps the Badge component',
  },
  Breadcrumbs: {
    className: ComponentClassName.Breadcrumbs,
    components: ['Breadcrumbs'],
    description: 'Top level element that wraps the Breadcrumbs component',
  },
  BreadcrumbsItem: {
    className: ComponentClassName.BreadcrumbsItem,
    components: ['Breadcrumbs'],
    description: 'Each breadcrumb',
  },
  BreadcrumbsLink: {
    className: ComponentClassName.BreadcrumbsLink,
    components: ['Breadcrumbs'],
    description: 'Links used within breadcrumbs',
  },
  BreadcrumbsList: {
    className: ComponentClassName.BreadcrumbsList,
    components: ['Breadcrumbs'],
    description: 'List element within nav',
  },
  BreadcrumbsSeparator: {
    className: ComponentClassName.BreadcrumbsSeparator,
    components: ['Breadcrumbs'],
    description: 'Separator between each breadcrumb',
  },
  Button: {
    className: ComponentClassName.Button,
    components: ['Button'],
    description: 'Top level element that wraps the Button primitive',
  },
  ButtonGroup: { className: ComponentClassName.ButtonGroup },
  ButtonLoaderWrapper: {
    className: ComponentClassName.ButtonLoaderWrapper,
    components: ['Button'],
    description:
      'Class applied to the Loader component within the Button Loading state',
  },
  Card: {
    className: ComponentClassName.Card,
    components: ['Card'],
    description: 'Top level element that wraps the Card primitive',
  },
  Checkbox: {
    className: ComponentClassName.Checkbox,
    components: ['Checkbox'],
    description: 'Top level element that wraps the Checkbox primitive',
  },
  CheckboxButton: {
    className: ComponentClassName.CheckboxButton,
    components: ['Checkbox'],
    description: 'Wrapper for the checked icon within the Checkbox primitive',
  },
  CheckboxIcon: {
    className: ComponentClassName.CheckboxIcon,
    components: ['Checkbox'],
    description:
      'Class applied to the checked icon within the Checkbox primitive',
  },
  CheckboxInput: {
    className: ComponentClassName.CheckboxInput,
    components: ['Checkbox'],
    description:
      'Class applied to the visually hidden checkbox input within the Checkbox primitive',
  },
  CheckboxLabel: {
    className: ComponentClassName.CheckboxLabel,
    components: ['Checkbox'],
    description: 'Class applied to the label within the Checkbox primitive',
  },
  CheckboxField: {
    className: ComponentClassName.CheckboxField,
    components: ['CheckboxField'],
    description: 'Top level element that wraps the CheckboxField primitive',
  },
  Collection: {
    className: ComponentClassName.Collection,
    components: ['Collection'],
    description: 'Top level element that wraps the Collection primitive',
  },
  CollectionItems: {
    className: ComponentClassName.CollectionItems,
    components: ['Collection'],
    description:
      'Class applied to the element that wraps all the items in a collection',
  },
  CollectionSearch: {
    className: ComponentClassName.CollectionSearch,
    components: ['Collection'],
    description:
      'Class applied to the element that wraps the collection search box',
  },
  CollectionPagination: {
    className: ComponentClassName.CollectionPagination,
    components: ['Collection'],
    description:
      'Class applied to the element that wraps the pagination component in a collection',
  },
  CountryCodeSelect: {
    className: ComponentClassName.CountryCodeSelect,
    components: ['PhoneNumberField'],
    description:
      'Class applied to the Dial Code Select within the PhoneNumberField primitive',
  },
  DialCodeSelect: {
    className: ComponentClassName.DialCodeSelect,
    components: ['PhoneNumberField'],
    description:
      'Class applied to the Dial Code Select within the PhoneNumberField primitive',
  },
  Divider: {
    className: ComponentClassName.Divider,
    components: ['Divider'],
    description: 'Top level element that wraps the Divider primitive',
  },
  DividerLabel: {
    className: ComponentClassName.DividerLabel,
    components: ['Divider'],
    description: 'Class applied to the label of the Divider component',
  },
  DropZone: {
    className: ComponentClassName.DropZone,
    components: ['DropZone'],
    description: 'Class applied to the DropZone component',
  },
  Field: { className: ComponentClassName.Field },
  FieldDescription: { className: ComponentClassName.FieldDescription },
  FieldErrorMessage: { className: ComponentClassName.FieldErrorMessage },
  FieldGroup: { className: ComponentClassName.FieldGroup },
  FieldGroupControl: { className: ComponentClassName.FieldGroupControl },
  FieldGroupFieldWrapper: {
    className: ComponentClassName.FieldGroupFieldWrapper,
  },
  FieldGroupOuterEnd: { className: ComponentClassName.FieldGroupOuterEnd },
  FieldGroupOuterStart: { className: ComponentClassName.FieldGroupOuterStart },
  FieldGroupInnerEnd: { className: ComponentClassName.FieldGroupInnerEnd },
  FieldGroupInnerStart: { className: ComponentClassName.FieldGroupInnerStart },
  FieldGroupIcon: { className: ComponentClassName.FieldGroupIcon },
  FieldGroupIconButton: { className: ComponentClassName.FieldGroupIconButton },
  FieldGroupHasInnerEnd: {
    className: ComponentClassName.FieldGroupHasInnerEnd,
  },
  FieldGroupHasInnerStart: {
    className: ComponentClassName.FieldGroupHasInnerStart,
  },
  FieldShowPassword: { className: ComponentClassName.FieldShowPassword },
  Fieldset: {
    className: ComponentClassName.Fieldset,
    components: ['Fieldset'],
    description: 'Top level element that wraps the Fieldset primitive',
  },
  FieldsetLegend: {
    className: ComponentClassName.FieldsetLegend,
    components: ['Fieldset'],
    description: 'Visual label for the Fieldset primitive',
  },
  Flex: {
    className: ComponentClassName.Flex,
    components: ['Flex'],
    description: 'Top level element that wraps the Flex primitive',
  },
  Grid: {
    className: ComponentClassName.Grid,
    components: ['Grid'],
    description: 'Top level element that wraps the Grid primitive',
  },
  Heading: {
    className: ComponentClassName.Heading,
    components: ['Heading'],
    description: 'Top level element that wraps the Heading primitive',
  },
  HighlightMatch: {
    className: ComponentClassName.HighlightMatch,
    components: ['HighlightMatch'],
    description: 'Top level element that wraps the HighlightMatch primitive',
  },
  HighlightMatchHighlighted: {
    className: ComponentClassName.HighlightMatchHighlighted,
    components: ['HighlightMatch'],
    description:
      'Class applied to the highlighted text of the HighlightMatch primitive',
  },
  Icon: {
    className: ComponentClassName.Icon,
    components: ['Icon'],
    description: 'Top level element that wraps the Icon primitive',
  },
  Image: {
    className: ComponentClassName.Image,
    components: ['Image'],
    description: 'Top level element that wraps the Image primitive',
  },
  Input: {
    className: ComponentClassName.Input,
    components: ['Input'],
    description: 'Class applied to the input element',
  },
  Label: {
    className: ComponentClassName.Label,
    components: ['Label'],
    description: 'Class applied to the label element',
  },
  Link: {
    className: ComponentClassName.Link,
    components: ['Link'],
    description: 'Top level element that wraps the Link primitive',
  },
  Loader: {
    className: ComponentClassName.Loader,
    components: ['Loader'],
    description: 'Top level element that wraps the Loader primitive',
  },
  LoaderLabel: {
    className: ComponentClassName.LoaderLabel,
    components: ['Loader'],
    description: 'Class applied to the track of loader',
  },
  MenuContent: {
    className: ComponentClassName.MenuContent,
    components: ['Menu'],
    description: 'Menu content container (Flex)',
  },
  MenuWrapper: {
    className: ComponentClassName.MenuWrapper,
    components: ['Menu'],
    description: 'Menu content wrapper',
  },
  MenuItem: {
    className: ComponentClassName.MenuItem,
    components: ['Menu'],
    description:
      'Menu item button (MenuButton, wrapped in amplify-menu-content class)',
  },
  MenuTrigger: {
    className: ComponentClassName.MenuTrigger,
    components: ['Menu'],
    description:
      'Menu trigger button (MenuButton, not wrapped in amplify-menu-content class)',
  },
  Message: {
    className: ComponentClassName.Message,
    components: ['Message'],
    description: 'Class applied to the root element of the Message',
  },
  MessageIcon: {
    className: ComponentClassName.MessageIcon,
    components: ['Message'],
    description: 'Class applied to Icon component within the Message primitive',
  },
  MessageHeading: {
    className: ComponentClassName.MessageHeading,
    components: ['Message'],
    description: 'Class applied to the heading View',
  },
  MessageBody: {
    className: ComponentClassName.MessageBody,
    components: ['Message'],
    description: 'Class applied to the body View',
  },
  MessageContent: {
    className: ComponentClassName.MessageContent,
    components: ['Message'],
    description:
      'Class applied to the wrappar around heading and children of the Message',
  },
  MessageDismiss: {
    className: ComponentClassName.MessageDismiss,
    components: ['Message'],
    description: 'Class applied to the close Button',
  },
  Pagination: {
    className: ComponentClassName.Pagination,
    components: ['Pagination'],
    description: 'Top level element that wraps the Pagination primitive',
  },
  PaginationItem: {
    className: ComponentClassName.PaginationItem,
    components: ['Pagination'],
    description: 'Class applied to the pagination items',
  },
  PasswordField: {
    className: ComponentClassName.PasswordField,
    components: ['PasswordField'],
    description: 'Top level element that wraps the PasswordField primitive',
  },
  PhoneNumberField: {
    className: ComponentClassName.PhoneNumberField,
    components: ['PhoneNumberField'],
    description: 'Top level element that wraps the PhoneNumberField primitive',
  },
  Placeholder: {
    className: ComponentClassName.Placeholder,
    components: ['Placeholder'],
    description: 'Top level element that wraps the Placeholder primitive',
  },
  Radio: {
    className: ComponentClassName.Radio,
    components: ['RadioGroupField', 'Radio'],
    description: 'Top level element that wraps the Radio primitive',
  },
  RadioButton: {
    className: ComponentClassName.RadioButton,
    components: ['RadioGroupField', 'Radio'],
    description: 'Class applied to the displayed radio button',
  },
  RadioInput: {
    className: ComponentClassName.RadioInput,
    components: ['RadioGroupField', 'Radio'],
    description: 'Class applied to the visually hidden radio input',
  },
  RadioLabel: {
    className: ComponentClassName.RadioLabel,
    components: ['RadioGroupField', 'Radio'],
    description: 'Class applied to the radio label',
  },
  RadioGroupField: {
    className: ComponentClassName.RadioGroupField,
    components: ['RadioGroupField'],
    description: 'Top level element that wraps the RadioGroupField primitive',
  },
  RadioGroup: {
    className: ComponentClassName.RadioGroup,
    components: ['RadioGroupField'],
    description: 'Class applied to the radio group wrapper',
  },
  Rating: {
    className: ComponentClassName.Rating,
    components: ['Rating'],
    description: 'Top level element that wraps the Rating primitive',
  },
  RatingItem: {
    className: ComponentClassName.RatingItem,
    components: ['Rating'],
    description: 'Each element in the Rating primitive',
  },
  RatingIcon: {
    className: ComponentClassName.RatingIcon,
    components: ['Rating'],
    description: 'The icons in the Rating primitive',
  },
  RatingLabel: {
    className: ComponentClassName.RatingLabel,
    components: ['Rating'],
    description: 'Top level element that wraps the Rating primitive',
  },
  ScrollView: {
    className: ComponentClassName.ScrollView,
    components: ['ScrollView'],
    description: 'Top level element that wraps the ScrollView primitive',
  },
  SearchField: {
    className: ComponentClassName.SearchField,
    components: ['SearchField'],
    description: 'Top level element that wraps the SearchField primitive',
  },
  SearchFieldClear: {
    className: ComponentClassName.SearchFieldClear,
    components: ['SearchField'],
    description: 'Class applied to the search field clear button',
  },
  SearchFieldSearch: {
    className: ComponentClassName.SearchFieldSearch,
    components: ['SearchField'],
    description: 'Class applied to the search button',
  },
  Select: {
    className: ComponentClassName.Select,
    components: ['Select', 'SelectField'],
    description: 'Class applied to the select element',
  },
  SelectField: {
    className: ComponentClassName.SelectField,
    components: ['SelectField'],
    description: 'Top level element that wraps the SelectField primitive',
  },
  SelectWrapper: {
    className: ComponentClassName.SelectWrapper,
    components: ['Select', 'SelectField'],
    description: 'Class applied to the select wrapper',
  },
  SelectIcon: {
    className: ComponentClassName.SelectIcon,
    components: ['Select', 'SelectField'],
    description: 'Class applied to the select icon wrapper',
  },
  SliderField: {
    className: ComponentClassName.SliderField,
    components: ['SliderField'],
    description: 'Top level element that wraps the SliderField primitive',
  },
  SliderFieldGroup: {
    className: ComponentClassName.SliderFieldGroup,
    components: ['SliderField'],
    description: 'Class applied to the element that wraps the slider root',
  },
  SliderFieldLabel: {
    className: ComponentClassName.SliderFieldLabel,
    components: ['SliderField'],
    description: 'Class applied to the slider label',
  },
  SliderFieldRange: {
    className: ComponentClassName.SliderFieldRange,
    components: ['SliderField'],
    description: 'Class applied to the filled in portion of the slider track',
  },
  SliderFieldRoot: {
    className: ComponentClassName.SliderFieldRoot,
    components: ['SliderField'],
    description:
      'Class applied to the slider root which wraps the track and thumb',
  },
  SliderFieldThumb: {
    className: ComponentClassName.SliderFieldThumb,
    components: ['SliderField'],
    description: 'Class applied to the slider thumb',
  },
  SliderFieldTrack: {
    className: ComponentClassName.SliderFieldTrack,
    components: ['SliderField'],
    description: 'Class applied to the slider track',
  },
  StepperField: {
    className: ComponentClassName.StepperField,
    components: ['StepperField'],
    description: 'Top level element that wraps the StepperField primitive',
  },
  StepperFieldButtonDecrease: {
    className: ComponentClassName.StepperFieldButtonDecrease,
    components: ['StepperField'],
    description: 'Class applied to the decrease button',
  },
  StepperFieldButtonIncrease: {
    className: ComponentClassName.StepperFieldButtonIncrease,
    components: ['StepperField'],
    description: 'Class applied to the increase button',
  },
  StepperFieldInput: {
    className: ComponentClassName.StepperFieldInput,
    components: ['StepperField'],
    description: 'Class applied to the StepperField input',
  },
  StorageImage: {
    className: ComponentClassName.StorageImage,
    components: ['StorageImage'],
    description: 'Class applied to the img tag',
  },
  StorageManager: {
    className: ComponentClassName.StorageManager,
    components: ['StorageManager'],
  },
  StorageManagerDropZone: {
    className: ComponentClassName.StorageManagerDropZone,
    components: ['StorageManager'],
  },
  StorageManagerDropZoneIcon: {
    className: ComponentClassName.StorageManagerDropZoneIcon,
    components: ['StorageManager'],
  },
  StorageManagerDropZoneText: {
    className: ComponentClassName.StorageManagerDropZoneText,
    components: ['StorageManager'],
  },
  StorageManagerFilePicker: {
    className: ComponentClassName.StorageManagerFilePicker,
    components: ['StorageManager'],
  },
  StorageManagerFile: {
    className: ComponentClassName.StorageManagerFile,
    components: ['StorageManager'],
  },
  StorageManagerFileWrapper: {
    className: ComponentClassName.StorageManagerFileWrapper,
    components: ['StorageManager'],
  },
  StorageManagerFileList: {
    className: ComponentClassName.StorageManagerFileList,
    components: ['StorageManager'],
  },
  StorageManagerFileName: {
    className: ComponentClassName.StorageManagerFileName,
    components: ['StorageManager'],
  },
  StorageManagerLoader: {
    className: ComponentClassName.StorageManagerLoader,
    components: ['StorageManager'],
  },
  StorageManagerFileSize: {
    className: ComponentClassName.StorageManagerFileSize,
    components: ['StorageManager'],
  },
  StorageManagerFileInfo: {
    className: ComponentClassName.StorageManagerFileInfo,
    components: ['StorageManager'],
  },
  StorageManagerFileImage: {
    className: ComponentClassName.StorageManagerFileImage,
    components: ['StorageManager'],
  },
  StorageManagerFileMain: {
    className: ComponentClassName.StorageManagerFileMain,
    components: ['StorageManager'],
  },
  StorageManagerFileStatus: {
    className: ComponentClassName.StorageManagerFileStatus,
    components: ['StorageManager'],
  },
  StorageManagerPreviewer: {
    className: ComponentClassName.StorageManagerPreviewer,
    components: ['StorageManager'],
  },
  StorageManagerPreviewerText: {
    className: ComponentClassName.StorageManagerPreviewerText,
    components: ['StorageManager'],
  },
  StorageManagerPreviewerActions: {
    className: ComponentClassName.StorageManagerPreviewerActions,
    components: ['StorageManager'],
  },
  StorageManagerPreviewerFooter: {
    className: ComponentClassName.StorageManagerPreviewerFooter,
    components: ['StorageManager'],
  },
  SwitchField: {
    className: ComponentClassName.SwitchField,
    components: ['SwitchField'],
    description: 'Top level element that wraps the SwitchField primitive',
  },
  SwitchLabel: {
    className: ComponentClassName.SwitchLabel,
    components: ['SwitchField'],
    description: 'Class applied to the SwitchField label text',
  },
  SwitchThumb: {
    className: ComponentClassName.SwitchThumb,
    components: ['SwitchField'],
    description: 'Class applied to the SwitchField thumb',
  },
  SwitchTrack: {
    className: ComponentClassName.SwitchTrack,
    components: ['SwitchField'],
    description: 'Class applied to the SwitchField track',
  },
  SwitchWrapper: {
    className: ComponentClassName.SwitchWrapper,
    components: ['SwitchField'],
    description:
      'Class applied to the label element that wraps the SwitchField label and track',
  },
  Table: {
    className: ComponentClassName.Table,
    components: ['Table'],
    description: 'Top level element that wraps the Table primitive',
  },
  TableCaption: {
    className: ComponentClassName.TableCaption,
    components: ['Table'],
    description: 'Class applied to the content provided as the caption prop',
  },
  TableBody: {
    className: ComponentClassName.TableBody,
    components: ['Table'],
    description: 'Class applied to TableBody component',
  },
  TableTd: {
    className: ComponentClassName.TableTd,
    components: ['Table'],
    description:
      'Class applied to TableCell component rendered as a <td> element (<TableCell as="td" />)',
  },
  TableTh: {
    className: ComponentClassName.TableTh,
    components: ['Table'],
    description:
      'Class applied to TableCell comopnent rendered as a <th> element (<TableCell as="th" />)',
  },
  TableFoot: {
    className: ComponentClassName.TableFoot,
    components: ['Table'],
    description: 'Class applied to TableFoot component',
  },
  TableHead: {
    className: ComponentClassName.TableHead,
    components: ['Table'],
    description: 'Class applied to TableHead component',
  },
  TableRow: {
    className: ComponentClassName.TableRow,
    components: ['Table'],
    description: 'Class applied to TableRow component',
  },
  Tabs: {
    className: ComponentClassName.Tabs,
    components: ['Tabs'],
    description: 'Top level element that wraps the Tabs primitive',
  },
  TabsItem: {
    className: ComponentClassName.TabsItem,
    components: ['Tabs'],
    description: 'Tab element (button) in a TabPanel',
  },
  TabsList: {
    className: ComponentClassName.TabsList,
    components: ['Tabs'],
    description: 'Top level element that wraps the TabItem primitive',
  },
  TabsPanel: {
    className: ComponentClassName.TabsPanel,
    components: ['Tabs'],
    description: 'Top level element that wraps the TabItem primitive',
  },
  Text: {
    className: ComponentClassName.Text,
    components: ['Text'],
    description: 'Top level element that wraps the Text primitive',
  },
  Textarea: {
    className: ComponentClassName.Textarea,
    components: ['TextAreaField'],
    description: 'Class applied to the text area',
  },
  TextAreaField: {
    className: ComponentClassName.TextAreaField,
    components: ['TextAreaField'],
    description: 'Top level element that wraps the TextAreaField primitive',
  },
  TextField: {
    className: ComponentClassName.TextField,
    components: ['TextField'],
    description: 'Top level element that wraps the TextField primitive',
  },
  ToggleButton: {
    className: ComponentClassName.ToggleButton,
    components: ['ToggleButton'],
    description: 'Top level element that wraps the ToggleButton primitive',
  },
  ToggleButtonGroup: {
    className: ComponentClassName.ToggleButtonGroup,
    components: ['ToggleButton', 'ToggleButtonGroup'],
    description: 'Top level element that wraps the ToggleButtonGroup primitive',
  },
  VisuallyHidden: {
    className: ComponentClassName.VisuallyHidden,
    components: ['VisuallyHidden'],
    description: 'Top level element that wraps the VisuallyHidden primitive',
  },
};
