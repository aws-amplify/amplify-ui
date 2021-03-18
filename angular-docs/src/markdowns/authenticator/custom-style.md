# Custom Style

We provide `data-spark-[name]` attributes that you can target with your css file. For example, you can target sign in button like so in your _styles.css_:

```css 
[data-spark-sign-in] [data-spark-header] {
  width: fit-content;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid cornflowerblue;
}

[data-spark-sign-in] [data-spark-button] {
  background-color: inherit;
  color: black;
  border-bottom: 1px solid cornflowerblue;
  border-width: 1px;
}
```

<br />