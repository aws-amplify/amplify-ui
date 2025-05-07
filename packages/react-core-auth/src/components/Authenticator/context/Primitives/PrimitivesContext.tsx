import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { Platform } from '../Platform';
import type { PrimitivesDefault } from './types';

const { PrimitivesProvider, usePrimitives: usePrimitivesBase } =
  createContextUtilities<PrimitivesDefault>({
    contextName: 'Primitives',
    errorMessage:
      '`usePrimitives` must be called from within a `PrimitivesProvider`',
  });

// wrap `usePrimitivesBase` to allow consumers to pass in `Platform` type
// for platform specific Primitive typings
function usePrimitives<T extends Platform>(): PrimitivesDefault<T> {
  return usePrimitivesBase();
}

export { PrimitivesProvider, usePrimitives };
