import { LocationActionsDefault, LOCATION_ACTIONS_DEFAULT } from './defaults';
import { LocationAction, LocationActions } from './types';

export type ResolveLocationActions<T extends LocationActions> = Exclude<
  LocationActionsDefault,
  T
> &
  T;

export function resolveLocationActions<
  T extends
    | LocationActions
    | Record<keyof LocationActionsDefault, Omit<LocationAction, 'handler'>>,
>(
  actions?:
    | T
    | ((actionsDefault: LocationActionsDefault) => ResolveLocationActions<T>)
): ResolveLocationActions<T> {
  if (typeof actions === 'function') {
    return actions(LOCATION_ACTIONS_DEFAULT);
  }

  return {
    ...actions,
    ...Object.entries(LOCATION_ACTIONS_DEFAULT).reduce(
      (output, [key, { options }]) => ({
        ...output,
        [key]: actions?.[key as keyof LocationActionsDefault] ?? { options },
      }),
      {}
    ),
  } as ResolveLocationActions<T>;
}
