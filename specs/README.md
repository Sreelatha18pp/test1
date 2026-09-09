Allure Report Setup for Playwright
This project uses allure-playwright to create an Allure report from Playwright test results.

Prerequisites
Node.js and npm are installed.
Playwright is already installed in the project.
The Allure command-line tool is available on the PATH.
To check the tools, run:

node --version
npm --version
npx playwright --version
allure --version
Install Allure in an Existing Project
Open a terminal in the Playwright project root.

cd path\to\PlaywrightAIProject
Install the Playwright adapter as a development dependency.

npm install --save-dev allure-playwright
Install the Allure command-line tool if it is not already available. On Windows, one option is:

npm install --global allure-commandline
Add the Allure reporter to playwright.config.ts. Keep the existing reporters if you still need them:

reporter: [
  ['html'],
  ['allure-playwright'],
],
Add npm scripts to package.json:

{
  "scripts": {
	 "test:allure": "playwright test",
	 "allure:generate": "allure generate allure-results --clean -o allure-report",
	 "allure:open": "allure open allure-report",
	 "test:allure:report": "npm run test:allure && npm run allure:generate"
  }
}
Add generated folders to .gitignore:

/allure-results/
/allure-report/
Run Tests and Generate the Report
Run the full Playwright suite and generate the report:

npm run test:allure:report
This command:

Runs all tests.
Writes raw Allure data to allure-results.
Creates the HTML report in allure-report.
To run the steps separately:

npm run test:allure
npm run allure:generate
Open the generated report with:

npm run allure:open
The report entry point is allure-report/index.html.

Useful Commands
Run only authentication tests and then generate a report:

npm run test:auth
npm run allure:generate
npm run allure:open
List tests without running them:

npx playwright test --list
Regenerate the report from the latest results:

npm run allure:generate
Troubleshooting
allure is not recognized: install allure-commandline globally and restart the terminal.
Empty report: run the Playwright tests first and confirm that allure-results contains files.
Stale results: delete allure-results and run the tests again before generating the report.
Browser launch errors: install the Playwright browsers with npx playwright install.
