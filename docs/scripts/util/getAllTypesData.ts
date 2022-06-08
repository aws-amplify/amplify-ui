import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';

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
    const typeFileName = typeFile
      .getBaseName()
      .slice(0, typeFile.getBaseName().indexOf('.ts'));
    const typeFileData = new Map();
    const typeAliases = typeFile.getTypeAliases();
    if (typeAliases) {
      typeAliases.forEach((typeAlias) => {
        const typeAliasData = new Map();
        const typeAliasJsDocs = typeAlias.getJsDocs();
        const typeAliasDescription = typeAliasJsDocs[0]?.getDescription();
        const typeAliasName = typeAlias.getNameNode().getText();
        const typeAliasType = typeAlias.getTypeNode().getText();
        if (typeAliasDescription) {
          typeAliasJsDocs[0].set({
            description: '',
            tags: [
              {
                tagName: 'description',
                text: typeAliasDescription,
              },
            ],
          });
        }
        typeAliasData.set('name', typeAliasName);
        typeAliasData.set('type', typeAliasType);
        typeAliasData.set('description', typeAliasDescription);
        typeFileData.set(typeAliasName, typeAliasData);
      });
    }

    typeFile.getInterfaces().forEach((typeInterface) => {
      typeInterface.getProperties().forEach((typeProperty) => {
        const typeInterfaceData = new Map();
        const propertyJsDocs = typeProperty.getJsDocs()[0];
        const propertyDescription = propertyJsDocs?.getDescription();
        const propertyName = typeProperty.getNameNode().getText();
        const propertyType = typeProperty.getTypeNode().getText();

        if (propertyDescription) {
          propertyJsDocs.set({
            description: '',
            tags: [
              {
                tagName: 'description',
                text: propertyDescription,
              },
            ],
          });
        }
        typeInterfaceData.set('name', propertyName);
        typeInterfaceData.set('type', propertyType);
        typeInterfaceData.set('description', propertyDescription);
        typeFileData.set(propertyName, typeInterfaceData);
      });
    });

    allTypeFilesData.set(typeFileName, typeFileData);

    fs.writeFileSync(typeFile.getFilePath(), typeFile.getFullText());
  });

  return allTypeFilesData;
};

console.log('🐤 allTypesData', getAllTypesData());
