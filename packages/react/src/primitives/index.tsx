export * from './Alert';
export * from './Badge';
export * from './Button';
export * from './ButtonGroup';
export * from './Card';
export * from './CheckboxField';
export * from './Collection';
export * from './Divider';
export * from './FieldGroup';
export * from './FieldGroupIcon';
export * from './Flex';
export * from './Grid';
export * from './Heading';
export * from './Icon';
export * from './Image';
export * from './Link';
export * from './Loader';
export * from './Menu';
export * from './Pagination';
export * from './Placeholder';
export * from './PasswordField';
export * from './PhoneNumberField';
export * from './Placeholder';
export * from './Radio';
export * from './RadioGroupField';
export * from './Rating';
export * from './ScrollView';
export * from './SearchField';
export * from './SelectField';
export * from './StepperField';
export * from './SwitchField';
export * from './Tabs';
export * from './Text';
export * from './TextField';
export * from './ToggleButton';
export * from './ToggleButtonGroup';
export * from './View';
export * from './VisuallyHidden';

export * from './shared';
export * from './types';

export function Box(props) {
  return <div data-amplify-box="" {...props} />;
}

export function Fieldset(props) {
  return <fieldset data-amplify-fieldset="" {...props} />;
}

export function Footer(props) {
  return <footer data-amplify-footer="" {...props} />;
}

export function Main(props) {
  return <main data-amplify-main="" {...props} />;
}

export function Form(props) {
  return <form data-amplify-form="" {...props} />;
}

export function Header(props) {
  return <header data-amplify-header="" {...props} />;
}

export function Input(props) {
  return <input data-amplify-input="" {...props} />;
}

export function Label(props) {
  return <label data-amplify-label="" {...props} />;
}

export function Spacer(props) {
  return <span data-amplify-spacer="" {...props} />;
}

export function ErrorText(props) {
  return props.children ? <span data-amplify-error="" {...props} /> : null;
}

export function Wrapper(props) {
  return <div data-amplify-wrapper="" {...props} />;
}
