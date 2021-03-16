export function Box(props) {
  return <div data-spark-box="" {...props} />;
}

export function Button(props) {
  return <button data-spark-button="" {...props} />;
}

export function Fieldset(props) {
  return <fieldset data-spark-fieldset="" {...props} />;
}

export function Footer(props) {
  return <footer data-spark-footer="" {...props} />;
}

export function Main(props) {
  return <main data-spark-main="" {...props} />;
}

export function Form(props) {
  return <form data-spark-form="" {...props} />;
}

export function Header(props) {
  return <header data-spark-header="" {...props} />;
}

export function Heading({ level = 1, ...props }) {
  const H = `h${level}`;

  return <H data-spark-heading="" {...props} />;
}

export function Input(props) {
  return <input data-spark-input="" {...props} />;
}

export function Label(props) {
  return <label data-spark-label="" {...props} />;
}

export function Spacer(props) {
  return <span data-spark-spacer="" {...props} />;
}

export function Text(props) {
  return <span data-spark-text="" {...props} />;
}

export function Wrapper(props) {
  return <div data-spark-wrapper="" {...props} />;
}
