# API & UI Automation Framework

A comprehensive automation testing framework built with Cucumber, Playwright, and TypeScript. This framework provides a robust foundation for testing both REST APIs and web UI applications.

## Features

### API Testing
- **BDD Testing**: Uses Cucumber for behavior-driven development
- **TypeScript**: Full TypeScript support for type safety
- **API Client**: Robust HTTP client with retry logic and error handling
- **Validation**: Comprehensive response validation utilities
- **Test Data**: Dynamic test data generation
- **Logging**: Structured logging with configurable levels
- **Reporting**: HTML and JSON test reports
- **Parallel Execution**: Support for parallel test execution

### UI Testing
- **Playwright Integration**: Full Playwright browser automation
- **Cross-Browser Support**: Chrome, Firefox, Safari, and mobile browsers
- **Element Interactions**: Click, fill, select, hover, and more
- **Form Testing**: Complete form interaction and validation
- **Navigation Testing**: Page navigation and URL validation
- **Screenshot Support**: Automatic screenshots on test failures
- **Wait Strategies**: Smart waiting for elements and conditions
- **Network Mocking**: Request/response interception and mocking

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd API-Automation-POC
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment configuration:
```bash
cp env.example .env
```

4. Install Playwright browsers:
```bash
npm run playwright:install
```

5. Update the `.env` file with your configuration:
```env
API_BASE_URL=https://your-api-url.com
API_TIMEOUT=30000
API_RETRY_ATTEMPTS=3
HEADLESS=true
BROWSER=chromium
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720
LOG_LEVEL=info
```

## Project Structure

```
src/
├── config/           # Configuration files
├── features/         # Cucumber feature files (API & UI)
├── step-definitions/ # Step definition implementations
├── support/          # Hooks and world context
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers
```

## Usage

### Running Tests

1. **Run all tests (API + UI):**
```bash
npm test
```

2. **Run API tests only:**
```bash
npm run test:api
```

3. **Run UI tests only:**
```bash
npm run test:ui
```

4. **Run specific test suites:**
```bash
npm run test:users      # User API tests
npm run test:posts      # Posts API tests
npm run test:google     # Google search UI tests
npm run test:forms      # Form interaction UI tests
npm run test:navigation # Navigation UI tests
```

5. **Run tests in headed mode:**
```bash
npm run test:headed
```

6. **Run tests in debug mode:**
```bash
npm run test:debug
```

7. **Run tests in parallel:**
```bash
npm run test:parallel
```

### Writing Tests

#### API Tests

1. **Create a new API feature file** in `src/features/`:
```gherkin
Feature: My API Feature
  Scenario: Test API endpoint
    Given I have a valid API client
    When I make a GET request to "/api/endpoint"
    Then the response status should be 200
```

2. **Implement API step definitions** in `src/step-definitions/api-steps.js`:
```javascript
Given('I have a valid API client', async function () {
  // Implementation
});
```

#### UI Tests

1. **Create a new UI feature file** in `src/features/`:
```gherkin
Feature: My UI Feature
  Scenario: Test web page
    Given I navigate to "https://example.com"
    When I click on "button"
    Then I should see "Success"
```

2. **Implement UI step definitions** in `src/step-definitions/ui-steps.js`:
```javascript
Given('I navigate to {string}', async function (url) {
  await this.navigateTo(url);
});
```

### API Client Usage

```typescript
import { ApiClient } from '@utils/api-client';

const apiClient = new ApiClient();

// GET request
const response = await apiClient.get('/users');

// POST request
const response = await apiClient.post('/users', userData);

// PUT request
const response = await apiClient.put('/users/1', updatedData);

// DELETE request
const response = await apiClient.delete('/users/1');
```

### Validation

```typescript
import { ValidationHelper } from '@utils/validation';

// Validate response structure
ValidationHelper.validateResponse(response.data, [
  { field: 'id', type: 'number', required: true },
  { field: 'name', type: 'string', required: true },
  { field: 'email', type: 'string', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
]);

// Validate status code
ValidationHelper.validateStatusCode(response.status, 200);

// Validate response time
ValidationHelper.validateResponseTime(responseTime, 5000);
```

### Test Data Generation

```typescript
import { TestDataHelper } from '@utils/test-data';

// Generate random data
const randomString = TestDataHelper.generateRandomString(10);
const randomEmail = TestDataHelper.generateRandomEmail();
const randomNumber = TestDataHelper.generateRandomNumber(1, 100);

// Generate structured data
const userData = TestDataHelper.generateUserData();
const postData = TestDataHelper.generatePostData();
```

### UI Testing Capabilities

#### Element Interactions
```gherkin
When I click on "button"
When I fill "input[name='email']" with "user@example.com"
When I select "Option 1" from "select[name='dropdown']"
When I check "input[type='checkbox']"
When I hover over "div.tooltip"
```

#### Navigation
```gherkin
Given I navigate to "https://example.com"
When I reload the page
When I go back
When I go forward
```

#### Assertions
```gherkin
Then I should see "Welcome"
Then "button" should be visible
Then "input" should be enabled
Then the page title should be "Home Page"
Then the URL should contain "dashboard"
```

#### Form Testing
```gherkin
When I fill "input[name='name']" with "John Doe"
And I select "Large" from "select[name='size']"
And I check "input[name='terms']"
And I click on "input[type='submit']"
Then I should see "Form submitted successfully"
```

#### File Upload
```gherkin
When I upload "path/to/file.pdf" to "input[type='file']"
When I upload multiple files to "input[type='file']":
  | file1.pdf |
  | file2.jpg |
```

#### Screenshots
```gherkin
When I take a screenshot named "before-action"
Then I take a screenshot named "after-action"
```

## Configuration

The framework can be configured through environment variables or by modifying the `src/config/config.ts` file:

- `API_BASE_URL`: Base URL for the API under test
- `API_TIMEOUT`: Request timeout in milliseconds
- `API_RETRY_ATTEMPTS`: Number of retry attempts for failed requests
- `HEADLESS`: Run tests in headless mode
- `BROWSER`: Browser to use for tests
- `LOG_LEVEL`: Logging level (error, warn, info, debug)

## Reporting

Test reports are generated in the `reports/` directory:
- `cucumber-report.html`: HTML report with detailed test results
- `cucumber-report.json`: JSON report for CI/CD integration

## Best Practices

1. **Use descriptive scenario names** that clearly indicate what is being tested
2. **Keep step definitions focused** on a single responsibility
3. **Use the validation utilities** to ensure response integrity
4. **Generate test data dynamically** to avoid test interdependencies
5. **Use the logging utilities** to provide clear test execution feedback
6. **Organize features by functionality** for better maintainability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.