import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { UIWorld } from '../support/ui-world';
import { UIHelpers } from '../utils/ui-helpers';
import { Logger } from '../utils/logger';

// Navigation Steps
Given('I navigate to {string}', async function (this: UIWorld, url: string) {
  await this.navigateTo(url);
});

Given('I am on the {string} page', async function (this: UIWorld, pageName: string) {
  const url = this.getTestData(`${pageName}Url`) || `https://example.com/${pageName.toLowerCase()}`;
  await this.navigateTo(url);
});

When('I navigate to {string}', async function (this: UIWorld, url: string) {
  await this.navigateTo(url);
});

When('I reload the page', async function (this: UIWorld) {
  await this.reloadPage();
});

When('I go back', async function (this: UIWorld) {
  await this.goBack();
});

When('I go forward', async function (this: UIWorld) {
  await this.goForward();
});

// Element Interaction Steps
When('I click on {string}', async function (this: UIWorld, selector: string) {
  await this.clickElement(selector);
});

When('I double click on {string}', async function (this: UIWorld, selector: string) {
  await this.doubleClickElement(selector);
});

When('I right click on {string}', async function (this: UIWorld, selector: string) {
  await this.rightClickElement(selector);
});

When('I hover over {string}', async function (this: UIWorld, selector: string) {
  await this.hoverElement(selector);
});

When('I scroll to {string}', async function (this: UIWorld, selector: string) {
  await this.scrollToElement(selector);
});

// Input Steps
When('I fill {string} with {string}', async function (this: UIWorld, selector: string, value: string) {
  await this.fillInput(selector, value);
});

When('I clear {string}', async function (this: UIWorld, selector: string) {
  await this.clearInput(selector);
});

When('I type {string}', async function (this: UIWorld, text: string) {
  await this.typeText(text);
});

When('I press {string}', async function (this: UIWorld, key: string) {
  await this.pressKey(key);
});

// Selection Steps
When('I select {string} from {string}', async function (this: UIWorld, value: string, selector: string) {
  await this.selectOption(selector, value);
});

When('I check {string}', async function (this: UIWorld, selector: string) {
  await this.checkCheckbox(selector);
});

When('I uncheck {string}', async function (this: UIWorld, selector: string) {
  await this.uncheckCheckbox(selector);
});

// File Upload Steps
When('I upload {string} to {string}', async function (this: UIWorld, filePath: string, selector: string) {
  await UIHelpers.selectFile(this.page, selector, filePath);
});

When('I upload multiple files to {string}:', async function (this: UIWorld, selector: string, dataTable) {
  const filePaths = dataTable.raw().flat();
  await UIHelpers.selectMultipleFiles(this.page, selector, filePaths);
});

// Wait Steps
When('I wait for {string} to be visible', async function (this: UIWorld, selector: string) {
  await this.waitForElement(selector);
});

When('I wait for {string} seconds', async function (this: UIWorld, seconds: number) {
  const milliseconds = seconds * 1000;
  await this.page.waitForTimeout(milliseconds);
});

When('I wait for the page to load', async function (this: UIWorld) {
  await UIHelpers.waitForLoad(this.page);
});

When('I wait for network to be idle', async function (this: UIWorld) {
  await UIHelpers.waitForNetworkIdle(this.page);
});

// Data Steps
Given('I have test data:', async function (this: UIWorld, dataTable) {
  const data = dataTable.hashes()[0];
  Object.entries(data).forEach(([key, value]) => {
    this.setTestData(key, value);
  });
});

Given('I set {string} to {string}', async function (this: UIWorld, key: string, value: string) {
  this.setTestData(key, value);
});

// Assertion Steps
Then('I should see {string}', async function (this: UIWorld, text: string) {
  await this.waitForText(text);
  const isVisible = await this.page.getByText(text).isVisible();
  expect(isVisible).to.be.true;
});

Then('I should not see {string}', async function (this: UIWorld, text: string) {
  const isVisible = await this.page.getByText(text).isVisible();
  expect(isVisible).to.be.false;
});

Then('I should see {string} in {string}', async function (this: UIWorld, text: string, selector: string) {
  const elementText = await this.getText(selector);
  expect(elementText).to.include(text);
});

Then('I should not see {string} in {string}', async function (this: UIWorld, text: string, selector: string) {
  const elementText = await this.getText(selector);
  expect(elementText).to.not.include(text);
});

Then('{string} should be visible', async function (this: UIWorld, selector: string) {
  const isVisible = await this.isVisible(selector);
  expect(isVisible).to.be.true;
});

Then('{string} should not be visible', async function (this: UIWorld, selector: string) {
  const isVisible = await this.isVisible(selector);
  expect(isVisible).to.be.false;
});

Then('{string} should be enabled', async function (this: UIWorld, selector: string) {
  const isEnabled = await this.isEnabled(selector);
  expect(isEnabled).to.be.true;
});

Then('{string} should be disabled', async function (this: UIWorld, selector: string) {
  const isEnabled = await this.isEnabled(selector);
  expect(isEnabled).to.be.false;
});

Then('{string} should contain {string}', async function (this: UIWorld, selector: string, text: string) {
  const elementText = await this.getText(selector);
  expect(elementText).to.include(text);
});

Then('{string} should not contain {string}', async function (this: UIWorld, selector: string, text: string) {
  const elementText = await this.getText(selector);
  expect(elementText).to.not.include(text);
});

Then('{string} should have value {string}', async function (this: UIWorld, selector: string, value: string) {
  const elementValue = await this.page.inputValue(selector);
  expect(elementValue).to.equal(value);
});

Then('{string} should not have value {string}', async function (this: UIWorld, selector: string, value: string) {
  const elementValue = await this.page.inputValue(selector);
  expect(elementValue).to.not.equal(value);
});

Then('{string} should have attribute {string} with value {string}', async function (this: UIWorld, selector: string, attribute: string, value: string) {
  const attributeValue = await this.getAttribute(selector, attribute);
  expect(attributeValue).to.equal(value);
});

Then('{string} should not have attribute {string}', async function (this: UIWorld, selector: string, attribute: string) {
  const attributeValue = await this.getAttribute(selector, attribute);
  expect(attributeValue).to.be.null;
});

Then('the page title should be {string}', async function (this: UIWorld, expectedTitle: string) {
  const title = await this.getTitle();
  expect(title).to.equal(expectedTitle);
});

Then('the page title should contain {string}', async function (this: UIWorld, text: string) {
  const title = await this.getTitle();
  expect(title).to.include(text);
});

Then('the URL should be {string}', async function (this: UIWorld, expectedUrl: string) {
  const url = await this.getCurrentUrl();
  expect(url).to.equal(expectedUrl);
});

Then('the URL should contain {string}', async function (this: UIWorld, text: string) {
  const url = await this.getCurrentUrl();
  expect(url).to.include(text);
});

Then('the URL should match {string}', async function (this: UIWorld, pattern: string) {
  const url = await this.getCurrentUrl();
  const regex = new RegExp(pattern);
  expect(url).to.match(regex);
});

// Count Steps
Then('I should see {int} {string}', async function (this: UIWorld, count: number, selector: string) {
  const elementCount = await UIHelpers.getElementCount(this.page, selector);
  expect(elementCount).to.equal(count);
});

Then('I should see at least {int} {string}', async function (this: UIWorld, minCount: number, selector: string) {
  const elementCount = await UIHelpers.getElementCount(this.page, selector);
  expect(elementCount).to.be.at.least(minCount);
});

Then('I should see at most {int} {string}', async function (this: UIWorld, maxCount: number, selector: string) {
  const elementCount = await UIHelpers.getElementCount(this.page, selector);
  expect(elementCount).to.be.at.most(maxCount);
});

// Checkbox and Radio Steps
Then('{string} should be checked', async function (this: UIWorld, selector: string) {
  const isChecked = await this.page.isChecked(selector);
  expect(isChecked).to.be.true;
});

Then('{string} should not be checked', async function (this: UIWorld, selector: string) {
  const isChecked = await this.page.isChecked(selector);
  expect(isChecked).to.be.false;
});

// Dropdown Steps
Then('{string} should have {string} selected', async function (this: UIWorld, selector: string, value: string) {
  const selectedValue = await this.page.inputValue(selector);
  expect(selectedValue).to.equal(value);
});

Then('{string} should not have {string} selected', async function (this: UIWorld, selector: string, value: string) {
  const selectedValue = await this.page.inputValue(selector);
  expect(selectedValue).to.not.equal(value);
});

// Screenshot Steps
When('I take a screenshot named {string}', async function (this: UIWorld, name: string) {
  await this.takeScreenshot(name);
});

Then('I take a screenshot named {string}', async function (this: UIWorld, name: string) {
  await this.takeScreenshot(name);
});

// Cookie Steps
When('I set cookie {string} to {string}', async function (this: UIWorld, name: string, value: string) {
  await UIHelpers.setCookie(this.page, { name, value, domain: 'localhost', path: '/' });
});

When('I clear all cookies', async function (this: UIWorld) {
  await UIHelpers.clearCookies(this.page);
});

Then('I should have cookie {string} with value {string}', async function (this: UIWorld, name: string, value: string) {
  const cookies = await UIHelpers.getCookies(this.page);
  const cookie = cookies.find(c => c.name === name);
  expect(cookie).to.exist;
  expect(cookie?.value).to.equal(value);
});

// Local Storage Steps
When('I set local storage {string} to {string}', async function (this: UIWorld, key: string, value: string) {
  await UIHelpers.setLocalStorage(this.page, key, value);
});

When('I clear local storage', async function (this: UIWorld) {
  await UIHelpers.clearLocalStorage(this.page);
});

Then('I should have local storage {string} with value {string}', async function (this: UIWorld, key: string, value: string) {
  const localStorage = await UIHelpers.getLocalStorage(this.page);
  expect(localStorage[key]).to.equal(value);
});

// Session Storage Steps
When('I set session storage {string} to {string}', async function (this: UIWorld, key: string, value: string) {
  await UIHelpers.setSessionStorage(this.page, key, value);
});

When('I clear session storage', async function (this: UIWorld) {
  await UIHelpers.clearSessionStorage(this.page);
});

Then('I should have session storage {string} with value {string}', async function (this: UIWorld, key: string, value: string) {
  const sessionStorage = await UIHelpers.getSessionStorage(this.page);
  expect(sessionStorage[key]).to.equal(value);
});

// Alert Steps
When('I accept the alert', async function (this: UIWorld) {
  this.page.on('dialog', dialog => dialog.accept());
});

When('I dismiss the alert', async function (this: UIWorld) {
  this.page.on('dialog', dialog => dialog.dismiss());
});

When('I enter {string} in the alert', async function (this: UIWorld, text: string) {
  this.page.on('dialog', dialog => dialog.accept(text));
});

// Window Steps
When('I open a new tab', async function (this: UIWorld) {
  await this.page.context().newPage();
});

When('I close the current tab', async function (this: UIWorld) {
  await this.closePage();
});

When('I switch to tab {int}', async function (this: UIWorld, index: number) {
  const pages = this.page.context().pages();
  this.page = pages[index];
});

// Focus Steps
When('I focus on {string}', async function (this: UIWorld, selector: string) {
  await this.page.focus(selector);
});

Then('{string} should be focused', async function (this: UIWorld, selector: string) {
  const isFocused = await this.page.evaluate((sel) => document.activeElement?.matches(sel), selector);
  expect(isFocused).to.be.true;
});

// Drag and Drop Steps
When('I drag {string} to {string}', async function (this: UIWorld, source: string, target: string) {
  await UIHelpers.dragAndDrop(this.page, source, target);
});

// Network Steps
When('I mock response for {string} with:', async function (this: UIWorld, url: string, dataTable) {
  const response = dataTable.hashes()[0];
  await UIHelpers.mockResponse(this.page, url, response);
});

When('I block requests to {string}', async function (this: UIWorld, url: string) {
  await UIHelpers.blockRequest(this.page, url);
});

// JavaScript Steps
When('I execute JavaScript {string}', async function (this: UIWorld, script: string) {
  await UIHelpers.evaluateScript(this.page, script);
});

When('I add script {string}', async function (this: UIWorld, script: string) {
  await UIHelpers.addScriptTag(this.page, undefined, script);
});

When('I add style {string}', async function (this: UIWorld, style: string) {
  await UIHelpers.addStyleTag(this.page, undefined, style);
});
