---
'@aws-amplify/ui-react': patch
---

AmplifyProvider accepts a partial list of primitives as `components`:

```js
const App = () => {
  const {
    components: { Heading },
  } = useAmplify();

  return <Heading>Howdy</Heading>;
};

<AmplifyProvider
  components={{
    Heading({ children }) {
      return <h1>{children}</h1>;
    },
  }}
>
  <App />
</AmplifyProvider>;
```
