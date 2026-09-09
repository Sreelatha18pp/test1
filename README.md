# Playwright Allure Reporting

This project uses Playwright with the Allure reporter to create test execution reports.

## Prerequisites

- Node.js and npm installed
- Java installed and available on `PATH` (required by the Allure command-line tool)
- Playwright browsers installed

Check the installations:

```bash
node --version
npm --version
java -version
```

## Install Allure in an Existing Playwright Project

### 1. Open the project directory

```bash
cd path/to/your/playwright-project
```

### 2. Install the Allure dependencies

Run this from the project root:

```bash
npm install --save-dev allure-playwright allure-commandline rimraf
```

- `allure-playwright` connects Playwright to Allure.
- `allure-commandline` generates and opens the report.
- `rimraf` removes previous result and report folders in a cross-platform way.

### 3. Install Playwright browsers

If the browsers have not been installed yet:

```bash
npx playwright install
```

### 4. Configure the Playwright reporter

Add the Allure reporter to `playwright.config.ts`:

```ts
reporter: [
  ['html'],
  ['allure-playwright', { resultsDir: 'allure-results', detail: true }],
],
```

The test results are written to `allure-results`.

### 5. Add npm scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test:allure": "rimraf allure-results allure-report && playwright test",
    "test:allure:report": "npm run test:allure && npm run allure:generate",
    "allure:generate": "allure generate allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report"
  }
}
```

### 6. Run the tests

```bash
npm run test:allure
```

This removes old generated files and runs the Playwright test suite. Allure result files are created in `allure-results`.

### 7. Generate the HTML report

```bash
npm run allure:generate
```

This creates the report in `allure-report`.

### 8. Open the report

```bash
npm run allure:open
```

Allure starts a local web server and opens the report in your browser. Stop the server with `Ctrl+C`.

## Complete Workflow

Run these commands after each test run:

```bash
npm run test:allure
npm run allure:generate
npm run allure:open
```

Or run the tests and generate the report with one command:

```bash
npm run test:allure:report
```

## Run a Specific Test File

To generate Allure results for one test file, pass the file path to Playwright directly:

```bash
npx playwright test tests/example.spec.ts
npm run allure:generate
npm run allure:open
```

## Troubleshooting

### `allure` is not recognized

Use the project-local npm script rather than a global command. If the command still fails, reinstall dependencies:

```bash
npm install
```

### Java is not found

Install a supported Java runtime and add its `bin` directory to the system `PATH`, then open a new terminal and run `java -version` again.

### The report is empty

Make sure tests completed and that `allure-results` contains result files before running `npm run allure:generate`.

## Generated Files

The following directories are generated locally and are excluded from Git:

- `allure-results/`
- `allure-report/`
- `playwright-report/`
- `test-results/`
