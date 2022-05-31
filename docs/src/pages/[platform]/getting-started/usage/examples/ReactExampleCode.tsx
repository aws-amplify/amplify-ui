import * as React from 'react';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default styles

function App() {
  return (
    <Button variation="primary" width="10rem">
      Hello world
    </Button>
  );
}

export default App;
