const fs = require("fs/promises");
const path = require("path");

export async function createStepFeatureFolders() {
  const baseDir = "src";

  try {
    const testFolder = path.join(baseDir, "test");

    try {
      await fs.access(testFolder);
      const subFolders = [
        "steps_definition",
        "features",
        "constants",
        "funciones",
      ];
      await createSubfolders(testFolder, subFolders);

      console.log(`Folders created successfully.`);
    } catch (error) {
      await fs.mkdir(testFolder, { recursive: true });
      console.log(`Test folder created successfully in '${baseDir}'.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
async function createSubfolders(folderPath: string, subFolders: string[]) {
  for (const subFolder of subFolders) {
    const subFolderPath = path.join(folderPath, subFolder);
    await fs.mkdir(subFolderPath, { recursive: true });
    console.log(`Subfolder '${subFolder}' created successfully.`);
  }
}
