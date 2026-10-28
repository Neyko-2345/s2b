import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadModules(directory) {
  const files = (await readdir(directory, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isFile() &&
        extname(entry.name) === ".js" &&
        !entry.name.startsWith("_"),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return Promise.all(
    files.map(async (file) => {
      const modulePath = pathToFileURL(join(directory, file.name)).href;
      const loadedModule = await import(modulePath);

      if (!loadedModule.default) {
        throw new Error(`Module ${file.name} must have a default export.`);
      }

      return loadedModule.default;
    }),
  );
}
