---
"@aws-amplify/ui-react": minor
---

This enables `useAuthenticator` usage outside <Authenticator /> to access commonly requested authenticator context like `user` and `route`. 

First wrap your App with `Authenticator.Provider`:

```tsx
const App = (
  <Authenticator.Provider>
    <MyApp />
  </Authenticator.Provider>
)
```

To avoid repeated re-renders, you can pass a function that takes in Authenticator context and returns an array of desired context values. This hook will only trigger re-render if any of the array value changes. 

```tsx
const Home = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

const Login = () => <Authenticator />;

function MyApp() {
  const { route } = useAuthenticator((context) => [context.route]);

  return route === 'authenticated' ? <Home /> : <Login />;
}
```
