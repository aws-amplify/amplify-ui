import { isObject, isString } from '../../utils';
import { ButtonTheme } from '../components';
import { ComponentTheme } from '../components/utils';
import { ClassNameFunction } from './utils';

export function createComponentClasses<ThemeType extends ComponentTheme>({
  name = '',
  prefix = 'amplify-',
}) {
  const className: ClassNameFunction<ThemeType> = (props) => {
    const baseComponentClassName = `${prefix}${name}`;
    if (!props) {
      return baseComponentClassName;
    }
    // an element could be a string
    // or a key of an object
    // if there is an element

    // or there could just be top-level modifiers

    // TODO: make this work with new signature!
    const element = isString(props._element)
      ? props._element
      : Array.isArray(props._element)
      ? props._element.join('__')
      : undefined;

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
