Feature: Web Navigation
  As a user
  I want to navigate through web pages
  So that I can test navigation functionality

  Background:
    Given I navigate to "https://example.com"

  Scenario: Basic navigation
    Then the page title should be "Example Domain"
    And I should see "Example Domain"
    And the URL should be "https://example.com/"

  Scenario: Navigate to different page
    When I navigate to "https://httpbin.org"
    Then the page title should contain "httpbin"
    And the URL should contain "httpbin"

  Scenario: Test page reload
    When I reload the page
    Then the page title should be "Example Domain"
    And I should see "Example Domain"

  Scenario: Test back and forward navigation
    When I navigate to "https://httpbin.org"
    And I go back
    Then the URL should be "https://example.com/"
    When I go forward
    Then the URL should contain "httpbin"

  Scenario: Test page elements visibility
    When I navigate to "https://httpbin.org"
    Then I should see "httpbin"
    And I should see at least 1 "a[href]"
    And I should see at least 1 "h1"

  Scenario: Test page loading states
    When I navigate to "https://httpbin.org"
    And I wait for the page to load
    Then I should see "httpbin"
    And I wait for network to be idle
    Then the page title should contain "httpbin"

  Scenario: Test page scrolling
    When I navigate to "https://httpbin.org"
    And I scroll to "footer"
    Then I should see "footer"
    And I scroll to "h1"
    Then I should see "httpbin"

  Scenario: Test page interactions
    When I navigate to "https://httpbin.org"
    And I hover over "a[href='/get']"
    Then "a[href='/get']" should be visible
    And I click on "a[href='/get']"
    Then the URL should contain "/get"
    And I should see "args"
