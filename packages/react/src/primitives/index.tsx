export * from './Badge';
export * from './Button';
export * from './Card';
export * from './Collection';
export * from './Divider';
export * from './Flex';
export * from './Heading';
export * from './Icon';
export * from './Image';
export * from './Pagination';
export * from './Placeholder';
export * from './Rating';
export * from './Tabs';
export * from './Text';
export * from './View';

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
