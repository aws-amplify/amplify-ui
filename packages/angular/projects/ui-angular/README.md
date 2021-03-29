# Amplify Spark (Angular) IN DRAFT

## Getting Started

```shell
yarn add @aws-amplify/ui-angular
```

## Usage

### Default Authenticator

_app.component.html_

```html
<spark-context-provider>
  <amplify-authenticator></amplify-authenticator>
</spark-context-provider>
```

### Headless Authenticator

```html
<amplify-authenticator></amplify-authenticator>
```

#### Customizing Headless Authenticator with templateRef

```html
<amplify-authenticator>
  <ng-template #signedIn let-signOut="signOut">
    <button (click)="signOut">My custom sign out button</button>
  </ng-template>
</amplify-authenticator>
```

### Custom Authenticator

_app.component.ts_

```tsx
import Spark from '@aws-amplify/ui-angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.comonent.html',
})
export class AppComponent {
  customStyle = {
    Authenticator: {
      Container: {
        width: '22rem',
        padding: '3rem',
        'box-shadow': '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
      },
      Input: {
        display: 'block',
        padding: '0.875rem',
        width: '90%',
        'margin-bottom': '1.25rem',
        'border-color': 'rgb(196, 196, 196)',
        'border-width': '1px',
      },
      Label: {
        display: 'block',
        'margin-bottom': '0.625rem',
      },
      Button: {
        'background-color': 'skyblue',
        padding: '0.75rem 1.25rem 0.75rem 1.25rem',
        'border-style': 'none',
        color: 'white',
      },
    },
  };
}
```

_app.component.html_

```html
<spark-context-provider [style]="customStyle">
  <amplify-authenticator>
    <ng-template #signIn>
      <amplify-sign-in [headerText]="'Custom Sign In'"></amplify-sign-in>
    </ng-template>
    <ng-template #signedIn>
      <h1>This is customized signedIn content</h1>
      <amplify-sign-out></amplify-sign-out>
    </ng-template>
  </amplify-authenticator>
</spark-context-provider>
```
