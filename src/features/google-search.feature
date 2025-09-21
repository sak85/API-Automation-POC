Feature: Google Search
  As a user
  I want to search on Google
  So that I can find information on the web

  Background:
    Given I navigate to "https://www.google.com"

  Scenario: Search for a term
    When I fill "input[name='q']" with "Playwright automation"
    And I click on "input[name='btnK']"
    Then I should see "Playwright automation"
    And the page title should contain "Playwright automation"

  Scenario: Search with Enter key
    When I fill "input[name='q']" with "Cucumber testing"
    And I press "Enter"
    Then I should see "Cucumber testing"
    And the page title should contain "Cucumber testing"

  Scenario: Search and verify results
    When I fill "input[name='q']" with "API testing"
    And I click on "input[name='btnK']"
    Then I should see "API testing"
    And I should see at least 1 "div[data-ved]"
    And the URL should contain "q=API+testing"

  Scenario: Search with suggestions
    When I fill "input[name='q']" with "JavaScript"
    Then I should see at least 1 "ul[role='listbox']"
    When I click on "input[name='btnK']"
    Then I should see "JavaScript"
    And the page title should contain "JavaScript"

  Scenario: Clear search and search again
    When I fill "input[name='q']" with "TypeScript"
    And I clear "input[name='q']"
    And I fill "input[name='q']" with "Node.js"
    And I click on "input[name='btnK']"
    Then I should see "Node.js"
    And the page title should contain "Node.js"
