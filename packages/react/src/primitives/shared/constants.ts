import { ComponentClassName } from '@aws-amplify/ui';
import { ThemeStylePropKey, ThemeTokenKey } from '../types/theme';
import {
  ComponentClassNames as ComponentClassNamesType,
  ComponentClassNameItems,
} from './types';

/**
 * @internal May be removed in a future release
 */
export const ComponentClassObject: ComponentClassNameItems = {
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
  Expander: {
    className: ComponentClassName.Expander,
    components: ['Expander'],
    description: 'Top level element that wraps the Expander primitive',
  },
  ExpanderContent: {
    className: ComponentClassName.ExpanderContent,
    components: ['Expander'],
    description: 'Expander content container',
  },
  ExpanderContentText: {
    className: ComponentClassName.ExpanderContentText,
    components: ['Expander'],
    description: 'Expander content text',
  },
  ExpanderHeader: {
    className: ComponentClassName.ExpanderHeader,
    components: ['Expander'],
    description: 'Expander item header',
  },
  ExpanderIcon: {
    className: ComponentClassName.ExpanderIcon,
    components: ['Expander'],
    description: 'Icon to indicate whether an item is expanded or collapsed',
  },
  ExpanderItem: {
    className: ComponentClassName.ExpanderItem,
    components: ['Expander'],
    description: 'Expander item(containier for header, trigger, and content)',
  },
  ExpanderTrigger: {
    className: ComponentClassName.ExpanderTrigger,
    components: ['Expander'],
    description: 'Expander item trigger(button)',
  },
  Field: { className: ComponentClassName.Field },
  FieldDescription: { className: ComponentClassName.FieldDescription },
  FieldErrorMessage: { className: ComponentClassName.FieldErrorMessage },
  FieldGroup: { className: ComponentClassName.FieldGroup },
  FieldGroupControl: { className: ComponentClassName.FieldGroupControl },
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
  FieldGroupFieldWrapper: {
    className: ComponentClassName.FieldGroupFieldWrapper,
  },
  FileUploaderDropZone: {
    className: ComponentClassName.FileUploaderDropZone,
    components: ['FileUploader'],
  },
  FileUploaderDropZoneIcon: {
    className: ComponentClassName.FileUploaderDropZoneIcon,
    components: ['FileUploader'],
  },
  FileUploaderDropZoneText: {
    className: ComponentClassName.FileUploaderDropZoneText,
    components: ['FileUploader'],
  },
  FileUploaderDropZoneButton: {
    className: ComponentClassName.FileUploaderDropZoneButton,
    components: ['FileUploader'],
  },
  FileUploaderFile: {
    className: ComponentClassName.FileUploaderFile,
    components: ['FileUploader'],
  },
  FileUploaderFileName: {
    className: ComponentClassName.FileUploaderFileName,
    components: ['FileUploader'],
  },
  FileUploaderLoader: {
    className: ComponentClassName.FileUploaderLoader,
    components: ['FileUploader'],
  },
  FileUploaderFileSize: {
    className: ComponentClassName.FileUploaderFileSize,
    components: ['FileUploader'],
  },
  FileUploaderFileInfo: {
    className: ComponentClassName.FileUploaderFileInfo,
    components: ['FileUploader'],
  },
  FileUploaderFileImage: {
    className: ComponentClassName.FileUploaderFileImage,
    components: ['FileUploader'],
  },
  FileUploaderFileMain: {
    className: ComponentClassName.FileUploaderFileMain,
    components: ['FileUploader'],
  },
  FileUploaderFileStatus: {
    className: ComponentClassName.FileUploaderFileStatus,
    components: ['FileUploader'],
  },
  FileUploaderPreviewer: {
    className: ComponentClassName.FileUploaderPreviewer,
    components: ['FileUploader'],
  },
  FileUploaderPreviewerText: {
    className: ComponentClassName.FileUploaderPreviewerText,
    components: ['FileUploader'],
  },
  FileUploaderPreviewerBody: {
    className: ComponentClassName.FileUploaderPreviewerBody,
    components: ['FileUploader'],
  },
  FileUploaderPreviewerFooter: {
    className: ComponentClassName.FileUploaderPreviewerFooter,
    components: ['FileUploader'],
  },
  FileUploaderPreviewerFooterActions: {
    className: ComponentClassName.FileUploaderPreviewerFooterActions,
    components: ['FileUploader'],
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
  Input: { className: ComponentClassName.Input },
  Label: { className: ComponentClassName.Label },
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
  LoaderDeterminate: {
    className: ComponentClassName.LoaderDeterminate,
    components: ['Loader'],
    description: 'Class applied to a determinate loader',
  },
  LoaderPercentageText: {
    className: ComponentClassName.LoaderPercentageText,
    components: ['Loader'],
    description: 'Class applied to the percentage text of loader',
  },
  MenuContent: {
    className: ComponentClassName.MenuContent,
    components: ['Menu'],
    description: 'Menu content container (Flex)',
  },
  MenuContentWrapper: {
    className: ComponentClassName.MenuContentWrapper,
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
  Pagination: {
    className: ComponentClassName.Pagination,
    components: ['Pagination'],
    description: 'Top level element that wraps the Pagination primitive',
  },
  PaginationItemButton: {
    className: ComponentClassName.PaginationItemButton,
    components: ['Pagination'],
    description: 'Class applied to the pagination buttons',
  },
  PaginationItemCurrent: {
    className: ComponentClassName.PaginationItemCurrent,
    components: ['Pagination'],
    description: 'Class applied to the currently selected pagination button',
  },
  PaginationItemEllipsis: {
    className: ComponentClassName.PaginationItemEllipsis,
    components: ['Pagination'],
    description:
      'Class applied to the ellipsis within the Pagination primitive',
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
  SelectIconWrapper: {
    className: ComponentClassName.SelectIconWrapper,
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
  TabItems: {
    className: ComponentClassName.TabItems,
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

export const ComponentClassNames: ComponentClassNamesType = {
  Alert: ComponentClassObject.Alert.className,
  AlertIcon: ComponentClassObject.AlertIcon.className,
  AlertHeading: ComponentClassObject.AlertHeading.className,
  AlertBody: ComponentClassObject.AlertBody.className,
  AlertDismiss: ComponentClassObject.AlertDismiss.className,
  Autocomplete: ComponentClassObject.Autocomplete.className,
  AutocompleteMenu: ComponentClassObject.AutocompleteMenu.className,
  AutocompleteMenuEmpty: ComponentClassObject.AutocompleteMenuEmpty.className,
  AutocompleteMenuFooter: ComponentClassObject.AutocompleteMenuFooter.className,
  AutocompleteMenuHeader: ComponentClassObject.AutocompleteMenuHeader.className,
  AutocompleteMenuLoading:
    ComponentClassObject.AutocompleteMenuLoading.className,
  AutocompleteMenuOption: ComponentClassObject.AutocompleteMenuOption.className,
  AutocompleteMenuOptions:
    ComponentClassObject.AutocompleteMenuOptions.className,
  Badge: ComponentClassObject.Badge.className,
  Button: ComponentClassObject.Button.className,
  ButtonGroup: ComponentClassObject.ButtonGroup.className,
  ButtonLoaderWrapper: ComponentClassObject.ButtonLoaderWrapper.className,
  Card: ComponentClassObject.Card.className,
  Checkbox: ComponentClassObject.Checkbox.className,
  CheckboxButton: ComponentClassObject.CheckboxButton.className,
  CheckboxIcon: ComponentClassObject.CheckboxIcon.className,
  CheckboxInput: ComponentClassObject.CheckboxInput.className,
  CheckboxLabel: ComponentClassObject.CheckboxLabel.className,
  CheckboxField: ComponentClassObject.CheckboxField.className,
  Collection: ComponentClassObject.Collection.className,
  CollectionItems: ComponentClassObject.CollectionItems.className,
  CollectionSearch: ComponentClassObject.CollectionSearch.className,
  CollectionPagination: ComponentClassObject.CollectionPagination.className,
  CountryCodeSelect: ComponentClassObject.CountryCodeSelect.className,
  DialCodeSelect: ComponentClassObject.DialCodeSelect.className,
  Divider: ComponentClassObject.Divider.className,
  DividerLabel: ComponentClassObject.DividerLabel.className,
  Expander: ComponentClassObject.Expander.className,
  ExpanderContent: ComponentClassObject.ExpanderContent.className,
  ExpanderContentText: ComponentClassObject.ExpanderContentText.className,
  ExpanderHeader: ComponentClassObject.ExpanderHeader.className,
  ExpanderIcon: ComponentClassObject.ExpanderIcon.className,
  ExpanderItem: ComponentClassObject.ExpanderItem.className,
  ExpanderTrigger: ComponentClassObject.ExpanderTrigger.className,
  Field: ComponentClassObject.Field.className,
  FieldDescription: ComponentClassObject.FieldDescription.className,
  FieldErrorMessage: ComponentClassObject.FieldErrorMessage.className,
  FieldGroup: ComponentClassObject.FieldGroup.className,
  FieldGroupControl: ComponentClassObject.FieldGroupControl.className,
  FieldGroupOuterEnd: ComponentClassObject.FieldGroupOuterEnd.className,
  FieldGroupOuterStart: ComponentClassObject.FieldGroupOuterStart.className,
  FieldGroupInnerEnd: ComponentClassObject.FieldGroupInnerEnd.className,
  FieldGroupInnerStart: ComponentClassObject.FieldGroupInnerStart.className,
  FieldGroupIcon: ComponentClassObject.FieldGroupIcon.className,
  FieldGroupIconButton: ComponentClassObject.FieldGroupIconButton.className,
  FieldGroupHasInnerEnd: ComponentClassObject.FieldGroupHasInnerEnd.className,
  FieldGroupHasInnerStart:
    ComponentClassObject.FieldGroupHasInnerStart.className,
  FieldShowPassword: ComponentClassObject.FieldShowPassword.className,
  FieldGroupFieldWrapper: ComponentClassObject.FieldGroupFieldWrapper.className,
  FileUploaderDropZone: ComponentClassObject.FileUploaderDropZone.className,
  FileUploaderDropZoneIcon:
    ComponentClassObject.FileUploaderDropZoneIcon.className,
  FileUploaderDropZoneText:
    ComponentClassObject.FileUploaderDropZoneText.className,
  FileUploaderDropZoneButton:
    ComponentClassObject.FileUploaderDropZoneButton.className,
  FileUploaderFile: ComponentClassObject.FileUploaderFile.className,
  FileUploaderFileName: ComponentClassObject.FileUploaderFileName.className,
  FileUploaderLoader: ComponentClassObject.FileUploaderLoader.className,
  FileUploaderFileSize: ComponentClassObject.FileUploaderFileSize.className,
  FileUploaderFileInfo: ComponentClassObject.FileUploaderFileInfo.className,
  FileUploaderFileImage: ComponentClassObject.FileUploaderFileImage.className,
  FileUploaderFileMain: ComponentClassObject.FileUploaderFileMain.className,
  FileUploaderFileStatus: ComponentClassObject.FileUploaderFileStatus.className,
  FileUploaderPreviewer: ComponentClassObject.FileUploaderPreviewer.className,
  FileUploaderPreviewerText:
    ComponentClassObject.FileUploaderPreviewerText.className,
  FileUploaderPreviewerBody:
    ComponentClassObject.FileUploaderPreviewerBody.className,
  FileUploaderPreviewerFooter:
    ComponentClassObject.FileUploaderPreviewerFooter.className,
  FileUploaderPreviewerFooterActions:
    ComponentClassObject.FileUploaderPreviewerFooterActions.className,
  Flex: ComponentClassObject.Flex.className,
  Grid: ComponentClassObject.Grid.className,
  Heading: ComponentClassObject.Heading.className,
  HighlightMatch: ComponentClassObject.HighlightMatch.className,
  HighlightMatchHighlighted:
    ComponentClassObject.HighlightMatchHighlighted.className,
  Icon: ComponentClassObject.Icon.className,
  Image: ComponentClassObject.Image.className,
  Input: ComponentClassObject.Input.className,
  Label: ComponentClassObject.Label.className,
  Link: ComponentClassObject.Link.className,
  Loader: ComponentClassObject.Loader.className,
  LoaderDeterminate: ComponentClassObject.LoaderDeterminate.className,
  LoaderPercentageText: ComponentClassObject.LoaderPercentageText.className,
  MenuContent: ComponentClassObject.MenuContent.className,
  MenuContentWrapper: ComponentClassObject.MenuContentWrapper.className,
  MenuItem: ComponentClassObject.MenuItem.className,
  MenuTrigger: ComponentClassObject.MenuTrigger.className,
  Pagination: ComponentClassObject.Pagination.className,
  PaginationItemButton: ComponentClassObject.PaginationItemButton.className,
  PaginationItemCurrent: ComponentClassObject.PaginationItemCurrent.className,
  PaginationItemEllipsis: ComponentClassObject.PaginationItemEllipsis.className,
  PasswordField: ComponentClassObject.PasswordField.className,
  PhoneNumberField: ComponentClassObject.PhoneNumberField.className,
  Placeholder: ComponentClassObject.Placeholder.className,
  Radio: ComponentClassObject.Radio.className,
  RadioButton: ComponentClassObject.RadioButton.className,
  RadioInput: ComponentClassObject.RadioInput.className,
  RadioLabel: ComponentClassObject.RadioLabel.className,
  RadioGroupField: ComponentClassObject.RadioGroupField.className,
  RadioGroup: ComponentClassObject.RadioGroup.className,
  Rating: ComponentClassObject.Rating.className,
  ScrollView: ComponentClassObject.ScrollView.className,
  SearchField: ComponentClassObject.SearchField.className,
  SearchFieldClear: ComponentClassObject.SearchFieldClear.className,
  SearchFieldSearch: ComponentClassObject.SearchFieldSearch.className,
  Select: ComponentClassObject.Select.className,
  SelectField: ComponentClassObject.SelectField.className,
  SelectWrapper: ComponentClassObject.SelectWrapper.className,
  SelectIconWrapper: ComponentClassObject.SelectIconWrapper.className,
  SliderField: ComponentClassObject.SliderField.className,
  SliderFieldGroup: ComponentClassObject.SliderFieldGroup.className,
  SliderFieldLabel: ComponentClassObject.SliderFieldLabel.className,
  SliderFieldRange: ComponentClassObject.SliderFieldRange.className,
  SliderFieldRoot: ComponentClassObject.SliderFieldRoot.className,
  SliderFieldThumb: ComponentClassObject.SliderFieldThumb.className,
  SliderFieldTrack: ComponentClassObject.SliderFieldTrack.className,
  StepperField: ComponentClassObject.StepperField.className,
  StepperFieldButtonDecrease:
    ComponentClassObject.StepperFieldButtonDecrease.className,
  StepperFieldButtonIncrease:
    ComponentClassObject.StepperFieldButtonIncrease.className,
  StepperFieldInput: ComponentClassObject.StepperFieldInput.className,
  SwitchField: ComponentClassObject.SwitchField.className,
  SwitchLabel: ComponentClassObject.SwitchLabel.className,
  SwitchThumb: ComponentClassObject.SwitchThumb.className,
  SwitchTrack: ComponentClassObject.SwitchTrack.className,
  SwitchWrapper: ComponentClassObject.SwitchWrapper.className,
  Table: ComponentClassObject.Table.className,
  TableCaption: ComponentClassObject.TableCaption.className,
  TableBody: ComponentClassObject.TableBody.className,
  TableTd: ComponentClassObject.TableTd.className,
  TableTh: ComponentClassObject.TableTh.className,
  TableFoot: ComponentClassObject.TableFoot.className,
  TableHead: ComponentClassObject.TableHead.className,
  TableRow: ComponentClassObject.TableRow.className,
  Tabs: ComponentClassObject.Tabs.className,
  TabItems: ComponentClassObject.TabItems.className,
  Text: ComponentClassObject.Text.className,
  Textarea: ComponentClassObject.Textarea.className,
  TextAreaField: ComponentClassObject.TextAreaField.className,
  TextField: ComponentClassObject.TextField.className,
  ToggleButton: ComponentClassObject.ToggleButton.className,
  ToggleButtonGroup: ComponentClassObject.ToggleButtonGroup.className,
  VisuallyHidden: ComponentClassObject.VisuallyHidden.className,
};

// For internal use, no need to export
export const ComponentText = {
  Alert: {
    dismissButtonLabel: 'Dismiss alert',
  },
  Autocomplete: {
    emptyText: 'No options found',
    loadingText: 'Loading options...',
  },
  Collection: {
    searchButtonLabel: 'Search',
    searchNoResultsFound: 'No results found',
  },
  Fields: {
    clearButtonLabel: 'Clear input',
  },
  PaginationItem: {
    currentPageLabel: 'Page',
    nextLabel: 'Go to next page',
    pageLabel: 'Go to page',
    previousLabel: 'Go to previous page',
  },
  PhoneNumberField: {
    countryCodeLabel: 'Country code',
  },
  SearchField: {
    searchButtonLabel: 'Search',
  },
  PasswordField: {
    passwordIsHidden: 'Password is hidden',
    passwordIsShown: 'Password is shown',
    showPassword: 'Show password',
  },
  StepperField: {
    increaseButtonLabel: 'Increase to',
    decreaseButtonLabel: 'Decrease to',
  },
};

export const stylePropsToThemeKeys: Record<ThemeStylePropKey, ThemeTokenKey> = {
  backgroundColor: 'colors',
  color: 'colors',
  borderRadius: 'radii',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  fontFamily: 'fonts',
  lineHeight: 'lineHeights',
  opacity: 'opacities',
  boxShadow: 'shadows',
  transform: 'transforms',
  left: 'space',
  right: 'space',
  top: 'space',
  bottom: 'space',
  height: 'space',
  width: 'space',
  letterSpacing: 'space',
  margin: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  marginLeft: 'space',
  marginRight: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  maxHeight: 'space',
  maxWidth: 'space',
  minHeight: 'space',
  minWidth: 'space',
  padding: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  paddingLeft: 'space',
  paddingRight: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
};

// key name
export const ESCAPE_KEY = 'Escape';
export const ENTER_KEY = 'Enter';
export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
