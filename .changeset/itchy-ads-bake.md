---
"@aws-amplify/ui": major
"@aws-amplify/ui-react": major
---

breaking: renaming Expander to Accordion and removing Radix dependency. The Accordion component is now built with `<details>` and `<summary>` elements to handle showing/hiding content.

```jsx
<Accordion.Container>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>
      Click me first!
      <Accordion.Icon />
    </Accordion.Trigger>
    <Accordion.Content>
      Now when you click the second item, this item will automatically collapse.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>
      Then click me!
      <Accordion.Icon />
    </Accordion.Trigger>
    <Accordion.Content>
      Notice how only one item can be open at a time for the single Accordion type.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Container>
```

The Accordion can be controlled or uncontrolled (with a default value)
