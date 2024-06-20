import { isObject, isString } from '../../utils';
import { ComponentThemeFromName } from '../components';
import { BaseTheme } from '../components/utils';

// Gets the element names in a theme
type ElementNames<T extends unknown> = T extends { _element?: any }
  ? keyof Required<T['_element']>
  : never;

// Gets the modifiers of an element within a theme
type ModifierNames<T extends unknown> = T extends { _modifiers?: any }
  ? Arrayify<keyof Required<T['_modifiers']>>
  : never;

type Arrayify<T> = T | T[];

export type ClassNameArgs<T extends BaseTheme> = {
  _element?:
    | ElementNames<Required<T>>
    | {
        [Key in ElementNames<Required<T>>]?: ModifierNames<
          Required<Required<Required<T>['_element']>[Key]>
        >;
      };
  _modifiers?: ModifierNames<Required<T>>;
};

export type ClassNameFunction<
  T extends BaseTheme = BaseTheme,
  NameType extends string = string,
> = (
  props?: ClassNameArgs<UnwrapTheme<ComponentThemeFromName<NameType, T>>>
) => string;

// This will take a theme which could be either a plain object or a function that returns a plain object
// and makes it the plain object
type UnwrapTheme<ThemeType extends BaseTheme = BaseTheme> = ThemeType extends (
  ...args: any
) => any
  ? ReturnType<ThemeType>
  : ThemeType;

export function createComponentClasses<
  ThemeType extends BaseTheme,
  NameType extends string = string,
>({ name, prefix = 'amplify-' }: { name: NameType; prefix?: string }) {
  const className: ClassNameFunction<ThemeType, NameType> = (props) => {
    const baseComponentClassName = `${prefix}${name}`;
    if (!props) {
      return baseComponentClassName;
    }

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

const c = createComponentClasses({ name: 'alert' });
