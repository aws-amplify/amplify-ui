---
"@aws-amplify/ui-react": major
---

Changing how style props get applied to the elements in field components that have an input 
(TextField, TextAreaField, StepperField, SelectField, PhoneNumberField, PasswordField).
Previously, we tried to map certain style props to the input and others to the Flex component
wrapping the field. Now, all style props go on the Flex component and there is now an
`inputStyles` prop on these fields that accepts an object of style props. These style props
can use the responsive syntax as well. The PhoneNumberField also has a `selectStyles` prop
because it has a select and a text input. 

```jsx
import { TextField, useTheme } from '@aws-amplify/ui-react';

export const TextFieldInputStyleExample = () => {
  const { tokens } = useTheme();
  return (
    <TextField
      label="Name"
      inputStyles={{
        padding: tokens.space.large,
        backgroundColor: tokens.colors.brand.primary[80],
        color: tokens.colors.font.inverse,
      }}
    />
  );
};
```
