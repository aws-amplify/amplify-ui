## Overriding and Scoping Styles

You can assign and target custom id to the authenticator to ensure that your style to give it override priority and that it only applies to your specific authenticator.

_app.component.html_

```html
<amplify-authenticator id="my-authenticator"> </amplify-authenticator>
```

_styles.css_

```css
#my-authenticator [data-amplify-button] {
  background-color: skyblue;
}
```
