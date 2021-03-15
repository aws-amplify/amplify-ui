## Custom Style

You can provide custom style into the `spark-context-provider` with `customStyle` input.

_app.component.ts_

```javascript
export class AppComponent {
  // ...
  customStyle = {
    Button: {
      'background-color': 'skyblue',
    },
  };
```

_app.component.html_

```html
<spark-context-provider [customStyle]="customStyle">
  <amplify-authenticator> </amplify-authenticator>
</spark-context-provider>
```

<br/>
