// allowed field suffixes
type FieldLabelSuffix = 'FieldLabel';
type FieldPlaceholderSuffix = 'FieldPlaceholder';

/**
 * For field component display text keys, customizable text properties use
 * either the label or placeholder suffixes respectively, example:
 * ```ts
 * type UsernameFieldPlaceholderKey = `username${FieldSuffix}`;
 *
 * const usernameFieldPlaceholderKey: UsernameFieldPlaceholderKey =
 *   'usernameFieldPlaceholder';
 * ```
 */
type FieldSuffix = FieldLabelSuffix | FieldPlaceholderSuffix;

/**
 * Non-field display text keys (button titles, descriptive text, etc) are suffixed
 * with `'Text'`, example:
 * ```ts
 * type SubmitButtonTextKey = `submitButton${TextSuffix}`;
 *
 * const submitButtonTextKey: SubmitButtonTextKey = 'submitButtonText';
 * ```
 */
type TextSuffix = 'Text';

/**
 * Dynamic display text function keys are prefixed with `'get'`, example:
 * ```ts
 * type GetCopyButtonTextKey = `${GetPrefix}CopyButton${TextSuffix}`;
 *
 * const getCopyButtonTextKey: GetCopyButtonTextKey = 'getCopyButtonText';
 * ```
 */
type GetPrefix = 'get';

/**
 * `DisplayTextBody` is intentionally unrestricted, but should describe
 * the context of its usage, for example the component name that renders
 * the text:
 * ```ts
 * type GetCopyButtonTextKey = `${GetPrefix}${DisplayTextBody}${TextSuffix}`;
 *
 * const getCopyButtonTextKey: GetCopyButtonTextKey = 'getCopyButtonText';
 * ```
 *
 * An additional caveat of `DisplayTextBody` is that it functions as
 * the prefix for generic display text as there is no additonal prefix
 * required, example:
 * ```ts
 * type SubmitButtonTextKey = `${DisplayTextBody}${TextSuffix}`;
 *
 * const submitButtonText: SubmitButtonTextKey = 'submitButtonText';
 * ```
 */
type DisplayTextBody = string;

// aggregate display text suffixes
type DisplayTextSuffix = FieldSuffix | TextSuffix;

// example: `getSomeText`
type DisplayTextFunctionKey =
  `${GetPrefix}${DisplayTextBody}${DisplayTextSuffix}`;

// example: `someText`
type DisplayTextStringKey = `${DisplayTextBody}${DisplayTextSuffix}`;

// example: `(isCopied: boolean) => string`
type DisplayTextFunction = (...args: any) => string | undefined;

// keys matching `DisplayTextFunctionKey` must be a function returning
// a display `string` or `undefined` for flexibility
type DisplayTextFunctions = Record<DisplayTextFunctionKey, DisplayTextFunction>;

// keys matching `DisplayTextStringKey` must be a `string``
type DisplayTextStrings = Record<DisplayTextStringKey, string>;

type IsDisplayTextFunction<T, K> = T extends DisplayTextFunctionKey
  ? K extends DisplayTextFunction
    ? T
    : never
  : never;

type IsDisplayTextString<T, K> = T extends DisplayTextStringKey
  ? K extends string
    ? T
    : never
  : never;

type FilterDisplayText<T, K> =
  | IsDisplayTextFunction<T, K>
  | IsDisplayTextString<T, K>;

/**
 * Display Text type utility for creating standardized `DisplayText` interfaces
 * for usage as public exports and extended with `Required` for default values.
 *
 * Example:
 * ```ts
 * type GetCopyButtonText = (hasCopied: boolean) => string | undefined;
 *
 * // public export, allows optional key/values
 * type SomeComponentDisplayText = DisplayTextTemplate<{
 *   getCopyButtonText?: GetCopyButtonText;
 *   submitButtonText?: string;
 *   usernameFieldLabel?: string;
 * }>;
 *
 * // default interface
 * type SomeComponentDisplayTextDefault = Required<SomeComponentDisplayText>;
 *
 * // default values
 * const someComponentDisplayText: SomeComponentDisplayTextDefault = {
 *   getCopyButtonText: (hasCopied) => (hasCopied ? 'Copied' : 'Copy'),
 *   submitButtonText: 'Submit',
 *   usernameFieldLabel: 'Username',
 * };
 * ```
 */
export type DisplayTextTemplate<
  T extends DisplayTextFunctions | DisplayTextStrings,
> = {
  // remove disallowed `displayText` keys
  [K in keyof T as FilterDisplayText<K, T[K]>]: T[K];
};
