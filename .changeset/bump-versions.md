---
'@aws-amplify/ui': patch
'@aws-amplify/ui-react': patch
---

`@aws-amplify/ui-react` supports validation & re-use & customization of `Authenticator.SignUp.FormFields` via `components` & `services`:

```js
<Authenticator
  components={{
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();
        return (
          <>
            <TextField
              label="Preferred Username"
              labelHidden={true}
              name="preferred_username"
              placeholder="Preferred Username"
            />
            <Authenticator.SignUp.FormFields />
            <CheckboxField
              errorMessage={validationErrors.acknowledgement}
              hasError={!!validationErrors.acknowledgement}
              name="acknowledgement"
              value="yes"
            >
              I agree with the Terms & Conditions
            </CheckboxField>
          </>
        );
      },
    },
  }}
  services={{
    async validateCustomSignUp(formData) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms & Conditions',
        };
      }
    },
  }}
/>
```
