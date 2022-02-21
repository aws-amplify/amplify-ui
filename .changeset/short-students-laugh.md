---
"@aws-amplify/ui-react": minor
---

feat: adding `isSelectionRequired` prop to `ToggleButtonGroup` primitive

**Example:**

```jsx
import * as React from 'react';
import {
  MdFormatBold,
  MdFormatColorFill,
  MdFormatItalic,
  MdFormatUnderlined,
} from 'react-icons/md';
import { ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';

export const SelectionRequiredToggleButtonGroupExample = () => {
  const [value, setValue] = React.useState('bold');
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(value) => setValue(value as string)}
      isExclusive
      isSelectionRequired
    >
      <ToggleButton value="bold">
        <MdFormatBold />
      </ToggleButton>
      <ToggleButton value="italic">
        <MdFormatItalic />
      </ToggleButton>
      <ToggleButton value="underlined">
        <MdFormatUnderlined />
      </ToggleButton>
      <ToggleButton value="color-fill">
        <MdFormatColorFill />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
```
