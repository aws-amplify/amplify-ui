import fs from 'fs';
import path from 'path';
import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';

enum ComponentPropType {
  Boolean = 'boolean',
  String = 'string',
  Number = 'number',
  Any = 'any',
}

/**
 * Determine if a TypeScript AST Node is a React.FC instance
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

const getTypeProperties = (type: Type) => {
  const properties = {};

  type.getProperties().forEach((prop) => {
    const propName = prop.getName();
    const propType = getCatalogType(prop);

    if (propType) {
      properties[propName] = propType;
    }
  });

  return properties;
};

/**
 * Get a catalog-compatible type from a component property
 */
const getCatalogType = (property: Symbol) => {
  const propType = property.getDeclarations()[0].getType();

  if (!propType) {
    return;
  } else if (propType.isBoolean() || propType.isBooleanLiteral()) {
    return { type: ComponentPropType.Boolean };
  } else if (propType.isString() || propType.isStringLiteral()) {
    return { type: ComponentPropType.String };
  } else if (propType.isNumber() || propType.isNumberLiteral()) {
    return { type: ComponentPropType.Number };
  } else if (propType.isUnion()) {
    const hasString = propType
      .getUnionTypes()
      .some((prop) => prop.isStringLiteral() || prop.isString());

    if (hasString) {
      return {
        type: ComponentPropType.String,
      };
    }
  }
};

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '..', 'tsconfig.json'),
});

const source = project.getSourceFile('src/primitives/components.ts');
const catalog: Record<string, object> = {};

/**
 * Extract properties from exported React components
 */
for (const [componentName, [node]] of source.getExportedDeclarations()) {
  let properties = {};

  if (isPrimitive(node)) {
    const [propsType] = node.getType().getTypeArguments();
    properties = getTypeProperties(propsType);
  } else if (isCallableNode(node)) {
    const [signature] = node.getType().getCallSignatures();

    if (signature && signature.getParameters().length > 0) {
      properties = getTypeProperties(
        signature.getParameters()[0].getValueDeclaration().getType()
      );
    }
  }

  // Skip primitives without properties
  if (Object.keys(properties).length > 0) {
    catalog[componentName] = properties;
  }
}

// Generates dist/primitives.json file
const outputPath = path.resolve(__dirname, '..', 'dist', 'primitives.json');
fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
