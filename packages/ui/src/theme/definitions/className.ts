import type { BaseProperties } from './defineThemeDefinition';

type ClassNameModifiers<T> = {
  // as `boolean` modifiers do not have modifier keys and extend from `BaseProperties`,
  // check for whether `T[K]` extends from `BaseProperties` to determine whether the
  // allowed values for `K` should be the modifier keys or `boolean`
  [K in keyof T]?: T[K] extends BaseProperties ? boolean : keyof T[K];
};

type ResolveKeyValue<T, K, U> = T extends `_elements`
  ? K
  : T extends '_modifiers'
  ? U
  : never;

interface BaseClassNameParams
  extends Partial<Record<'_modifiers' | '_elements', unknown>> {}

type ClassNamesParams<
  T extends BaseClassNameParams,
  ElementName = keyof T['_elements'],
  Modifiers = ClassNameModifiers<T['_modifiers']>,
> = {
  [K in keyof T as ResolveKeyValue<
    K,
    'element',
    'modifiers'
  >]?: ResolveKeyValue<K, ElementName, Modifiers>;
};

export type ClassNameCallback<T extends BaseClassNameParams> = (
  params?: ClassNamesParams<T>
) => string;
