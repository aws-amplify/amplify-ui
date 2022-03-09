// Source: https://github.com/radix-ui/primitives/blob/7ae63b6cce6ea53ea5d65b6d411894c004b38f47/packages/react/use-layout-effect/src/useLayoutEffect.tsx
import * as React from 'react';

/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
const useLayoutEffect = Boolean(globalThis?.document)
  ? React.useLayoutEffect
  : () => {};

export { useLayoutEffect };
