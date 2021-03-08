# Amplify Spark (Angular) IN DRAFT

## Getting Started

```shell
yarn add @aws-amplify/spark-angular
```

## Usage

### Default Authenticator

#### Simple example

_app.component.ts_

```ts
import Spark from "@aws-ampliufy/spark";

@Component({
  selector: "my-app",
  templateUrl: "./app.comonent.html",
})
export class AppComponent {}
```

_app.component.html_

```html
<spark-context-provider>
  <amplify-authenticator></amplify-authenticator>
</spark-context-provider>
```

### Headless Authenticator

```html
<amplify-authenticator> </amplify-authenticator>
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

_app.component.html_

```html
<spark-context-provider>
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
