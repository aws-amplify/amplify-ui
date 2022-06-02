import * as React from 'react';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Button
      ariaLabel="Add item to cart"
      backgroundColor="#ffd811"
      borderRadius="1rem"
      color="black"
      fontWeight="normal"
      onClick={() => alert('Added to cart! ✅')}
      size="small"
      width="8rem"
    >
      Add to Cart
    </Button>
  );
}

export default App;
