export function Box(props) {
  return <div data-amplify-box="" {...props} />;
}

export function Button(props) {
  return <button data-amplify-button="" {...props} />;
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

export function Heading({ level = 1, ...props }) {
  const H = `h${level}`;

  return <H data-amplify-heading="" {...props} />;
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

export function Text(props) {
  return <span data-amplify-text="" {...props} />;
}

export function Wrapper(props) {
  return <div data-amplify-wrapper="" {...props} />;
}
