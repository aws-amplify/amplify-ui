export function Box(props) {
  return <div {...props} />;
}

export function Button(props) {
  return <button {...props} />;
}

export function Fieldset(props) {
  return <fieldset {...props} />;
}

export function Footer(props) {
  return <footer {...props} />;
}

export function Main(props) {
  return <main {...props} />;
}

export function Form(props) {
  return <form {...props} />;
}

export function Header(props) {
  return <header {...props} />;
}

export function Heading({ level = 1, ...props }) {
  const H = `h${level}`;

  return <H {...props} />;
}

export function Input(props) {
  return <input {...props} />;
}

export function Label(props) {
  return <label {...props} />;
}

export function Spacer(props) {
  return <span {...props} />;
}

export function Text(props) {
  return <span {...props} />;
}

export function Wrapper(props) {
  return <div {...props} />;
}
