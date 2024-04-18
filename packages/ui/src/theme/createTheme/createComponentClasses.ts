import { isObject, isString } from '../../utils';
import { BaseTheme, ComponentTheme } from '../components/utils';

// Gets the element names in a theme
type ElementNames<T extends BaseTheme> = T extends { _element?: any }
  ? keyof T['_element']
  : never;

// Gets the modifiers of an element within a theme
type ModifierNames<T extends unknown> = T extends { _modifiers?: any }
  ? Arrayify<keyof T['_modifiers']>
  : never;

// Gets the root modifiers of a theme
type RootModifierNames<T extends BaseTheme> = Arrayify<
  keyof T['_modifiers'] | undefined
>;
type Arrayify<T> = T | T[];

type ClassNameArgs<T extends BaseTheme> = {
  _element?: ElementNames<T> extends never
    ? never
    :
        | ElementNames<T>
        | {
            [Key in ElementNames<T>]?: ModifierNames<T['_element'][Key]>;
          };
  _modifiers?: RootModifierNames<T>;
};

export type ClassNameFunction<T extends BaseTheme = BaseTheme> = (
  props?: ClassNameArgs<UnwrapTheme<T>>
) => string;

// This will take a theme which could be either a plain object or a function that returns a plain object
// and makes it the plain object
type UnwrapTheme<ThemeType extends BaseTheme = BaseTheme> = ThemeType extends (
  ...args: any
) => any
  ? ReturnType<ThemeType>
  : ThemeType;

export function createComponentClasses<ThemeType extends BaseTheme>({
  name = '',
  prefix = 'amplify-',
}) {
  const className: ClassNameFunction<ThemeType> = (props) => {
    const baseComponentClassName = `${prefix}${name}`;
    if (!props) {
      return baseComponentClassName;
    }

    // this is kinda weird
    const el = isString(props._element)
      ? props._element
      : isObject(props._element)
      ? Object.keys(props._element)[0]
      : undefined;

    const className = el
      ? `${baseComponentClassName}__${el}`
      : baseComponentClassName;
    const classNames = [className];

    if (el) {
      const modifiers = props._element[el];
      if (Array.isArray(modifiers)) {
        modifiers.forEach((modifier) => {
          if (!modifier || !isString(modifier)) {
            return;
          }
          classNames.push(`${className}--${modifier}`);
        });
      }
      if (isString(modifiers)) {
        classNames.push(`${className}--${modifiers}`);
      }
    }

    if (Array.isArray(props._modifiers)) {
      props._modifiers.forEach((modifier) => {
        if (!modifier || !isString(modifier)) {
          return;
        }
        classNames.push(`${className}--${modifier}`);
      });
    }

    if (isString(props._modifiers)) {
      classNames.push(`${className}--${props._modifiers}`);
    }

    return classNames.join(' ');
  };
  return className;
}
