Feature: Form Interaction
  As a user
  I want to interact with web forms
  So that I can submit data and test form functionality

  Background:
    Given I navigate to "https://httpbin.org/forms/post"

  Scenario: Fill out a contact form
    When I fill "input[name='custname']" with "John Doe"
    And I fill "input[name='custtel']" with "123-456-7890"
    And I fill "input[name='custemail']" with "john.doe@example.com"
    And I select "Small" from "select[name='size']"
    And I check "input[name='topping'][value='bacon']"
    And I check "input[name='topping'][value='cheese']"
    And I fill "textarea[name='comments']" with "This is a test order"
    And I click on "input[type='submit']"
    Then I should see "custname"
    And I should see "John Doe"
    And I should see "custemail"
    And I should see "john.doe@example.com"

  Scenario: Validate required fields
    When I click on "input[type='submit']"
    Then I should see "custname"
    And I should see "custtel"
    And I should see "custemail"

  Scenario: Test form validation
    When I fill "input[name='custname']" with "Jane Smith"
    And I fill "input[name='custtel']" with "invalid-phone"
    And I fill "input[name='custemail']" with "invalid-email"
    And I click on "input[type='submit']"
    Then I should see "Jane Smith"
    And I should see "invalid-phone"
    And I should see "invalid-email"

  Scenario: Test different form elements
    When I fill "input[name='custname']" with "Test User"
    And I select "Large" from "select[name='size']"
    And I check "input[name='topping'][value='onion']"
    And I uncheck "input[name='topping'][value='onion']"
    And I check "input[name='topping'][value='mushroom']"
    And I fill "textarea[name='comments']" with "Special instructions"
    And I click on "input[type='submit']"
    Then I should see "Test User"
    And I should see "Large"
    And I should see "mushroom"
    And I should see "Special instructions"

  Scenario: Test form with empty values
    When I fill "input[name='custname']" with ""
    And I fill "input[name='custtel']" with ""
    And I fill "input[name='custemail']" with ""
    And I click on "input[type='submit']"
    Then I should see "custname"
    And I should see "custtel"
    And I should see "custemail"
