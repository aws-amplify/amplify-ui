---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

Adding `label` prop to Divider component. 

```jsx
import { Flex, Text, Divider } from '@aws-amplify/ui-react';

export const LabelExample = () => (
  <Flex direction="column">
    <Text>Before</Text>
    <Divider label="OR" />
    <Text>After</Text>
  </Flex>
);
```
