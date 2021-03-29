# Custom Style

We provide `data-ui-[name]` attributes that you can target with your css file. For example, you can target sign in button like so in your _styles.css_:

```css
[data-ui-sign-in] [data-ui-header] {
  width: fit-content;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid cornflowerblue;
}

[data-ui-sign-in] [data-ui-button] {
  background-color: inherit;
  color: black;
  border-bottom: 1px solid cornflowerblue;
  border-width: 1px;
}
```
