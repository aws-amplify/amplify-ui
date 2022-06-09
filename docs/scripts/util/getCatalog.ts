import path from 'path';

import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';
import { getAllTypesData } from './getAllTypesData';
import { capitalizeString } from '../../src/utils/capitalizeString';
import {
  ComponentName,
  Category,
  SharedCategory,
  Property,
  Properties,
  Catalog,
} from '../types/catalog';

const allTypesData = getAllTypesData();

const project = new Project({
  tsConfigFilePath: path.resolve(
    __dirname,
    '../../../packages/react/tsconfig.json'
  ),
});

const source = project.getSourceFile(
  path.resolve(
    __dirname,
    '../../../packages/react/src/primitives/components.ts'
  )
);

/**
 * @description getCatalog function get props information for all components.
 * @returns catalog data object
 *  {
      componentName: {
        prop: {
          "name": string,
          "type": string,
          "description": "",
          "category": string,
        },
        ...
      }
      ...
    }
 */
export function getCatalog() {
  const catalog: Catalog = {} as Catalog;
  for (const [componentName, [node]] of source.getExportedDeclarations()) {
    let properties: Properties = {};
    if (isPrimitive(node)) {
      const [propsType] = node.getType().getTypeArguments();
      properties = getComponentProperties(
        propsType,
        componentName as ComponentName
      );
    } else if (isCallableNode(node)) {
      const [signature] = node.getType().getCallSignatures();

      if (signature && signature.getParameters().length) {
        properties = getComponentProperties(
          signature.getParameters()[0].getValueDeclaration().getType(),
          componentName as ComponentName
        );
      }
    }

    // Skip primitives without properties
    if (Object.keys(properties).length) {
      catalog[componentName as ComponentName] = { properties };
    } else {
      console.log(`Skip ${componentName} since it's without properties.`);
    }
  }

  return catalog;
}

/**
 * @name isPrimitive
 * @description Determine if a TypeScript AST Node is a React component
 */
function isPrimitive(node: Node): node is VariableDeclaration {
  const typeName = node.getType().getText(node);
  return (
    Node.isVariableDeclaration(node) &&
    (typeName.startsWith('Primitive') ||
      typeName.startsWith('React.ForwardRef'))
  );
}

/**
 * @name getComponentProperties
 * @description get all the properties for a component
 */
function getComponentProperties(
  type: Type,
  componentName: ComponentName
): Properties;
function getComponentProperties(type: Type, componentName: ComponentName) {
  const properties: Properties = {};

  type.getProperties().forEach((prop) => {
    const propName = prop.getName();

    const property = getCatalogComponentProperty(prop, componentName);

    if (property) {
      properties[propName] = property;
    }
  });

  return properties;
}

/**
 * @name getCatalogComponentProperty
 * @description Get a catalog-compatible component property definition
 */
function getCatalogComponentProperty(
  property: Symbol,
  componentName: ComponentName
): Property {
  const name = property.getName();
  const propType = property.getDeclarations()[0].getType();
  const description = property
    .getJsDocTags()
    .map((tag) => {
      const name = tag?.getName();
      const text = tag?.getText().map((el) => el.text);
      return `${name === 'description' ? '' : `${name}: `}${text}`;
    })
    .join('');
  const category = capitalizeString(
    getCategory(name, componentName)
  ) as Category;

  const type =
    allTypesData.get(category)?.get(name)?.get('type') ?? propType.getText(); // use type from allTypesData because it has a better-looking format

  return {
    name: sanitize(name),
    type: sanitize(type),
    description: sanitize(description),
    category: sanitize(category),
  };
}

function isCallableNode(node: Node): node is VariableDeclaration {
  return node.getType().getCallSignatures().length > 0;
}

/**
 * @name getCategory
 * @description categorize properties by checking if they belong to a certain property group.
 */
const sharedCategories: SharedCategory[] = [
  'Base',
  'Style',
  'Flex',
  'Grid',
  'Responsive',
];
function getCategory(propName: string, componentName: ComponentName): Category {
  const preSetCategories = { as: 'Base', ref: 'Base' };
  return (
    [componentName, ...sharedCategories].find((component) =>
      allTypesData.get(component)?.has(propName)
    ) ??
    preSetCategories[propName] ??
    'other'
  );
}

/**
 * @name sanitize
 * @description treat special characters
 * 1) "|", "<", ">", "`" => replace with character code, "&$<unicode>;"
 * 2) "' + '" => replace with space
 * 3) "\n" => replace with space
 */
function sanitize(string) {
  const tobeEncoded = new RegExp(/[|<>`]|'\s\+\s'|\\n/g);
  const getEncoded = (match) =>
    match.match(/[|<>`]/) ? `&#${match.charCodeAt()};` : ' ';

  return string.replaceAll(tobeEncoded, getEncoded);
}
