---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

added new `isMultiple` and `selectSize` props for the `SelectField` component

Example:

```
  <SelectField
    label="Fruit"
    descriptiveText="What's your favorite fruit?"
    selectSize={3}
    isMultiple={true}
  >
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
    <option value="pineapple">Pineapple</option>
    <option value="kiwi">Kiwi</option>
    <option value="tangerine">Tangerine</option>
  </SelectField>
```
