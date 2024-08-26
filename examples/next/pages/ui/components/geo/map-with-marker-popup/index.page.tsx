import { useState } from 'react';
import { Marker, Popup } from 'react-map-gl'; // Note: this dependency should NOT be installed separately
import { Amplify } from 'aws-amplify';
import { Heading, Text } from '@aws-amplify/ui-react';
import { MapView } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-geo/styles.css';

const amplifyOutputs = (
  await import(`@environments/geo/basic-map/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

function MarkerWithPopup({ latitude, longitude }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkerClick = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
  };

  return (
    <>
      <Marker
        latitude={latitude}
        longitude={longitude}
        onClick={handleMarkerClick}
      />
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          offset={{ bottom: [0, -40] }}
          onClose={() => setShowPopup(false)}
        >
          <Heading level={2}>Marker Information</Heading>
          <Text>Some information about a location.</Text>
        </Popup>
      )}
    </>
  );
}

export default function MapWithMarkerPopup() {
  return (
    <MapView initialViewState={{ latitude: 40, longitude: -100, zoom: 3.5 }}>
      <MarkerWithPopup latitude={40} longitude={-100} />
    </MapView>
  );
}
