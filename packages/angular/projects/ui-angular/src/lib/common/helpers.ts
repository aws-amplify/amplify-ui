import { defaultFormFieldOptions } from '@aws-amplify/ui';
import { AttributeInfoProvider } from './types';

export const getAttributeMap: AttributeInfoProvider = () =>
  defaultFormFieldOptions;

export const warnMissingProp = (
  componentName: string,
  propName: string,
  propValue: unknown
) => {
  if (!propValue) {
    console.error(
      `<${componentName} > component requires \`${propName}\` prop.`
    );
  }
};
