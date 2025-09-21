# API Automation Framework

A comprehensive API automation testing framework built with Cucumber, Playwright, and TypeScript. This framework provides a robust foundation for testing any OpenAPI-compliant REST API.

## Features

- **BDD Testing**: Uses Cucumber for behavior-driven development
- **TypeScript**: Full TypeScript support for type safety
- **API Client**: Robust HTTP client with retry logic and error handling
- **Validation**: Comprehensive response validation utilities
- **Test Data**: Dynamic test data generation
- **Logging**: Structured logging with configurable levels
- **Reporting**: HTML and JSON test reports
- **Parallel Execution**: Support for parallel test execution

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

4. Update the `.env` file with your API configuration:
```env
API_BASE_URL=https://your-api-url.com
API_TIMEOUT=30000
API_RETRY_ATTEMPTS=3
HEADLESS=true
BROWSER=chromium
LOG_LEVEL=info
```

## Project Structure

```
src/
├── config/           # Configuration files
├── features/         # Cucumber feature files
├── step-definitions/ # Step definition implementations
├── support/          # Hooks and world context
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers
```

## Usage

### Running Tests

1. **Run all tests:**
```bash
npm test
```

2. **Run tests in headed mode:**
```bash
npm run test:headed
```

3. **Run tests in debug mode:**
```bash
npm run test:debug
```

4. **Run tests in parallel:**
```bash
npm run test:parallel
```

### Writing Tests

1. **Create a new feature file** in `src/features/`:
```gherkin
Feature: My API Feature
  Scenario: Test API endpoint
    Given I have a valid API client
    When I make a GET request to "/api/endpoint"
    Then the response status should be 200
```

2. **Implement step definitions** in `src/step-definitions/`:
```typescript
import { Given, When, Then } from '@cucumber/cucumber';

Given('I have a valid API client', async function (this: World) {
  // Implementation
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