# Custom Style

You can provide custom style into the `spark-context-provider` with `customStyle` input. You can assign and target custom id to the authenticator to ensure that your style to give it override priority.

_app.component.html_

```html
<spark-context-provider>
  <amplify-authenticator id="my-authenticator"> </amplify-authenticator>
</spark-context-provider>
```

_styles.css_

```css
#my-authenticator [data-spark-sign-in] [data-spark-button] {
    background-color: skyblue;
}
```

<br />
