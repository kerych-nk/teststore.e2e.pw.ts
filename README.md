# teststore.e2e.pw.ts

E2E Test Automation Project for an E-commerce Website
This project contains a suite of E2E (End-to-End) tests for the MyStore website, written using TypeScript and the Playwright framework.

The goal of the project is to automate key user interaction scenarios—such as product search, cart management, checkout, and registration—to ensure the quality and stability of the site's functionality.

Technology & Tools
Framework: Playwright
Language: TypeScript
Test Runner: Playwright Test
Test Data Generation: @faker-js/faker
Environment Variables: dotenv
CI/CD: GitHub Actions
Architecture & Patterns
The project is built using the following patterns and approaches to ensure clean, maintainable, and scalable code:

Page Object Model (POM): Each page or significant UI block is represented by a separate class (Page Object), which encapsulates the interaction logic for the elements on that page. This separates test logic from page implementation details.
UI Components: Large or reusable elements (e.g., login forms, headers, modals) are extracted into separate component classes, which are then used by the corresponding Page Objects.
PageHolder (AllPages in your code): An aggregator class that initializes all Page Objects and provides a centralized access point, making them easily available in tests via a single fixture.
Custom Playwright Fixtures: Used to prepare the state before test execution. The project defines two main fixture setups:
guest: Prepares the environment for tests that run as a guest (unauthenticated) user.
loginUser: Registers and logs in a user via an API call before the test runs, significantly speeding up scenarios that require authentication.
@step Decorators: A custom decorator is used to wrap Page Object methods into test.step blocks, which greatly enhances the readability and detail of Playwright reports.

Project Structure
.
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
├── .github/workflows/
│ └── playwright.yml # Configuration for running tests on GitHub Actions
├── .env.example # Example environment variables file
├── package.json
├── playwright.config.ts
└── tsconfig.json
Getting Started
Prerequisites
Node.js (LTS version recommended)
npm or yarn
Installation
Clone the repository:
Bash

git clone <your_repository_url>
cd <project_folder_name>
Install project dependencies:
Bash

npm install
Install Playwright browsers:
Bash

npx playwright install --with-deps
Configuration
Create a .env file in the root of the project. You can copy it from .env.example if it exists.
Add the necessary environment variables. Currently, only one is required:
Фрагмент коду

# .env file

BASE_URL=https://teststore.automationtesting.co.uk
Important: Add the .env file to your .gitignore to avoid committing secrets to the repository.
Running Tests
Use the npm scripts defined in package.json to run the tests.

Run all tests in all configured browsers (Chromium, Firefox, WebKit):

Bash

npm test
Run tests in a specific browser:

Bash

npm run test:chromium
npm run test:firefox
npm run test:webkit
Run tests in headed mode (with a visible browser UI):

Bash

npx playwright test --headed
Run a specific test file:

Bash

npx playwright test app/tests/cart.test.ts
Run tests with the Playwright UI mode for debugging:

Bash

npx playwright test --ui
Viewing Reports
After each test run, Playwright generates a detailed HTML report. To open the last report, run:

Bash

npm run report
Or:

Bash

npx playwright show-report
CI/CD Integration
The project is configured to automatically run tests on GitHub Actions for every push or pull_request to the main or develop branches. The configuration can be found in .github/workflows/playwright.yml.
