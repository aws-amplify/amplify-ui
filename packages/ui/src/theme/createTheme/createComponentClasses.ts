import { isObject, isString, classNames, ClassNamesArgs } from '../../utils';
import { ComponentThemeFromName } from '../components';
import { BaseTheme } from '../components/utils';

// Gets the element names in a theme
type ElementNames<T extends unknown> = T extends { _element?: any }
  ? keyof Required<T['_element']>
  : never;

// Gets the modifiers of an element within a theme
type ModifierNames<T extends unknown> = T extends { _modifiers?: any }
  ? Arrayify<
      | keyof Required<T['_modifiers']>
      | {
          [key in keyof Required<T['_modifiers']>]?: boolean | null | undefined;
        }
      | undefined
    >
  : never;

type Arrayify<T> = T | T[];

// This type will take a component theme
// and turn it into the shape of the classname function
// for that component based on what is in the _element
// and _modifiers
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
  props?: ClassNameArgs<UnwrapTheme<ComponentThemeFromName<NameType, T>>>,
  extraClassnames?: ClassNamesArgs
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
  const className: ClassNameFunction<ThemeType, NameType> = (
    props = {},
    extraClassnames = []
  ) => {
    const baseComponentClassName = `${prefix}${name}`;

    // get the element if there is one
    // the _element argument can be a string
    // like { _element: 'icon' }
    // or it could be an object where the key is
    // the element name and the value is the modifiers
    // like { _element: { icon: [size] } }
    const element = isString(props._element)
      ? props._element
      : isObject(props._element)
      ? Object.keys(props._element)[0]
      : undefined;

    const className = element
      ? `${baseComponentClassName}__${element}`
      : baseComponentClassName;
    const names = [className];

    if (element) {
      const modifiers = props._element[element];
      names.push(...modifierClassnames({ className, modifiers }));
    } else {
      names.push(
        ...modifierClassnames({
          className,
          modifiers: props._modifiers as ModifierNames<BaseTheme>,
        })
      );
    }

    return classNames([...names, ...extraClassnames]);
  };
  return className;
}

function modifierClassnames({
  className,
  modifiers,
}: {
  className: string;
  modifiers: ModifierNames<BaseTheme>;
}) {
  if (Array.isArray(modifiers)) {
    return modifiers.map((modifier) => {
      if (!modifier || !isString(modifier)) {
        return;
      }
      return `${className}--${modifier}`;
    });
  }
  if (isObject(modifiers)) {
    return Object.entries(modifiers).map(([key, value]) => {
      if (value) {
        return `${className}--${key}`;
      }
    });
  }
  if (isString(modifiers)) {
    return [`${className}--${modifiers}`];
  }
  return [];
}
