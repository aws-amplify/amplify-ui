---
"@aws-amplify/ui-react": patch
---

This enables `useAuthenticator` usage outside <Authenticator /> to access commonly requested authenticator context like `user` and `route`.. Also adds `useAuthenticatorRoute` and `useAuthenticatorUser` that only triggers re-render whenever `route` or `user` change respectively. 

First wrap your App with `Authenticator.Provider`:

```tsx
const App = (
  <Authenticator.Provider>
    <MyApp />
  </Authenticator.Provider>
)
```

And you can use `useAuthenticator` variants in your app. We highly suggest using `useAuthenticatorUser` or `useAuthenticatorRoute` based on your use case to minimize re-render on every auth state change (which happens on every form change!)

```tsx
const Home = () => {
  const { signOut, user } = useAuthenticatorUser();

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

const Login = () => <Authenticator />;

function MyApp() {
  const { route } = useAuthenticatorRoute();

  return route === 'authenticated' ? <Home /> : <Login />;
}
```
