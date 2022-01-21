---
"@aws-amplify/ui-react": patch
---

This enables `useAuthenticator` usage outside <Authenticator /> to access commonly requested authenticator context like `user` and `route`. This also adds `useAuthenticatorRoute`, `useAuthenticatorUser`, `useAuthenticatorTransitions` that only triggers re-render whenever the value of interest changes.

First wrap your App with `Authenticator.Provider`:

```tsx
const App = (
  <Authenticator.Provider>
    <MyApp />
  </Authenticator.Provider>
)
```

We highly suggest using `useAuthenticatorUser`, `useAuthenticatorRoute`, and `useAuthenticatorTransitions` based on your use case to minimize re-render on every auth state change (which happens on every form change!)

```tsx
const Home = () => {
  const user = useAuthenticatorUser();
  const { signOut } = useAuthenticatorTransitions();

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

const Login = () => <Authenticator />;

function MyApp() {
  const route = useAuthenticatorRoute();

  return route === 'authenticated' ? <Home /> : <Login />;
}
```
