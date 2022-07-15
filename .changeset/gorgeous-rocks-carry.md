---
"@aws-amplify/ui-react": feat
"@aws-amplify/ui": feat
---

feat: adding indeterminate state checkbox

Users can create an indeterminate `CheckboxField` by setting `isIndeterminate` prop to `true`.

***Example***
```jsx
import * as React from 'react';

import { CheckboxField, Flex, View } from '@aws-amplify/ui-react';

export const CheckboxFieldIndeterminateExample = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <Flex direction="column" gap="0">
      <CheckboxField
        name="parent-checkbox"
        label="Parent Checkbox"
        value="parent"
        checked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      />
      <View paddingLeft="25px">
        <CheckboxField
          name="child-checkbox-1"
          label=" Child Checkbox 1"
          value="child2"
          checked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        />
        <CheckboxField
          name="child-checkbox-2"
          label=" Child Checkbox 2"
          value="child2"
          checked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        />
      </View>
    </Flex>
  );
};
```
