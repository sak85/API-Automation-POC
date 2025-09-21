Feature: Posts API
  As a test engineer
  I want to test the posts API endpoints
  So that I can ensure the posts functionality works correctly

  Background:
    Given I have a valid API client
    And I set the base URL to "https://jsonplaceholder.typicode.com"

  Scenario: Get all posts
    When I make a GET request to "/posts"
    Then the response status should be 200
    And the response should contain an array of posts
    And each post should have required fields: "id", "title", "body", "userId"

  Scenario: Get posts by user ID
    Given I have a user ID "1"
    When I make a GET request to "/posts" with query parameter "userId" equal to "1"
    Then the response status should be 200
    And the response should contain an array of posts
    And all posts should have userId equal to "1"

  Scenario: Get a specific post by ID
    Given I have a post ID "1"
    When I make a GET request to "/posts/1"
    Then the response status should be 200
    And the response should contain a post object
    And the post ID should be "1"
    And the post should have required fields: "id", "title", "body", "userId"

  Scenario: Create a new post
    Given I have post data:
      | title   | body                    | userId |
      | Test    | This is a test post     | 1      |
    When I make a POST request to "/posts" with the post data
    Then the response status should be 201
    And the response should contain the created post data
    And the post should have required fields: "id", "title", "body", "userId"

  Scenario: Update an existing post
    Given I have a post ID "1"
    And I have updated post data:
      | title        | body                        |
      | Updated Post | This is an updated post     |
    When I make a PUT request to "/posts/1" with the updated data
    Then the response status should be 200
    And the response should contain the updated post data
    And the post title should be "Updated Post"

  Scenario: Delete a post
    Given I have a post ID "1"
    When I make a DELETE request to "/posts/1"
    Then the response status should be 200

