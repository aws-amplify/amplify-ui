// import { Amplify } from 'aws-amplify';
// import { createAIHooks } from '@aws-amplify/ui-react-ai';
// import { generateClient } from 'aws-amplify/api';
// import '@aws-amplify/ui-react/styles.css';
// import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

// import outputs from './amplify_outputs.json';
// import type { Schema } from './amplify/data/resource';
// import { Authenticator } from '@aws-amplify/ui-react';
// import React from 'react';

// const client = generateClient<Schema>();
// const { useAIGeneration } = createAIHooks(client);

// Amplify.configure(outputs);

// export default function Example() {
//   const [{ data }, handler] = useAIGeneration('generateRecipe');
//   const [_result, _handler2] = useAIGeneration('generateWhatever');
//   return (
//     <Authenticator>
//       {({ user }) => {
//         return (
//           <>
//             <h1>Hello {user.username}</h1>
//             <div>{JSON.stringify(data)}</div>
//             <button
//               onClick={() => {
//                 handler({
//                   description:
//                     'I want a recipe for a gluten-free chocolate cake.',
//                 });
//               }}
//             >
//               generate
//             </button>
//           </>
//         );
//       }}
//     </Authenticator>
//   );
// }

export default function Example() {
  return <div>hello world</div>;
}
