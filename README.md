# 🛠️ E2E Test Automation Project

This repository contains a suite of **E2E tests** for the [**MyStore**](https://teststore.automationtesting.co.uk) website, written in **TypeScript** with **Playwright**.  
The goal is to automate key user journeys—product search, cart management, checkout, registration—to ensure the site’s quality and stability.

---

## ✨ Tech Stack

- **Framework**: &nbsp; ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
- **Language**: &nbsp; ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
- **Test Data**: &nbsp; ![Faker.js](https://img.shields.io/badge/Faker.js-blue?style=flat&logo=faker)
- **CI/CD**: &nbsp; ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
- **Runtime**: &nbsp; ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- **Package Manager**: &nbsp; ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

---

## 🏗️ Architecture & Patterns

The project is built using the following patterns and approaches to ensure clean, maintainable, and scalable code:

- **Page Object Model (POM)** — every page / major block has its own class.
- **UI Components** — reusable widgets (forms, modals…) extracted into components.
- **PageHolder** — aggregator that instantiates all Page Objects.
- **Custom Playwright Fixtures** — prepare state (guest / logged-in) before tests.
- **`@step` Decorators** — wrap methods in `test.step()` for detailed reports.

---

## 📁 Project Structure

```text
.
├─ .github/
│   └── workflows/
│       └── playwright.yml          # CI pipeline
├─ app/
│   └── ui/
│       ├── components/             # forms, modals, counters…
│       └── pages/                  # Page Objects
├─ fixtures/                        # custom Playwright fixtures
├─ tests/                           # *.spec.ts files
├─ decorator/step.ts                # @step implementation
├─ utils/
│   ├── helpers/
│   └── testData/
├─ .env.example
├─ playwright.config.ts
├─ package.json
└─ tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm 8+** (or Yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/kerych-nk/teststore.e2e.pw.ts.git
cd teststore.e2e.pw.ts

# Install dependencies
npm install
npx playwright install --with-deps
```

````markdown
## 🏃‍♂️ Running Tests

```bash
# Run all tests
npm test

# Run a specific test file
npx playwright test tests/search.spec.ts

# Run UI mode for debugging
npx playwright test --ui

# Run in a specific browser
npx playwright test --project=chromium
```
````

---

## 📊 Reporting

The project includes comprehensive reporting features configured in `playwright.config.ts`.

- **HTML Reports**: After each test run, Playwright generates a self-contained HTML report with detailed information about the run, including test steps, screenshots, and traces. You can view the last report by running:
  ```bash
  npx playwright show-report
  ```

```

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

```

```
