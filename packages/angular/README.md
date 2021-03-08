# Amplify Spark (Angular)

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
export class AppComponent {
  context = Spark;
}
```

_app.component.html_

```html
<spark-context-provider [context]="context">
  <amplify-authenticator>
    <div #signedIn>My App</div>
  </amplify-authenticator>
</spark-context-provider>
```

#### Conditional rendering with `user` data

_app.component.html_

```html
<spark-context-provider [context]="context">
  <amplify-authenticator>
    <div #signedIn *contextProps="let props" *ngIf="props.user">
      Welcome, {{props.user.username}}
    </div>
  </amplify-authenticator>
</spark-context-provider>
```

### Custom Components

_app.component.ts_

```ts

```

_app.component.html_

```html
<spark-context-provider></spark-context-provider>
```

### Headless

_app.component.ts_

```ts

```

_app.component.html_

```html

```
