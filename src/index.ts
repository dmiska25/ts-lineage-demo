// File: src/index.ts
import { Project } from "ts-morph";
import fs from "fs";

const project = new Project();
project.addSourceFilesAtPaths("src/models/**/*.ts");

const edges: { from: string; to: string }[] = [];

project.getSourceFiles().forEach((file) => {
  file.getClasses().forEach((cls) => {
    const className = cls.getName();
    const constructor = cls.getConstructors()[0];

    if (!constructor) return;

    const paramMap = new Map<string, string>();

    // Map variable name → class name
    constructor.getParameters().forEach((param) => {
      const name = param.getName();
      const type = param.getType().getSymbol()?.getName();
      if (type) {
        paramMap.set(name, type);
      }
    });

    constructor.getStatements().forEach((stmt) => {
      const text = stmt.getText();
      const match = text.match(/this\.(\w+)\s*=\s*(.+)/);
      if (match) {
        const [, targetProp, expr] = match;
        const fromMatches = [...expr.matchAll(/(\w+)\.(\w+)/g)];

        fromMatches.forEach(([, obj, prop]) => {
          const sourceClass = paramMap.get(obj);
          if (sourceClass) {
            edges.push({
              from: `${sourceClass}.${prop}`,
              to: `${className}.${targetProp}`,
            });
          }
        });
      }
    });
  });
});

fs.writeFileSync("visualize/edges.json", JSON.stringify(edges, null, 2));
console.log("✅ Lineage edges written to visualize/edges.json");
