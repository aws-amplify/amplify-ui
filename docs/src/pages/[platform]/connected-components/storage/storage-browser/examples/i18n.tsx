import * as React from 'react';
import { StorageBrowser } from './StorageBrowser'; // IGNORE
import { ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';

const dictionary = {
  en: null,
  es: {
    LocationsView: {
      title: 'Inicio',
    },
  },
};

export default function Example() {
  const [language, setLanguage] = React.useState('en');
  return (
    <>
      <ToggleButtonGroup
        value={language}
        isExclusive
        // @ts-ignore // IGNORE
        onChange={(value) => setLanguage(value)}
      >
        <ToggleButton value="en">En</ToggleButton>
        <ToggleButton value="es">Es</ToggleButton>
      </ToggleButtonGroup>
      <StorageBrowser displayText={dictionary[language]} />
    </>
  );
}
