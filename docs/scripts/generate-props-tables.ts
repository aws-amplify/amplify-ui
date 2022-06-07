import fs from 'fs';
import path from 'path';

import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';
import {
  PrimitiveCatalog,
  PrimitiveCatalogComponentProperties,
  PrimitiveCatalogComponentProperty,
  PrimitiveCatalogComponentPropertyType,
} from '../../packages/react/src/types/catalog';

const project = new Project({
  tsConfigFilePath: path.resolve(
    __dirname,
    '../../packages/react/tsconfig.json'
  ),
});

const source = project.getSourceFile(
  path.resolve(__dirname, '../../packages/react/src/primitives/components.ts')
);

function getCatalog() {
  const catalog: PrimitiveCatalog = {};

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
      catalog[componentName] = { properties };
    } else {
      console.log(`Skip ${componentName} since it's without properties.`);
    }
  }
  return catalog;
}

const catalog = getCatalog();

console.log('⭐ Catalog: ', JSON.stringify(catalog, null, 2));

/**
 * Determine if a TypeScript AST Node is a React component
 */
function isPrimitive(node: Node): node is VariableDeclaration {
  const typeName = node.getType().getText(node);
  return (
    Node.isVariableDeclaration(node) &&
    (typeName.startsWith('Primitive') ||
      typeName.startsWith('React.ForwardRef'))
  );
}

function getComponentProperties(type: Type) {
  const properties: PrimitiveCatalogComponentProperties = {};

  type.getProperties().forEach((prop) => {
    const propName = prop.getName();
    const property = getCatalogComponentProperty(prop);

    if (property) {
      properties[propName] = property;
    }
  });

  return properties;
}

/**
 * Get a catalog-compatible component property definition
 */
function getCatalogComponentProperty(
  property: Symbol
): PrimitiveCatalogComponentProperty {
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
}

function isCallableNode(node: Node): node is VariableDeclaration {
  return node.getType().getCallSignatures().length > 0;
}
