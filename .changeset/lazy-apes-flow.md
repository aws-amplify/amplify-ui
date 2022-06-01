---
"@aws-amplify/ui-react": minor
---

feat: update custom style props to accept StyleToken type

For example:
```jsx
import {
  Flex,
  Loader,
  Rating,
  SliderField,
  SwitchField,
} from '@aws-amplify/ui-react';

export const StyleTokenExample = () => {
  return (
  <Flex>
    <Loader
    emptyColor={tokens.colors.black}
    filledColor={tokens.colors.orange[40]}
    />

    <Rating
      value={2.5}
      fillColor={tokens.colors.red[60]}
      emptyColor={tokens.colors.green[60]}
    />

    <SliderField
      label="Style Props Slider"
      filledTrackColor={tokens.colors.green[80].value}
      emptyTrackColor={tokens.colors.green[20].value}
      thumbColor="red"
      filledTrackColor={tokens.colors.green[80]}
      emptyTrackColor={tokens.colors.green[20]}
      thumbColor={tokens.colors.red[60]}
      trackSize="15px"
      defaultValue={50}
    />
  
    <SwitchField
      label="This is a switch"
      trackCheckedColor={tokens.colors.green[60]}
      thumbColor={tokens.colors.orange[10]}
    />
  <Flex>
 );
}

```
