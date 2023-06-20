import fs from 'fs';
import path from 'path';

import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';
import {
  PrimitiveCatalogType,
  PrimitiveCatalogComponentProperties,
  PrimitiveCatalogComponentProperty,
} from '../src/types/catalog';

/**
 * Because our types have a lot of noise, we want to mark the important props.
 * This is an interim solution!
 */
const fieldProps = [
  'label',
  'value',
  'placeholder',
  'descriptiveText',
  'size',
  'isDisabled',
];
const priorityProps = {
  Alert: ['variation', 'hasIcon', 'children', 'isDismissible'],
  Badge: ['children', 'variation', 'size'],
  Button: ['children', 'variation', 'size'],
  Card: ['variation'],
  CheckBoxField: ['label', 'labelPosition', 'size', 'isDisabled', 'checked'],
  Divider: ['orientation', 'size'],
  Flex: ['direction', 'justifyContent', 'alignItems', 'gap', 'wrap'],
  Heading: ['children', 'level'],
  Icon: ['color', 'width', 'height'],
  Image: ['src', 'width', 'height', 'alt', 'objectFit'],
  Pagination: ['totalPages', 'currentPage', 'siblingCount'],
  PasswordField: [...fieldProps, 'hideShowPassword', 'labelHidden'],
  PhoneNumberField: [...fieldProps, 'labelHidden'],
  Radio: ['value', 'checked', 'isDisabled', 'size', 'labelPosition'],
  Rating: ['value', 'size', 'maxValue', 'fillColor', 'emptyColor'],
  SearchField: [...fieldProps, 'variation', 'labelHidden'],
  SliderField: [
    ...fieldProps,
    'min',
    'max',
    'step',
    'thumbColor',
    'emptyTrackColor',
    'filledTrackColor',
    'orientation',
  ],
  StepperField: [
    ...fieldProps,
    'min',
    'max',
    'step',
    'labelHidden',
    'variation',
  ],
  SwitchField: [
    ...fieldProps,
    'isChecked',
    'thumbColor',
    'labelPosition',
    'isLabelHidden',
    'trackColor',
    'trackCheckedColor',
  ],
  Text: ['children', 'fontWeight', 'fontSize', 'color'],
  TextField: [...fieldProps, 'variation'],
  TextAreaField: [...fieldProps, 'resize', 'rows', 'maxLength', 'variation'],
};

/**
 * Get a catalog-compatible component property definition
 */
const getCatalogComponentProperty = (
  property: Symbol
): PrimitiveCatalogComponentProperty | undefined => {
  const propType = property.getDeclarations()[0].getType();

  if (!propType) {
    return;
  } else if (propType.isBoolean() || propType.isBooleanLiteral()) {
    return { type: 'boolean' };
  } else if (propType.isString() || propType.isStringLiteral()) {
    return { type: 'string' };
  } else if (propType.isNumber() || propType.isNumberLiteral()) {
    return { type: 'number' };
  } else if (propType.isUnion()) {
    const hasNumber = propType
      .getUnionTypes()
      .filter((prop) => !prop.isNull() && !prop.isUndefined()) // Filter out null and undefined since union types aren't supported in Studio
      .every((prop) => {
        return prop.isNumber() || prop.isNumberLiteral();
      });

    const hasBoolean = propType
      .getUnionTypes()
      .filter((prop) => !prop.isNull() && !prop.isUndefined())
      .every((prop) => {
        return prop.isBoolean() || prop.isBooleanLiteral();
      });

    const hasString = propType
      .getUnionTypes()
      .filter((prop) => !prop.isNull() && !prop.isUndefined())
      .some((prop) => prop.isStringLiteral() || prop.isString());

    if (hasNumber) {
      return {
        type: 'number',
      };
    }

    if (hasString) {
      return {
        type: 'string',
      };
    }

    if (hasBoolean) {
      return {
        type: 'boolean',
      };
    }
  }
};

/**
 * Determine if a TypeScript AST Node is a React component
 */
const isPrimitive = (node: Node): node is VariableDeclaration => {
  const typeName = node.getType().getText(node);
  return (
    Node.isVariableDeclaration(node) &&
    (typeName.startsWith('Primitive') ||
      typeName.startsWith('ForwardRefPrimitive'))
  );
};

const isCallableNode = (node: Node): node is VariableDeclaration =>
  node.getType().getCallSignatures().length > 0;

const getComponentProperties = (type: Type) => {
  const properties: PrimitiveCatalogComponentProperties = {};

  type.getProperties().forEach((prop) => {
    const propName = prop.getName();
    const property = getCatalogComponentProperty(prop);

    if (property) {
      properties[propName] = property;
    }
  });

  return properties;
};

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '..', 'tsconfig.json'),
});

const source = project.getSourceFile('src/primitives/components.ts');
const catalog: PrimitiveCatalogType = {};
if (!source) {
  throw new Error('Primitives components.ts export file not found');
}

/**
 * Extract properties from exported React components
 */
for (const [componentName, [node]] of source.getExportedDeclarations()) {
  let properties = {};

  if (isPrimitive(node)) {
    const [propsType] = node.getType().getTypeArguments();
    properties = getComponentProperties(propsType);
  } else if (isCallableNode(node)) {
    const [signature] = node.getType().getCallSignatures();

    const signatureParams = signature.getParameters();
    if (signature && signatureParams[0]) {
      const type = signatureParams[0].getValueDeclaration()!.getType();
      properties = getComponentProperties(type);
    }
  }

  // Skip primitives without properties
  if (Object.keys(properties).length > 0) {
    if (priorityProps[componentName]) {
      (priorityProps[componentName] as string[]).forEach((prop) => {
        if (properties[prop]) {
          (properties[prop] as { priority: boolean }).priority = true;
        } else {
          // eslint-disable-next-line no-console
          console.log(`Skipping ${prop} on ${componentName}`);
        }
      });
    }
    catalog[componentName] = { properties };
  }
}

/**
 * Generate the es module of the PrimitiveCatalog
 * this is being exported under the /internal/primitives-catalog subpath and can be used as
 * import { PrimitiveCatalog } from '@aws-amplify/ui-react/internal/primitives-catalog'
 */
const primitiveCatalog = JSON.stringify(catalog, null, 2);
const exportString = `import { PrimitiveCatalogType } from './types/catalog';
export const PrimitiveCatalog: PrimitiveCatalogType = ${primitiveCatalog};`;

const internalOutputPath = path.resolve(
  __dirname,
  '..',
  'src',
  'PrimitiveCatalog.ts'
);

fs.writeFileSync(internalOutputPath, exportString, { flag: 'w' });
