---
"@aws-amplify/ui-react": major
"@aws-amplify/ui": major
---

breaking: refactoring Tabs component to remove Radix dependency and allow more composability and customization. 

```diff
- import { Tabs, TabItem } from '@aws-amplify/ui-react'
+ import { Tabs } from '@aws-amplify/ui-react'

- <Tabs>
-  <TabItem title="Tab 1">
-    Tab 1 Content
-  </TabItem>

+ <Tabs.Container defaultValue="Tab 1">
+  <Tabs.List>
+    <Tabs.Item value="Tab 1">Tab 1</Tabs.Item>
+  </Tabs.List>
+  <Tabs.Panel value="Tab 1">
+    Tab 1 Content
+  </Tabs.Panel>
+ </Tabs.Container>
```


You can also use the Tabs in a uncomposed way too:

```jsx
  <Tabs
    defaultValue={'Tab 1'}
    items={[
      { label: 'Tab 1', value: 'Tab 1', content: 'Tab content #1' },
      { label: 'Tab 2', value: 'Tab 2', content: 'Tab content #2' },
      { label: 'Tab 3', value: 'Tab 3', content: 'Tab content #3' },
    ]}
  />
```

Some notable differences:
* Instead of providing a `defaultIndex` or `currentIndex` you provide a `defaultValue` or `value`. Each Tabs.Item and Tabs.Panel should have a `value` that matches with the corresponding element.
* `onChange` becomes `onValueChange`
* You should supply a `defaultValue` or `value` or else there will be no default selected tab. Previously the Tabs component would default to the first tab.

There are also more design tokens and better CSS classes for easier customization. 
