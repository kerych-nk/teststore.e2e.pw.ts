# E2E Test Automation Project

This project contains a suite of E2E (End-to-End) tests for the [MyStore](https://teststore.automationtesting.co.uk) website, written using TypeScript and the Playwright framework.

The goal of the project is to automate key user interaction scenarios—such as product search, cart management, checkout, and registration—to ensure the quality and stability of the site's functionality.

## ✨ Tech Stack

- **Framework**: &nbsp; ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
- **Language**: &nbsp; ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
- **Test Data**: &nbsp; ![Faker.js](https://img.shields.io/badge/Faker.js-blue?style=flat&logo=faker)
- **CI/CD**: &nbsp; ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
- **Runtime**: &nbsp; ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- **Package Manager**: &nbsp; ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## 🏗️ Architecture & Patterns

The project is built using the following patterns and approaches to ensure clean, maintainable, and scalable code:

- **Page Object Model (POM)**: Each page or significant UI block is represented by a separate class (Page Object).
- **UI Components**: Reusable elements (forms, modals, etc.) are extracted into separate component classes.
- **`PageHolder` (`AllPages` in your code)**: An aggregator class that initializes all Page Objects for centralized access.
- **Custom Playwright Fixtures**: Used to prepare the state before test execution (`guest`, `loginUser`).
- **`@step` Decorators**: A custom decorator used to wrap methods into `test.step` blocks for detailed reporting.

## 📁 Project Structure

.
├── .github/
│ └── workflows/ # GitHub Actions CI/CD configuration
│ └── playwright.yml # Workflow for running tests and publishing reports
├── app/
│ ├── ui/
│ │ ├── components/ # UI Components (forms, modals, counters, etc.)
│ │ └── pages/ # Page Object classes and the PageHolder (AllPages)
│ ├── fixtures/ # Custom Playwright fixtures (guest, loginUser)
│ └── tests/ # Test files (\_.spec.ts)
├── decorator/
│ └── step.ts # Implementation of the @step decorator
├── utils/
│ ├── helpers/ # Helper classes (FunctionHelpers)
│ └── testData/ # Test data generators and data objects
├── .env.example # Example environment variables file
├── playwright.config.ts # Playwright configuration
├── package.json
└── tsconfig.json

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm 8+** (or Yarn)

### Installation

# Clone the repository

git clone https://github.com/kerych-nk/teststore.e2e.pw.ts
cd teststore.e2e.pw.ts

# Install dependencies

npm install
npx playwright install --with-deps

## ⚙️ Running Tests

# Run all tests

npx playwright test

# Run a specific test file

npx playwright test tests/search.spec.ts

# Run tests with UI mode for debugging

npx playwright test --ui

# Run tests in a specific browser

npx playwright test --project=chromium

---

## 📊 Reporting

The project includes comprehensive reporting features configured in `playwright.config.ts`.

- **HTML Reports**: After each test run, Playwright generates a self-contained HTML report with detailed information about the run, including test steps, screenshots, and traces. You can view the last report by running:
  ```bash
  npx playwright show-report
  ```

```

- **GitHub Actions Integration**: The latest test report is automatically published as a workflow artifact after each run on GitHub Actions.

The latest test report artifact can be found in the "Actions" tab of the GitHub repository after a workflow run is complete.

## 🔄 CI/CD Integration

The project uses **GitHub Actions** for continuous integration, configured in `.github/workflows/playwright.yml`.

- **Automated Test Runs**: Tests are automatically triggered on every `push` and `pull_request` to the main branches. You can also trigger runs manually via `workflow_dispatch`.
- **Parallel Execution**: Tests are configured to run in parallel across all browsers (Chromium, Firefox, WebKit) for faster results.
- **Environment Variables**: Secure data like `BASE_URL` or API keys are managed through GitHub Actions secrets and passed to the test environment.
- **Test Results & Artifacts**: After each run, test results are summarized, and the full HTML report is uploaded as a downloadable artifact, available for 30 days.
- **(Optional) Code Quality**: You can add a step to the workflow to run linters like ESLint (`npm run lint`) to ensure code quality and style consistency.

---
```
