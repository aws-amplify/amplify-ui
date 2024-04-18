import { BaseTheme, ComponentTheme } from '../components/utils';

// Gets the element names in a theme
type ElementNames<T extends BaseTheme> = keyof T['_element'];

type EN<T extends BaseTheme> = T extends { _element?: any }
  ? keyof T['_element']
  : never;

type MN<T extends BaseTheme> = T extends { _modifiers?: any }
  ? Arrayify<keyof T['_modifiers']>
  : never;

// Gets the modifiers of an element within a theme
type ModifierNames<
  T extends BaseTheme,
  E extends ElementNames<T>,
> = T['_element'][E] extends { _modifiers?: any }
  ? Arrayify<keyof T['_element'][E]['_modifiers']>
  : null;

// Gets the root modifiers of a theme
type RootModifierNames<T extends BaseTheme> = Arrayify<
  keyof T['_modifiers'] | undefined
>;
type Arrayify<T> = T | T[];

export type ClassNameArgs<T extends BaseTheme> = {
  _element?: EN<T> extends never
    ? never
    :
        | EN<T>
        | {
            [Key in EN<T>]?: MN<T['_element'][Key]>;
          };
  _modifiers?: RootModifierNames<T>;
};

export type ClassNameFunction<T extends ComponentTheme = ComponentTheme> = (
  props?: ClassNameArgs<UnwrapTheme<T>>
) => string;

// This will take a theme which could be either a plain object or a function that returns a plain object
// and makes it the plain object
type UnwrapTheme<ThemeType extends ComponentTheme = ComponentTheme> =
  ThemeType extends (...args: any) => any ? ReturnType<ThemeType> : ThemeType;
