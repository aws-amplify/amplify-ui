import { Amplify } from 'aws-amplify';
import { LocationSearch, MapView } from '@aws-amplify/ui-react-geo';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function MapWithLocationSearch() {
  return (
    <>
      <div>{JSON.stringify(awsExports.geo)}</div>
      <MapView>
        <LocationSearch />
      </MapView>
    </>
  );
}
