import fs from 'fs';
import path from 'path';
import { Node, Project, Symbol, VariableDeclaration } from 'ts-morph';

enum ComponentPropType {
  Boolean = 'boolean',
  String = 'string',
  Number = 'number',
  Any = 'any',
}

/**
 * Determine if a TypeScript AST Node is a React.FC instance
 */
const isPrimitive = (node: Node): node is VariableDeclaration =>
  Node.isVariableDeclaration(node) &&
  node.getType().getText(node).startsWith('Primitive');

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

const source = project.getSourceFile('src/index.tsx');
const catalog: Record<string, object> = {};

/**
 * Extract properties from exported React components
 */
for (const [componentName, [node]] of source.getExportedDeclarations()) {
  if (isPrimitive(node)) {
    const properties = {};
    const [propsType] = node.getType().getTypeArguments();

    propsType.getProperties().forEach((prop) => {
      const propName = prop.getName();
      const propType = getCatalogType(prop);

      if (propType) {
        properties[propName] = propType;
      }
    });

    catalog[componentName] = {
      properties,
    };
  }
}

// Generates dist/primitives.json file
const outputPath = path.resolve(__dirname, '..', 'dist', 'primitives.json');
fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
