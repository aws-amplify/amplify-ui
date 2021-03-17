## Custom Style

You can provide custom style into the `spark-context-provider` with `customStyle` input. You can target custom classes too like example below.

_app.component.html_

```html
<spark-context-provider>
  <amplify-authenticator class="customStyle"> </amplify-authenticator>
</spark-context-provider>
```

_styles.css_

```css
[data-spark-authenticator].customStyle [data-spark-button] {
  background-color: skyblue !important;
}
```

<br />
