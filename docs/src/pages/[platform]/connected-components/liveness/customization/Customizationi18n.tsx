import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { ToggleButtonGroup, ToggleButton } from '@aws-amplify/ui-react';

const dictionary = {
  // use default strings for english
  en: null,
  es: {
    photosensitivityWarningHeadingText: 'Advertencia de fotosensibilidad',
    photosensitivityWarningBodyText:
      'Esta verificación muestra luces de colores. Tenga cuidado si es fotosensible.',
    goodFitCaptionText: 'Buen ajuste',
    tooFarCaptionText: 'Demasiado lejos',
    hintCenterFaceText: 'Centra tu cara',
    startScreenBeginCheckText: 'Comenzar a verificar',
  },
};

export function Customizationi18n() {
  const [language, setLanguage] = React.useState<string>('en');
  const [showLiveness, setShowLiveness] = React.useState(false);
  React.useEffect(() => {
    setShowLiveness(true);
  }, []);
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
      {showLiveness && (
        <FaceLivenessDetector
          sessionId={'sessionId'}
          region="us-east-1"
          onAnalysisComplete={async () => {}}
          displayText={dictionary[language]}
        />
      )}
    </>
  );
}
