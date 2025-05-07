import { templateJoin } from '@aws-amplify/ui';

import type { LocationData } from '../actions';
import type { LocationValue, StoreProviderProps } from './types';

export const CONLICTING_PROPS =
  '`StorageBrowser` has been been provided with both `value` and `defaultValue` props. StorageBrowser must be either controlled or uncontrolled (specify either the `value` prop, or the `defaultValue` prop, but not both). Decide between using a controlled or uncontrolled `StorageBrowser` and remove one of these props.';

export const READONLY =
  'A `value` prop has been provided to `StorageBrowser` without `onValueChange`. This will render a read-only `StorageBrowser`. If the `StorageBrowser` should be mutable use `defaultValue`, otherwise set `onValueChange`.';

export const MISSING_REQUIRED =
  'A `value` prop has been provided to `StorageBrowser` without all required `location` parameters. `StorageBrowser` will ignore the provided `location`. Missing `location` parameters: %s.';

export const DEPRECATED_SUFFIX =
  '`actionType`, `location` and `path` props have been deprecated and will be removed in a future major version. Provide the `value` prop for controlled behavior or the `defaultValue` prop for uncontrolled behavior.';
export const DEPRECATED_PROPS =
  '`StorageBrowser` has been provided with one or more deprecated props: %s. %s';
export const DEPRECATED_PROPS_AND_CONFLICTING =
  '`StorageBrowser` has been provided with deprecated props of %s that conflict with the `value` and `defaultValue` props. %s';

export const CHANGED_MODE =
  '`StorageBrowser` has changed from controlled to uncontrolled due to the `value` prop resolving to type `%s`. Switching between controlled and uncontrolled behaviors is not supported and may lead to unexpected behaviors.';

const REQUIRED_LOCATION_KEYS = ['bucket', 'permissions', 'prefix'] as const;

const DEPRECATED_PROP_KEYS = ['actionType', 'location', 'path'] as const;

const template = (key: string, index: number, values: string[]) =>
  `\`${key}\`${index < values.length - 1 ? ', ' : ''}`;

const getMissingLocationKeys = (
  location: LocationData | LocationValue | null
) =>
  location === null
    ? []
    : REQUIRED_LOCATION_KEYS.filter((key) => !location[key]);

let didWarnConflictingBehavior = false;
let didWarnDeprecatedAndConflictingProps = false;
let didWarnDeprecatedProps = false;
let didWarnMissingParameters = false;
let didWarnReadonly = false;
let didWarnChangedMode = false;
let initialMode: string;

export default function validateStoreProps(props: StoreProviderProps): void {
  // eslint-disable-next-line no-console
  const logError = console.error;

  const { defaultValue, location, onValueChange, value } = props;

  const deprecatedProps = templateJoin(
    DEPRECATED_PROP_KEYS.filter((key) => !!props[key]),
    template
  );

  if (
    !didWarnDeprecatedAndConflictingProps &&
    deprecatedProps &&
    (!!value || !!defaultValue)
  ) {
    logError(
      DEPRECATED_PROPS_AND_CONFLICTING,
      deprecatedProps,
      DEPRECATED_SUFFIX
    );
    didWarnDeprecatedAndConflictingProps = true;
  }

  if (
    !didWarnDeprecatedAndConflictingProps &&
    !didWarnDeprecatedProps &&
    deprecatedProps
  ) {
    logError(DEPRECATED_PROPS, deprecatedProps, DEPRECATED_SUFFIX);
    didWarnDeprecatedProps = true;
  }

  const hasConflictingProps = value && defaultValue;

  if (!didWarnConflictingBehavior && hasConflictingProps) {
    logError(CONLICTING_PROPS);
    didWarnConflictingBehavior = true;
  }

  const isReadonly = !hasConflictingProps && value && !onValueChange;

  if (!didWarnReadonly && isReadonly) {
    logError(READONLY);
    didWarnReadonly = true;
  }

  const missingParameters = value?.location
    ? templateJoin(getMissingLocationKeys(value.location), template)
    : location
    ? templateJoin(getMissingLocationKeys(location), template)
    : undefined;

  if (!didWarnMissingParameters && missingParameters) {
    logError(MISSING_REQUIRED, missingParameters);
    didWarnMissingParameters = true;
  }

  const mode = value === undefined ? 'uncontrolled' : 'controlled';
  if (!initialMode) initialMode = mode;

  if (!didWarnChangedMode && initialMode !== mode) {
    logError(CHANGED_MODE);
    didWarnChangedMode = true;
  }
}
