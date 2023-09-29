---
"@aws-amplify/ui": major
"@aws-amplify/ui-react": major
---

breaking: renaming Expander to Accordion and removing Radix dependency. The Accordion component is now built with `<details>` and `<summary>` elements to handle showing/hiding content.

```jsx
    <Accordion>
      <Accordion.Item title="Click me first!" value="item-1">
        Now when you click the second item, this item will automatically
        collapse.
      </Accordion.Item>
      <Accordion.Item title="Then click me!" value="item-2">
        Notice how only one item can be open at a time for the single Accordion
        type.
      </Accordion.Item>
    </Accordion>
```

The Accordion can be controlled or uncontrolled (with a default value)
