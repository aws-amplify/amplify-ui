import * as React from "react";
import * as RN from "react-native";
import { StyleSheet } from "react-native";
import tailwind from "tailwind-rn";

export function Box(props) {
  return <RN.View data-amplify-box="" {...props} />;
}

export function Button({ children, onClick, style }) {

  const _style = tailwind("px-8 py-2 text-base text-white bg-gray-700 rounded");
  const _merged = { ..._style, ...style };

  return (
    <RN.Pressable style={_merged} onPress={onClick}>
      <RN.Text style={_merged}>{children}</RN.Text>
    </RN.Pressable>
  );
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

// This must be read from original css
const inputStyle = tailwind('block w-full mt-1 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50');

export function Input({ onChange, style, ...props}) {

  const onChangeText = (value: String) => 
    onChange && onChange({ target: { value }});

  const mergedStyle = { ...inputStyle, ...style };
  console.warn('MERGED', mergedStyle);

  return (
    <RN.View style={mergedStyle}>
      <RN.TextInput data-amplify-input="" autoCapitalize="none" onChangeText={onChangeText} style={mergedStyle} {...props} />
    </RN.View>
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
