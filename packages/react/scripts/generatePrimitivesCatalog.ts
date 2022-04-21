import fs from 'fs';
import path from 'path';
import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';
import {
  PrimitiveCatalog,
  PrimitiveCatalogComponentProperties,
  PrimitiveCatalogComponentProperty,
  PrimitiveCatalogComponentPropertyType,
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
};

/**
 * Determine if a TypeScript AST Node is a React component
 */
const isPrimitive = (node: Node): node is VariableDeclaration => {
  const typeName = node.getType().getText(node);
  return (
    Node.isVariableDeclaration(node) &&
    (typeName.startsWith('Primitive') ||
      typeName.startsWith('React.ForwardRef'))
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

/**
 * Get a catalog-compatible component property definition
 */
const getCatalogComponentProperty = (
  property: Symbol
): PrimitiveCatalogComponentProperty => {
  const propType = property.getDeclarations()[0].getType();

  if (!propType) {
    return;
  } else if (propType.isBoolean() || propType.isBooleanLiteral()) {
    return { type: PrimitiveCatalogComponentPropertyType.Boolean };
  } else if (propType.isString() || propType.isStringLiteral()) {
    return { type: PrimitiveCatalogComponentPropertyType.String };
  } else if (propType.isNumber() || propType.isNumberLiteral()) {
    return { type: PrimitiveCatalogComponentPropertyType.Number };
  } else if (propType.isUnion()) {
    const hasNumber = propType
      .getUnionTypes()
      .every((prop) => prop.isNumber() || prop.isNumberLiteral());

    const hasString = propType
      .getUnionTypes()
      .some((prop) => prop.isStringLiteral() || prop.isString());

    if (hasNumber) {
      return {
        type: PrimitiveCatalogComponentPropertyType.Number,
      };
    }

    if (hasString) {
      return {
        type: PrimitiveCatalogComponentPropertyType.String,
      };
    }
  }
};

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '..', 'tsconfig.json'),
});

const source = project.getSourceFile('src/primitives/components.ts');
const catalog: PrimitiveCatalog = {};

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

    if (signature && signature.getParameters().length > 0) {
      properties = getComponentProperties(
        signature.getParameters()[0].getValueDeclaration().getType()
      );
    }
  }

  // Skip primitives without properties
  if (Object.keys(properties).length > 0) {
    if (priorityProps.hasOwnProperty(componentName)) {
      priorityProps[componentName].forEach((prop) => {
        if (properties.hasOwnProperty(prop)) {
          properties[prop].priority = true;
        } else {
          console.log(`Skipping ${prop} on ${componentName}`);
        }
      });
    }
    catalog[componentName] = { properties };
  }
}

/**
 * Generate the JSON string of the PrimitiveCatalog
 * this is being exported under the /primitives.json subpath and can be used as
 * import PrimitiveCatalog from '@aws-amplify/ui-react/primitives.json'
 */
const jsonString = JSON.stringify(catalog, null, 2);

/**
 * Generate the es module of the PrimitiveCatalog
 * this is being exported under the /internal/primitives-catalog subpath and can be used as
 * import { PrimitiveCatalog } from '@aws-amplify/ui-react/internal/primitives-catalog'
 */
const exportString = `export const PrimitiveCatalog = ${jsonString};`;

// Generates dist/primitives.js file
const JSONoutputPath = path.resolve(__dirname, '..', 'dist', 'primitives.json');
const internalOutputPath = path.resolve(
  __dirname,
  '..',
  'dist/esm',
  'primitives-catalog.js'
);
fs.writeFileSync(JSONoutputPath, jsonString);
fs.writeFileSync(internalOutputPath, exportString);
