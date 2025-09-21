Feature: User Management API
  As a test engineer
  I want to test the user management API endpoints
  So that I can ensure the API works correctly

  Background:
    Given I have a valid API client
    And I set the base URL to "https://jsonplaceholder.typicode.com"

  Scenario: Get all users
    When I make a GET request to "/users"
    Then the response status should be 200
    And the response should contain an array of users
    And each user should have required fields: "id", "name", "email", "username"

  Scenario: Get a specific user by ID
    Given I have a user ID "1"
    When I make a GET request to "/users/1"
    Then the response status should be 200
    And the response should contain a user object
    And the user ID should be "1"
    And the user should have required fields: "id", "name", "email", "username", "address", "phone", "website", "company"

  Scenario: Create a new user
    Given I have user data:
      | name     | email                    | username |
      | John Doe | john.doe@example.com     | johndoe  |
    When I make a POST request to "/users" with the user data
    Then the response status should be 201
    And the response should contain the created user data
    And the user should have required fields: "id", "name", "email", "username"

  Scenario: Update an existing user
    Given I have a user ID "1"
    And I have updated user data:
      | name        | email                    |
      | Jane Smith  | jane.smith@example.com   |
    When I make a PUT request to "/users/1" with the updated data
    Then the response status should be 200
    And the response should contain the updated user data
    And the user name should be "Jane Smith"
    And the user email should be "jane.smith@example.com"

  Scenario: Delete a user
    Given I have a user ID "1"
    When I make a DELETE request to "/users/1"
    Then the response status should be 200

