import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { ToggleButtonGroup, ToggleButton } from '@aws-amplify/ui-react';

const dictionary = {
  // use default strings for english
  en: null,
  es: {
    instructionsHeaderHeadingText: 'Verificación de vida',
    instructionsHeaderBodyText:
      'Pasará por un proceso de verificación facial para demostrar que es una persona real.',
    instructionListStepOneText:
      'Cuando aparezca un óvalo, rellena el óvalo con tu cara en 7 segundos.',
    instructionListStepTwoText: 'Maximiza el brillo de tu pantalla.',
    instructionListStepThreeText:
      'Asegúrese de que su cara no esté cubierta con gafas de sol o una máscara.',
    instructionListStepFourText:
      'Muévase a un lugar bien iluminado que no esté expuesto a la luz solar directa.',
    photosensitivyWarningHeadingText: 'Advertencia de fotosensibilidad',
    photosensitivyWarningBodyText:
      'Esta verificación muestra luces de colores. Tenga cuidado si es fotosensible.',
    instructionListHeadingText:
      'Siga las instrucciones para completar la verificación:',
    goodFitCaptionText: 'Buen ajuste',
    tooFarCaptionText: 'Muy lejo',
  },
};

export function Customizationi18n() {
  const [language, setLanguage] = React.useState<string>('en');
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
      <FaceLivenessDetector
        sessionId={'sessionId'}
        region="us-east-1"
        onAnalysisComplete={async () => {}}
        displayText={dictionary[language]}
      />
    </>
  );
}
