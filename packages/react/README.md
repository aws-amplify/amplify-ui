# Amplify Spark (React)

## Getting Started

```shell
yarn add @aws-amplify/spark-react
```

## Usage

### Headless

```tsx
import React from "react";
import ReactDOM from "react-dom";

import { Authenticator } from "@aws-amplify/spark-react";

ReactDOM.render(
  <Authenticator>{({ user }) => (user ? <App /> : <SignIn />)}</Authenticator>,
  document.getElementById("root")
);
```

### Wrapping Your Entire App

```tsx
import React from "react";
import ReactDOM from "react-dom";

import * as components from "@aws-amplify/spark-react";

ReactDOM.render(
  <Spark.Provider value={{ components: Spark }}>
    <Spark.Authenticator>{({ user }) => <App />}</Spark.Authenticator>
  </Spark.Provider>,
  document.getElementById("root")
);
```

### Customizing the Authenticator

```tsx
import React from "react";
import ReactDOM from "react-dom";

import * as Spark from "@aws-amplify/spark-react";

const components = {
  ...Spark,
  Label({ children }) {
    return styled(Spark.Label)`
      color: red;
      padding: 2rem;
    `;
  },
  "Authenticator.SignIn.Label": ({ children }) => {
    return <label>Sign in: {children}</label>;
  },
};

ReactDOM.render(
  <Spark.Provider value={{ components }}>
    <Spark.Authenticator>{({ user }) => <App />}</Spark.Authenticator>
  </Spark.Provider>,
  document.getElementById("root")
);
```

### Custom Flow With Hooks

```tsx
import { SignIn, useAuthenticator } from "@aws-amplify/spark";

function App() {
  const { signal, state, user } = useAuthenticator();

  if (state === "UNAUTHENTICATED") {
    return <SignIn />;
  }

  if (["CREATE_ACCOUNT", "CREATING_ACCOUNT"].includes(state)) {
    function handleSubmit(event) {
      event.preventDefault();

      const data = new FormData(event.target);

      if (data.get("password") !== data.get("passwordConfirmation")) {
        return alert("Passwords did not match");
      }

      return signal("CREATE_ACCOUNT_NEXT", data);
    }

    return (
      <form onSubmit={handleSubmit}>
        <fieldset disabled={state === "CREATING_ACCOUNT"}>
          <input name="email" placeholder="Email" />
          <input name="password" placeholder="Password" type="password" />
          <input
            name="passwordConfirmation"
            placeholder="Confirm your password"
            type="password"
          />

          <button type="submit">Create Account</button>
        </fieldset>
      </form>
    );
  }

  return (
    <main>
      <h1>Howdy {user.email}</h1>
      <button onClick={() => signal("SIGN_OUT")}>Sign out</button>
    </main>
  );
}
```
