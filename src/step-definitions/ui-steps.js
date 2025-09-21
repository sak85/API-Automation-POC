const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { chromium } = require('playwright');

// Simple UI World class for JavaScript
class UIWorld {
  constructor() {
    this.page = null;
    this.browser = null;
    this.context = null;
    this.testData = {};
  }

  async setPage(page) {
    this.page = page;
  }

  async setBrowser(browser) {
    this.browser = browser;
  }

  async setContext(context) {
    this.context = context;
  }

  setTestData(key, value) {
    this.testData[key] = value;
  }

  getTestData(key) {
    return this.testData[key];
  }

  async navigateTo(url) {
    console.log(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name) {
    const screenshotPath = `reports/screenshots/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickElement(selector) {
    console.log(`Clicking element: ${selector}`);
    try {
      await this.page.click(selector, { timeout: 10000 });
    } catch (error) {
      console.log(`Failed to click ${selector}, trying alternative approach...`);
      await this.page.locator(selector).click();
    }
  }

  async fillInput(selector, value) {
    console.log(`Filling input ${selector} with: ${value}`);
    try {
      await this.page.fill(selector, value, { timeout: 10000 });
    } catch (error) {
      console.log(`Failed to fill input ${selector}, trying alternative approach...`);
      await this.page.locator(selector).fill(value);
    }
  }

  async getText(selector) {
    const text = await this.page.textContent(selector);
    console.log(`Got text from ${selector}: ${text}`);
    return text || '';
  }

  async getAttribute(selector, attribute) {
    const value = await this.page.getAttribute(selector, attribute);
    console.log(`Got attribute ${attribute} from ${selector}: ${value}`);
    return value;
  }

  async isVisible(selector) {
    const isVisible = await this.page.isVisible(selector);
    console.log(`Element ${selector} is visible: ${isVisible}`);
    return isVisible;
  }

  async isEnabled(selector) {
    const isEnabled = await this.page.isEnabled(selector);
    console.log(`Element ${selector} is enabled: ${isEnabled}`);
    return isEnabled;
  }

  async waitForText(text, timeout = 10000) {
    await this.page.waitForFunction(
      (searchText) => document.body.innerText.includes(searchText),
      text,
      { timeout }
    );
  }

  async selectOption(selector, value) {
    console.log(`Selecting option ${value} from ${selector}`);
    try {
      await this.page.selectOption(selector, value, { timeout: 10000 });
    } catch (error) {
      console.log(`Failed to select option ${value} from ${selector}, trying alternative approach...`);
      await this.page.locator(selector).selectOption(value);
    }
  }

  async checkCheckbox(selector) {
    console.log(`Checking checkbox: ${selector}`);
    try {
      await this.page.check(selector, { timeout: 10000 });
    } catch (error) {
      console.log(`Failed to check ${selector}, trying alternative approach...`);
      await this.page.locator(selector).check();
    }
  }

  async uncheckCheckbox(selector) {
    console.log(`Unchecking checkbox: ${selector}`);
    try {
      await this.page.uncheck(selector, { timeout: 10000 });
    } catch (error) {
      console.log(`Failed to uncheck ${selector}, trying alternative approach...`);
      await this.page.locator(selector).uncheck();
    }
  }

  async hoverElement(selector) {
    console.log(`Hovering over element: ${selector}`);
    try {
      await this.page.hover(selector, { timeout: 5000 });
    } catch (error) {
      console.log(`Element ${selector} not found for hover, continuing...`);
    }
  }

  async doubleClickElement(selector) {
    console.log(`Double clicking element: ${selector}`);
    await this.page.dblclick(selector);
  }

  async rightClickElement(selector) {
    console.log(`Right clicking element: ${selector}`);
    await this.page.click(selector, { button: 'right' });
  }

  async pressKey(key) {
    console.log(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  async typeText(text) {
    console.log(`Typing text: ${text}`);
    await this.page.keyboard.type(text);
  }

  async clearInput(selector) {
    console.log(`Clearing input: ${selector}`);
    await this.page.fill(selector, '');
  }

  async scrollToElement(selector) {
    console.log(`Scrolling to element: ${selector}`);
    try {
      await this.page.locator(selector).scrollIntoViewIfNeeded({ timeout: 5000 });
    } catch (error) {
      console.log(`Element ${selector} not found, continuing...`);
    }
  }

  async waitForUrl(url, timeout = 10000) {
    console.log(`Waiting for URL: ${url}`);
    await this.page.waitForURL(url, { timeout });
  }

  async getCurrentUrl() {
    const url = this.page.url();
    console.log(`Current URL: ${url}`);
    return url;
  }

  async getTitle() {
    const title = await this.page.title();
    console.log(`Page title: ${title}`);
    return title;
  }

  async reloadPage() {
    console.log('Reloading page');
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async goBack() {
    console.log('Going back');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  async goForward() {
    console.log('Going forward');
    await this.page.goForward();
    await this.page.waitForLoadState('networkidle');
  }

  async closePage() {
    console.log('Closing page');
    await this.page.close();
  }

  async closeBrowser() {
    console.log('Closing browser');
    await this.browser.close();
  }

  clearTestData() {
    this.testData = {};
  }
}

// Set the world constructor
const { setWorldConstructor } = require('@cucumber/cucumber');
setWorldConstructor(UIWorld);

// Global browser instance
let browser;

// Navigation Steps
Given('I navigate to {string}', async function (url) {
  await this.navigateTo(url);
});

Given('I am on the {string} page', async function (pageName) {
  const url = this.getTestData(`${pageName}Url`) || `https://example.com/${pageName.toLowerCase()}`;
  await this.navigateTo(url);
});


When('I reload the page', async function () {
  await this.reloadPage();
});

When('I go back', async function () {
  await this.goBack();
});

When('I go forward', async function () {
  await this.goForward();
});

// Element Interaction Steps
When('I click on {string}', async function (selector) {
  await this.clickElement(selector);
});

When('I double click on {string}', async function (selector) {
  await this.doubleClickElement(selector);
});

When('I right click on {string}', async function (selector) {
  await this.rightClickElement(selector);
});

When('I hover over {string}', async function (selector) {
  await this.hoverElement(selector);
});

When('I scroll to {string}', async function (selector) {
  await this.scrollToElement(selector);
});

// Input Steps
When('I fill {string} with {string}', async function (selector, value) {
  await this.fillInput(selector, value);
});

When('I clear {string}', async function (selector) {
  await this.clearInput(selector);
});

When('I type {string}', async function (text) {
  await this.typeText(text);
});

When('I press {string}', async function (key) {
  await this.pressKey(key);
});

// Selection Steps
When('I select {string} from {string}', async function (value, selector) {
  await this.selectOption(selector, value);
});

When('I check {string}', async function (selector) {
  await this.checkCheckbox(selector);
});

When('I uncheck {string}', async function (selector) {
  await this.uncheckCheckbox(selector);
});

// Wait Steps
When('I wait for {string} to be visible', async function (selector) {
  await this.waitForElement(selector);
});

When('I wait for {string} seconds', async function (seconds) {
  const milliseconds = seconds * 1000;
  await this.page.waitForTimeout(milliseconds);
});

When('I wait for the page to load', async function () {
  await this.page.waitForLoadState('load');
});

When('I wait for network to be idle', async function () {
  await this.page.waitForLoadState('networkidle');
});

// Data Steps
Given('I have test data:', async function (dataTable) {
  const data = dataTable.hashes()[0];
  Object.entries(data).forEach(([key, value]) => {
    this.setTestData(key, value);
  });
});

Given('I set {string} to {string}', async function (key, value) {
  this.setTestData(key, value);
});

// Assertion Steps
Then('I should see {string}', async function (text) {
  await this.waitForText(text);
  const isVisible = await this.page.getByText(text).first().isVisible();
  expect(isVisible).to.be.true;
});

Then('I should not see {string}', async function (text) {
  const isVisible = await this.page.getByText(text).isVisible();
  expect(isVisible).to.be.false;
});

Then('I should see {string} in {string}', async function (text, selector) {
  const elementText = await this.getText(selector);
  expect(elementText).to.include(text);
});

Then('I should not see {string} in {string}', async function (text, selector) {
  const elementText = await this.getText(selector);
  expect(elementText).to.not.include(text);
});

Then('{string} should be visible', async function (selector) {
  const isVisible = await this.isVisible(selector);
  expect(isVisible).to.be.true;
});

Then('{string} should not be visible', async function (selector) {
  const isVisible = await this.isVisible(selector);
  expect(isVisible).to.be.false;
});

Then('{string} should be enabled', async function (selector) {
  const isEnabled = await this.isEnabled(selector);
  expect(isEnabled).to.be.true;
});

Then('{string} should be disabled', async function (selector) {
  const isEnabled = await this.isEnabled(selector);
  expect(isEnabled).to.be.false;
});

Then('{string} should contain {string}', async function (selector, text) {
  const elementText = await this.getText(selector);
  expect(elementText).to.include(text);
});

Then('{string} should not contain {string}', async function (selector, text) {
  const elementText = await this.getText(selector);
  expect(elementText).to.not.include(text);
});

Then('{string} should have value {string}', async function (selector, value) {
  const elementValue = await this.page.inputValue(selector);
  expect(elementValue).to.equal(value);
});

Then('{string} should not have value {string}', async function (selector, value) {
  const elementValue = await this.page.inputValue(selector);
  expect(elementValue).to.not.equal(value);
});

Then('{string} should have attribute {string} with value {string}', async function (selector, attribute, value) {
  const attributeValue = await this.getAttribute(selector, attribute);
  expect(attributeValue).to.equal(value);
});

Then('{string} should not have attribute {string}', async function (selector, attribute) {
  const attributeValue = await this.getAttribute(selector, attribute);
  expect(attributeValue).to.be.null;
});

Then('the page title should be {string}', async function (expectedTitle) {
  const title = await this.getTitle();
  expect(title).to.equal(expectedTitle);
});

Then('the page title should contain {string}', async function (text) {
  const title = await this.getTitle();
  expect(title).to.include(text);
});

Then('the URL should be {string}', async function (expectedUrl) {
  const url = await this.getCurrentUrl();
  expect(url).to.equal(expectedUrl);
});

Then('the URL should contain {string}', async function (text) {
  const url = await this.getCurrentUrl();
  expect(url).to.include(text);
});

Then('the URL should match {string}', async function (pattern) {
  const url = await this.getCurrentUrl();
  const regex = new RegExp(pattern);
  expect(url).to.match(regex);
});

// Count Steps
Then('I should see {int} {string}', async function (count, selector) {
  const elementCount = await this.page.locator(selector).count();
  expect(elementCount).to.equal(count);
});

Then('I should see at least {int} {string}', async function (minCount, selector) {
  const elementCount = await this.page.locator(selector).count();
  expect(elementCount).to.be.at.least(minCount);
});

Then('I should see at most {int} {string}', async function (maxCount, selector) {
  const elementCount = await this.page.locator(selector).count();
  expect(elementCount).to.be.at.most(maxCount);
});

// Checkbox and Radio Steps
Then('{string} should be checked', async function (selector) {
  const isChecked = await this.page.isChecked(selector);
  expect(isChecked).to.be.true;
});

Then('{string} should not be checked', async function (selector) {
  const isChecked = await this.page.isChecked(selector);
  expect(isChecked).to.be.false;
});

// Dropdown Steps
Then('{string} should have {string} selected', async function (selector, value) {
  const selectedValue = await this.page.inputValue(selector);
  expect(selectedValue).to.equal(value);
});

Then('{string} should not have {string} selected', async function (selector, value) {
  const selectedValue = await this.page.inputValue(selector);
  expect(selectedValue).to.not.equal(value);
});

// Screenshot Steps
When('I take a screenshot named {string}', async function (name) {
  await this.takeScreenshot(name);
});

Then('I take a screenshot named {string}', async function (name) {
  await this.takeScreenshot(name);
});

// Focus Steps
When('I focus on {string}', async function (selector) {
  await this.page.focus(selector);
});

Then('{string} should be focused', async function (selector) {
  const isFocused = await this.page.evaluate((sel) => document.activeElement?.matches(sel), selector);
  expect(isFocused).to.be.true;
});

// Drag and Drop Steps
When('I drag {string} to {string}', async function (source, target) {
  await this.page.dragAndDrop(source, target);
});

// JavaScript Steps
When('I execute JavaScript {string}', async function (script) {
  await this.page.evaluate(script);
});

// File Upload Steps
When('I upload {string} to {string}', async function (filePath, selector) {
  await this.page.setInputFiles(selector, filePath);
});

When('I upload multiple files to {string}:', async function (selector, dataTable) {
  const filePaths = dataTable.raw().flat();
  await this.page.setInputFiles(selector, filePaths);
});

// Cookie Steps
When('I set cookie {string} to {string}', async function (name, value) {
  await this.page.context().addCookies([{ name, value, domain: 'localhost', path: '/' }]);
});

When('I clear all cookies', async function () {
  await this.page.context().clearCookies();
});

Then('I should have cookie {string} with value {string}', async function (name, value) {
  const cookies = await this.page.context().cookies();
  const cookie = cookies.find(c => c.name === name);
  expect(cookie).to.exist;
  expect(cookie?.value).to.equal(value);
});

// Local Storage Steps
When('I set local storage {string} to {string}', async function (key, value) {
  await this.page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key, value });
});

When('I clear local storage', async function () {
  await this.page.evaluate(() => localStorage.clear());
});

Then('I should have local storage {string} with value {string}', async function (key, value) {
  const localStorage = await this.page.evaluate(() => ({ ...localStorage }));
  expect(localStorage[key]).to.equal(value);
});

// Session Storage Steps
When('I set session storage {string} to {string}', async function (key, value) {
  await this.page.evaluate(({ key, value }) => sessionStorage.setItem(key, value), { key, value });
});

When('I clear session storage', async function () {
  await this.page.evaluate(() => sessionStorage.clear());
});

Then('I should have session storage {string} with value {string}', async function (key, value) {
  const sessionStorage = await this.page.evaluate(() => ({ ...sessionStorage }));
  expect(sessionStorage[key]).to.equal(value);
});

// Alert Steps
When('I accept the alert', async function () {
  this.page.on('dialog', dialog => dialog.accept());
});

When('I dismiss the alert', async function () {
  this.page.on('dialog', dialog => dialog.dismiss());
});

When('I enter {string} in the alert', async function (text) {
  this.page.on('dialog', dialog => dialog.accept(text));
});

// Window Steps
When('I open a new tab', async function () {
  await this.page.context().newPage();
});

When('I close the current tab', async function () {
  await this.closePage();
});

When('I switch to tab {int}', async function (index) {
  const pages = this.page.context().pages();
  this.page = pages[index];
});

// Network Steps
When('I mock response for {string} with:', async function (url, dataTable) {
  const response = dataTable.hashes()[0];
  await this.page.route(url, route => route.fulfill(response));
});

When('I block requests to {string}', async function (url) {
  await this.page.route(url, route => route.abort());
});

// JavaScript Steps
When('I add script {string}', async function (script) {
  await this.page.addScriptTag({ content: script });
});

When('I add style {string}', async function (style) {
  await this.page.addStyleTag({ content: style });
});
