import fs from 'fs';
import path from 'path';
import { Project, Node, Symbol } from 'ts-morph';

const TOO_MANY_STRINGS = 20;

enum ComponentPropType {
  Boolean = 'boolean',
  String = 'string',
  Number = 'number',
  Any = 'any',
}

/**
 * Determine if a TypeScript AST Node is a React.FC instance
 */
const isReactComponent = (node: Node) =>
  Node.isVariableDeclaration(node) &&
  node.getType().getText(node).startsWith('Primitive');

/**
 * Remove double quotes from String literal types
 */
const cleanStringLiteral = (literal: string) => literal.replace(/"/g, '');

/**
 * Filter browser vendor prefixes (-webkit, -moz, -ms, ...)
 */
const isValidStringValue = (value: string) => !value.startsWith('-');

/**
 * Get a catalog-compatible type from a component property
 */
const getCatalogType = (property: Symbol) => {
  const propType = property.getValueDeclaration()?.getType();

  if (!propType) {
    return { type: ComponentPropType.Any };
  }

  if (propType.isBoolean() || propType.isBooleanLiteral()) {
    return { type: ComponentPropType.Boolean };
  } else if (propType.isString() || propType.isStringLiteral()) {
    return { type: ComponentPropType.String };
  } else if (propType.isNumber() || propType.isNumberLiteral()) {
    return { type: ComponentPropType.Number };
  } else if (propType.isUnion()) {
    const stringValues = propType
      .getUnionTypes()
      .filter((prop) => prop.isStringLiteral())
      .map((prop) => cleanStringLiteral(prop.getText()));

    /**
     * Editorial decision:
     * If there's too many options (like HTML Web colors), not include any
     */
    if (stringValues.length > TOO_MANY_STRINGS || stringValues.length === 0) {
      return {
        type: ComponentPropType.String,
      };
    }

    return {
      type: ComponentPropType.String,
      enum: stringValues.filter(isValidStringValue),
    };
  }

  return { type: ComponentPropType.Any };
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
  if (isReactComponent(node)) {
    const [propsType] = node.getType().getTypeArguments();
    const props = propsType.getProperties();

    catalog[componentName] = {
      properties: Object.fromEntries(
        props.map((prop) => [prop.getName(), getCatalogType(prop)])
      ),
    };
  }
}

// Generates dist/primitives.json file
const outputPath = path.resolve(__dirname, '..', 'dist', 'primitives.json');
fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
