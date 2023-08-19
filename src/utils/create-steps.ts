const {
  createStepFeatureFolders,
} = require("../src/utils/functions/folderCreation");
const {
  generateFeatureFiles,
} = require("../src/utils/functions/xlsxToCucumber");

class CreateFeatureAutomatically {
  constructor() {}
  start() {
    const excelFilePath = "src/util/resources/testplan1.xlsx";
    const outputFolder = "src/test/features/";
    createStepFeatureFolders();
    generateFeatureFiles(excelFilePath, outputFolder);
  }
}
