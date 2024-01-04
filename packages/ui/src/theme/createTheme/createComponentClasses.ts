interface ComponentClassesProps {
  modifier?: Array<string | undefined>;
  element?: Array<string | undefined>;
}

export function createComponentClasses({ name = '', prefix = 'amplify-' }) {
  return (props?: ComponentClassesProps) => {
    const baseComponentClassName = `${prefix}${name}`;
    if (!props) {
      return baseComponentClassName;
    }

    const className = Array.isArray(props.element)
      ? `${baseComponentClassName}__${props.element.join('__')}`
      : baseComponentClassName;
    const classNames = [className];

    if (Array.isArray(props.modifier)) {
      props.modifier.forEach((modifier) => {
        if (!modifier) {
          return;
        }
        classNames.push(`${className}--${modifier}`);
      });
    }

    return classNames.join(' ');
  };
}
