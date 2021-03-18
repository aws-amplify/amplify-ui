# Custom Style

We provide `data-spark-[name]` attributes that you can target with your css file. For example, you can target sign in button with

_styles.css_
```css 
[data-spark-sign-in] [data-spark-button] {
    background-color: skyblue;
}
```

## Overriding Default Styles
You can assign and target custom id to the authenticator to ensure that your style to give it override priority.

_app.component.html_

```html
<amplify-context-provider>
  <amplify-authenticator id="my-authenticator"> </amplify-authenticator>
</amplify-context-provider>
```

_styles.css_

```css
#my-authenticator [data-spark-sign-in] [data-spark-button] {
    background-color: skyblue;
}
```

<br />