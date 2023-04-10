import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Theme, ThemeProvider, useTheme } from '@aws-amplify/ui-react';

export function CustomizationTheme() {
  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Liveness Example Theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.neutral['90'].value,
          },
          secondary: {
            value: tokens.colors.neutral['100'].value,
          },
        },
        font: {
          primary: {
            value: tokens.colors.white.value,
          },
        },
        brand: {
          primary: {
            '10': tokens.colors.teal['100'],
            '80': tokens.colors.teal['40'],
            '90': tokens.colors.teal['20'],
            '100': tokens.colors.teal['10'],
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <FaceLivenessDetector
        sessionId={'sessionId'}
        region={'us-east-1'}
        onAnalysisComplete={async () => {}}
      />
    </ThemeProvider>
  );
}
