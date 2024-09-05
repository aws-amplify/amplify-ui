import { LocationActionsDefault, locationActionsDefault } from './defaults';
import { LocationActions } from './types';

export type ResolveLocationActions<T extends LocationActions> =
  T extends LocationActionsDefault
    ? LocationActionsDefault
    : {
        [K in keyof LocationActionsDefault]: K extends keyof T
          ? T[K]
          : LocationActionsDefault[K];
      } & Omit<T, keyof LocationActionsDefault>;

export function resolveLocationActions<T extends LocationActions>(
  actions?: T
): ResolveLocationActions<T> {
  return {
    ...actions,
    ...Object.entries(locationActionsDefault).reduce(
      (output, [key, { options }]) => ({
        ...output,
        [key]: actions?.[key as keyof LocationActionsDefault] ?? { options },
      }),
      {}
    ),
  } as ResolveLocationActions<T>;
}
