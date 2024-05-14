import { IconsProvider, Rating } from '@aws-amplify/ui-react';
import { FiStar } from 'react-icons/fi';

export default function IconProviderExample() {
  return (
    <IconsProvider
      icons={{
        rating: {
          filled: <FiStar />,
          empty: <FiStar />,
        },
      }}
    >
      <Rating value={3.5} />
    </IconsProvider>
  );
}
