import * as React from "react";
import * as RN from "react-native";

export function Box(props) {
  return <RN.View data-amplify-box="" {...props} />;
}

export function Button({ children }) {
  return <RN.Button data-amplify-button="" title={children} />;
}

export function Fieldset(props) {
  return <RN.View data-amplify-fieldset="" {...props} />;
}

export function Footer(props) {
  return <RN.View data-amplify-footer="" {...props} />;
}

export function Main(props) {
  return <RN.View data-amplify-main="" {...props} />;
}

export function Form(props) {
  return <RN.View data-amplify-form="" {...props} />;
}

export function Header(props) {
  return <RN.Label data-amplify-header="" {...props} />;
}

export function Heading({ level = 1, ...props }) {
  return <RN.Text data-amplify-heading="" {...props} />;
}

export function Input(props) {
  return (
    <RN.TextInput data-amplify-input="" autoCapitalize="none" {...props} />
  );
}

export function Label(props) {
  return <RN.View data-amplify-label="" {...props} />;
}

export function Spacer(props) {
  return <RN.View data-amplify-spacer="" {...props} />;
}

export function Text(props) {
  return <RN.Text data-amplify-text="" {...props} />;
}

export function Wrapper(props) {
  return <RN.View data-amplify-wrapper="" {...props} />;
}
