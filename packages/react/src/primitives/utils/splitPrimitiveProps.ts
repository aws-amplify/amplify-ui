import {
  AllStyleProps,
  BaseStyleProps,
  ComponentPropsToStylePropsMap,
  FlexContainerStyleProps,
} from '../types';

interface SplitProps<PrimitiveProps> {
  styleProps: AllStyleProps;
  rest: Partial<
    Omit<PrimitiveProps, keyof FlexContainerStyleProps | keyof BaseStyleProps>
  >;
}

const isStyleKey = (prop: string): prop is keyof AllStyleProps => {
  return prop in ComponentPropsToStylePropsMap;
};

/**
 * This function splits props into style props and non-style props. This is used
 * on Field primitives so we can apply style props on the wrapper element and
 * the rest on the input.
 * @param props this should be a destructured `rest` from the component's props
 */
export const splitPrimitiveProps = <
  PrimitiveProps extends Record<string, unknown>
>(
  props: PrimitiveProps
): SplitProps<PrimitiveProps> => {
  const splitProps: SplitProps<PrimitiveProps> = {
    styleProps: {},
    rest: {},
  };

  Object.keys(props).forEach((prop) => {
    if (isStyleKey(prop)) {
      // we know it is a style key
      // so we know we can assign the key in styleProps
      splitProps.styleProps = {
        ...splitProps.styleProps,
        [prop]: props[prop],
      };
    } else {
      splitProps.rest = {
        ...splitProps.rest,
        [prop]: props[prop],
      };
    }
  });

  return splitProps;
};
