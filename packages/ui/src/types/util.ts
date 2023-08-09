/**
 * Prevents usage of T from being automatically inferred.
 * see: https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
 */
export type NoInfer<T> = [T][T extends any ? 0 : never];

/**
 * Inproves readability of enumerable properties of an `Object` created from another `Object`,
 * for example types that have been created using `Omit` or `Pick`.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

@category Type
*/
type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
Matches any primitive, `Date`, or `RegExp` value.
*/
type BuiltIns = Primitive | Date | RegExp;

/**
@see PartialDeep
*/
export interface PartialDeepOptions {
  /**
	Whether to affect the individual elements of arrays and tuples.

	@default true
	*/
  readonly recurseIntoArrays?: boolean;
}

/**
Create a type from another type with all keys and nested keys set to optional.

Use-cases:
- Merging a default settings/config object with another object, the second object would be a deep partial of the default object.
- Mocking and testing complex entities, where populating an entire object with its keys would be redundant in terms of the mock or test.

@example
```
const settings: Settings = {
	textEditor: {
		fontSize: 14;
		fontColor: '#000000';
		fontWeight: 400;
	}
	autocomplete: false;
	autosave: true;
};

const applySavedSettings = (savedSettings: PartialDeep<Settings>) => {
	return {...settings, ...savedSettings};
}

settings = applySavedSettings({textEditor: {fontWeight: 500}});
```

By default, this also affects array and tuple types:

```

interface Settings {
	languages: string[];
}

const partialSettings: PartialDeep<Settings> = {
	languages: [undefined]
};
```

If this is undesirable, you can pass `{recurseIntoArrays: false}` as the second type argument.

@category Object
@category Array
@category Set
@category Map
*/
export type PartialDeep<
  T,
  Options extends PartialDeepOptions = {}
> = T extends BuiltIns
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? PartialMapDeep<KeyType, ValueType, Options>
  : T extends Set<infer ItemType>
  ? PartialSetDeep<ItemType, Options>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? PartialReadonlyMapDeep<KeyType, ValueType, Options>
  : T extends ReadonlySet<infer ItemType>
  ? PartialReadonlySetDeep<ItemType, Options>
  : T extends (...args: any[]) => unknown
  ? T | undefined
  : T extends object
  ? T extends ReadonlyArray<infer ItemType> // Test for arrays/tuples, per https://github.com/microsoft/TypeScript/issues/35156
    ? Options['recurseIntoArrays'] extends false // If they opt out of array testing, just use the original type
      ? T
      : ItemType[] extends T // Test for arrays (non-tuples) specifically
      ? readonly ItemType[] extends T // Differentiate readonly and mutable arrays
        ? ReadonlyArray<PartialDeep<ItemType | undefined, Options>>
        : Array<PartialDeep<ItemType | undefined, Options>>
      : PartialObjectDeep<T, Options> // Tuples behave properly
    : PartialObjectDeep<T, Options>
  : unknown;

/**
Same as `PartialDeep`, but accepts only `Map`s and as inputs. Internal helper for `PartialDeep`.
*/
interface PartialMapDeep<KeyType, ValueType, Options extends PartialDeepOptions>
  extends Map<PartialDeep<KeyType, Options>, PartialDeep<ValueType, Options>> {}

/**
Same as `PartialDeep`, but accepts only `Set`s as inputs. Internal helper for `PartialDeep`.
*/
interface PartialSetDeep<T, Options extends PartialDeepOptions>
  extends Set<PartialDeep<T, Options>> {}

/**
Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.
*/
interface PartialReadonlyMapDeep<
  KeyType,
  ValueType,
  Options extends PartialDeepOptions
> extends ReadonlyMap<
    PartialDeep<KeyType, Options>,
    PartialDeep<ValueType, Options>
  > {}

/**
Same as `PartialDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `PartialDeep`.
*/
interface PartialReadonlySetDeep<T, Options extends PartialDeepOptions>
  extends ReadonlySet<PartialDeep<T, Options>> {}

/**
Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.
*/
type PartialObjectDeep<
  ObjectType extends object,
  Options extends PartialDeepOptions
> = {
  [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType], Options>;
};
