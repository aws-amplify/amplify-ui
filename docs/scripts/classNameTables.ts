import fs from 'fs';
import path from 'path';
import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../../packages/ui/tsconfig.json'),
});

const source = project.getSourceFile(
  path.resolve(__dirname, '../../packages/ui/src/theme/components/index.ts')
);

const componentClassnames: Record<string, string[]> = {};

// get all the types and log the members to console
for (const [componentName, [node]] of source.getExportedDeclarations()) {
  if (componentName === 'AllComponentThemes') {
    node
      .getType()
      .getProperties()
      .forEach((component) => {
        componentClassnames[component.getName()] = [];
        component
          .getTypeAtLocation(node)
          .getProperties()
          .filter((p) => {
            return ['_modifiers', '_element'].includes(p.getName());
          })
          .forEach((p) => {
            p.getTypeAtLocation(node)
              .getProperties()
              .forEach((q) => {
                if (p.getName() === '_element') {
                  // element
                  componentClassnames[component.getName()].push(
                    `${component.getName()}__${q.getName()}`
                  );
                  q.getTypeAtLocation(node)
                    .getProperties()
                    .filter((r) => {
                      return r.getName() === '_modifiers';
                    })
                    .forEach((r) => {
                      // element modifiers
                      r.getTypeAtLocation(node)
                        .getProperties()
                        .forEach((s) => {
                          componentClassnames[component.getName()].push(
                            `${component.getName()}__${q.getName()}--${s.getName()}`
                          );
                        });
                    });
                } else {
                  // modifiers
                  componentClassnames[component.getName()].push(
                    `${component.getName()}--${q.getName()}`
                  );
                }
              });
          });
      });
  }
}

fs.writeFileSync(
  path.join(__dirname, '../../docs/src/data/', `./classnames.json`),
  JSON.stringify(componentClassnames, null, 4)
);
