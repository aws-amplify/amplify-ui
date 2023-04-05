/*

Problem: Component demo state gets wiped out by NextJS when a customer switches themes (e.g., toggles between light/dark mode). 
- See: https://github.com/aws-amplify/amplify-ui/issues/678
- This has to do with how we are doing dynamic imports, which give us performance benefits

Solution: We are using a simple Map to persist component demo state across NextJS re-renders without the complexity of state management (e.g., Redux)

We are not using React Context for two reasons (based on the React Context docs: https://legacy.reactjs.org/docs/context.html):
- Since the props for each component's demo do not need to be shared across the entire docs site, 
  these props aren't "global" state in the same way that a current authenticated user, theme, or preferred language would be
- React Context is primarily used when some data needs to be accessible by many components at different nesting levels, which does not match our use case

The Map's key-value pairs are the component's name and its demo's props. 
- Since the demo's props could be the props for any of the Amplify UI primitives, we are typing it as 'unknown' 
  and then casting the specific type when we retrieve it with the Map's `get` method

*/

export const demoState = new Map<string, unknown>();
