import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { DisplayTextDefault } from './types';

export const { DisplayTextContext, DisplayTextProvider, useDisplayText } =
  createContextUtilities<DisplayTextDefault>({
    errorMessage:
      '`useDisplayText` must be called inside a `DisplayTextProvider`',
    contextName: 'DisplayText',
  });
