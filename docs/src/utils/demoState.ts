/*

We are using a Map as a lightweight solution to persist component demo state across NextJS re-renders without the complexity of state management (e.g., Redux). 

We are not using React Context for two reasons (based on the React Context docs: https://reactjs.org/docs/context.html):
- Since the props for each component's demo do not need to be shared across the entire docs site, 
  these props aren't "global" state in the same way that a current authenticated user, theme, or preferred language would be
- React Context is primarily used when some data needs to be accessible by many components at different nesting levels, which does not match our use case

The Map's key-value pairs are the component's name and its demo's props. 
*/

export const demoState = new Map<string, any>();
