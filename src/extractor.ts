import { Project, SyntaxKind } from "ts-morph";
import fs from "fs";

const project = new Project();
project.addSourceFilesAtPaths("src/models/**/*.ts");

const output: any = {
  models: [],
  functions: [],
};

project.getSourceFiles().forEach((file) => {
  const filePath = file.getFilePath();

  // Extract all classes
  file.getClasses().forEach((cls) => {
    const model = {
      name: cls.getName(),
      file: filePath,
      fields: [] as any[],
    };

    cls.getConstructors().forEach((constructor) => {
      constructor.getStatements().forEach((stmt) => {
        const text = stmt.getText();
        const assignmentMatch = text.match(/this\.(\w+)\s*=\s*(.+)/);
        if (assignmentMatch) {
          const [, fieldName, rhs] = assignmentMatch;
          const deps = [...rhs.matchAll(/\b(\w+)\.(\w+)\b/g)].map(
            ([, obj, prop]) => `${obj}.${prop}`
          );
          const line = stmt.getStartLineNumber();
          model.fields.push({
            name: fieldName,
            assignment: rhs.trim(),
            dependencies: deps,
            sourceLocation: `constructor:line:${line}`,
          });
        }
      });
    });

    if (model.fields.length > 0) {
      output.models.push(model);
    }
  });

  // Extract top-level functions
  file.getFunctions().forEach((fn) => {
    output.functions.push({
      name: fn.getName(),
      file: filePath,
      params: fn.getParameters().map((p) => p.getName()),
      body: fn.getBodyText()?.trim(),
    });
  });
});

fs.writeFileSync(
  "visualize/semantic_graph.json",
  JSON.stringify(output, null, 2)
);
console.log("Semantic model written to visualize/semantic_graph.json");
