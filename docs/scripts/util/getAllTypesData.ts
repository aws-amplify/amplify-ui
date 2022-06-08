import fs from 'fs';
import path from 'path';
import { Project, PropertySignature, TypeAliasDeclaration } from 'ts-morph';
import { capitalizeString } from '../../src/utils/capitalizeString';

export const getAllTypesData = () => {
  const project = new Project({
    tsConfigFilePath: path.resolve(
      __dirname,
      '../../../packages/react/tsconfig.json'
    ),
  });

  const source = project.getSourceFile(
    path.resolve(
      __dirname,
      '../../../packages/react/src/primitives/types/index.ts'
    )
  );

  const allTypeFilesData = new Map();

  const allTypeFiles = source.getReferencedSourceFiles();

  allTypeFiles.forEach((typeFile) => {
    const typeFileName = capitalizeString(
      typeFile.getBaseName().slice(0, typeFile.getBaseName().indexOf('.ts'))
    );
    const typeFileData = new Map();
    const typeAliases = typeFile.getTypeAliases();
    if (typeAliases) {
      typeAliases.forEach((typeAlias) => {
        setTypeData(typeAlias, typeFileData);
      });
    }

    typeFile.getInterfaces().forEach((typeInterface) => {
      typeInterface.getProperties().forEach((typeProperty) => {
        setTypeData(typeProperty, typeFileData);
      });
    });

    allTypeFilesData.set(typeFileName, typeFileData);

    fs.writeFileSync(typeFile.getFilePath(), typeFile.getFullText());
  });

  return allTypeFilesData;
};

/**
 * @name setTypeData
 * @description set property information for TypeAlias and Interfaces to typeFileData.
 */
function setTypeData(
  typeProp: TypeAliasDeclaration | PropertySignature,
  typeFileData: Map<string, Map<string, string | object>>
) {
  const typeData = new Map();
  const typeJsDocs = typeProp.getJsDocs();
  const typeDescription = typeJsDocs[0]?.getTags().reduce(
    (descriptions, tag) => ({
      ...descriptions,
      [tag.getTagName()]: tag.getText(),
    }),
    {}
  );
  const typeName = typeProp.getNameNode().getText();
  const typeType = typeProp.getTypeNode().getText();

  typeData.set('name', typeName);
  typeData.set('type', typeType);
  typeData.set('description', typeDescription);
  typeFileData.set(typeName, typeData);
}
