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
│ └── workflows/
│ └── playwright.yml
├── app/
│ ├── ui/
│ │ ├── components/ # UI Components (forms, modals, counters, etc.)
│ │ └── pages/ # Page Object classes and the PageHolder (AllPages)
│ ├── fixtures/ # Custom Playwright fixtures (guest, loginUser)
│ └── tests/ # Test files (_.test.ts or _.spec.ts)
├── decorator/
│ └── step.ts # Implementation of the @step decorator
├── utils/
│ ├── helpers/ # Helper classes (FunctionHelpers)
│ └── testData/ # Test data generators and data objects
├── .env.example # Example environment variables file
├── package.json
└── tsconfig.json

## 🚀 Getting Started

Prerequisites
Node.js (LTS version recommended)
npm or yarn
Installation
Clone the repository:

## ⚙️ Running Tests

---

## 📊 Reporting

The project includes comprehensive reporting features configured in `playwright.config.ts`.

- **HTML Reports**: After each test run, Playwright generates a self-contained HTML report with detailed information about the run, including test steps, screenshots, and traces. You can view the last report by running:
  ```bash
  npx playwright show-report
  ```
- **GitHub Actions Integration**: The latest test report is automatically published as a workflow artifact after each run on GitHub Actions.
- **(Optional) GitHub Pages**: You can configure your GitHub Actions workflow to automatically publish the HTML report to a public GitHub Pages URL for easy access.
- **(Optional) CTRF Reporting**: For better integration with CI/CD dashboards, you can configure a [CTRF (Common Test Result Format) reporter](https://github.com/ctrf-io/ctrf).

The latest test report artifact can be found in the "Actions" tab of the GitHub repository after a workflow run is complete.

## 🔄 CI/CD Integration

The project uses **GitHub Actions** for continuous integration, configured in `.github/workflows/playwright.yml`.

- **Automated Test Runs**: Tests are automatically triggered on every `push` and `pull_request` to the main branches. You can also trigger runs manually via `workflow_dispatch`.
- **Parallel Execution**: Tests are configured to run in parallel across all browsers (Chromium, Firefox, WebKit) for faster results.
- **Environment Variables**: Secure data like `BASE_URL` or API keys are managed through GitHub Actions secrets and passed to the test environment.
- **Test Results & Artifacts**: After each run, test results are summarized, and the full HTML report is uploaded as a downloadable artifact, available for 30 days.
- **(Optional) Code Quality**: You can add a step to the workflow to run linters like ESLint (`npm run lint`) to ensure code quality and style consistency.

---

**Що було додано:**

1.  **Секція "Reporting"**:
    - Описує використання стандартного HTML-звіту Playwright та як його відкрити.
    - Згадує інтеграцію з артефактами GitHub Actions.
    - Додано опціональні пункти про GitHub Pages та CTRF, які є хорошими практиками для більш просунутих проектів.
2.  **Секція "CI/CD Integration"**:
    - Описує, як саме використовуються GitHub Actions у твоєму проекті.
    - Згадує автоматичний запуск, паралельне виконання, управління змінними середовища та збереження звітів.
    - Додано опціональний пункт про перевірку якості коду за допомогою ESLint.

Я також додав відповідні іконки-емодзі до заголовків секцій, щоб зробити їх більш візуально привабливими, як у твоєму прикладі. Цей доповнений `README.md` тепер надає повну картину про твій проект, його структуру, запуск та інтеграції.
