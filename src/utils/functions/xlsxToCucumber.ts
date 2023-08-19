import * as XLSX from "xlsx";
const fs = require("fs/promises");
const path = require("path");

async function readAndFormatExcelData(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const headers = data[0];
  const dataArray = data.slice(1);

  const formattedData = dataArray.map((row) => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index];
    });
    return rowData;
  });
  console.log(formattedData);
  return formattedData;
}

function generateScenarioGherkin(scenario: any) {
  return `Scenario: ${scenario["Scenario name"]}
            Given ${scenario["Given"]}
            When ${scenario["When"]}
            Then ${scenario["Then"]}

`;
}

async function createOrUpdateFeatureFile(
  filePath: string,
  featureName: string,
  scenarioGherkin: string
) {
  try {
    let content = "";

    try {
      content = await fs.readFile(filePath, "utf-8");
    } catch (error) {
      content = `Feature: ${featureName}\n\n`;
    }

    content += scenarioGherkin;

    await fs.writeFile(filePath, content, "utf-8");
    console.log(`Feature file '${filePath}' updated successfully.`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function generateFeatureFiles(
  excelFilePath: string,
  outputFolder: string
) {
  const formattedData = await readAndFormatExcelData(excelFilePath);

  for (const scenario of formattedData) {
    const featureName = scenario["Feature Name"];
    const scenarioGherkin = generateScenarioGherkin(scenario);

    const featureFilePath = path.join(outputFolder, `${featureName}.feature`);
    await createOrUpdateFeatureFile(
      featureFilePath,
      featureName,
      scenarioGherkin
    );
  }
}
