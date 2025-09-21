const { Before, After, BeforeAll, AfterAll, setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

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
    await this.page.click(selector);
  }

  async fillInput(selector, value) {
    console.log(`Filling input ${selector} with: ${value}`);
    await this.page.fill(selector, value);
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
    await this.page.selectOption(selector, value);
  }

  async checkCheckbox(selector) {
    console.log(`Checking checkbox: ${selector}`);
    await this.page.check(selector);
  }

  async uncheckCheckbox(selector) {
    console.log(`Unchecking checkbox: ${selector}`);
    await this.page.uncheck(selector);
  }

  async hoverElement(selector) {
    console.log(`Hovering over element: ${selector}`);
    await this.page.hover(selector);
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
    await this.page.locator(selector).scrollIntoViewIfNeeded();
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
setWorldConstructor(UIWorld);

// Global browser instance
let browser;

BeforeAll(async function () {
  console.log('Starting UI Automation Test Suite');
  
  // Create necessary directories
  const reportDir = 'reports';
  const screenshotDir = 'reports/screenshots';
  
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }
  
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: 50, // Slow down operations by 50ms
  });

  console.log('Browser launched successfully');
});

Before(async function (scenario) {
  console.log(`Starting scenario: ${scenario.pickle.name}`);
  
  // Clear test data
  this.clearTestData();

  // Create new browser context and page for UI tests
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  // Set page and context in world
  this.page = page;
  this.browser = browser;
  this.context = context;
  
  console.log('New browser context and page created for UI test');
});

After(async function (scenario) {
  const status = scenario.result?.status;
  const statusText = status === 'PASSED' ? 'PASS' : status === 'FAILED' ? 'FAIL' : 'SKIP';
  
  console.log(`${statusText} Scenario: ${scenario.pickle.name}`);
  
  if (status === 'FAILED') {
    console.error(`Scenario failed: ${scenario.pickle.name}`);
    console.error(`Error: ${scenario.result?.message}`);
    
    // Take screenshot on failure
    if (this.page) {
      try {
        await this.takeScreenshot(`failed-${scenario.pickle.name.replace(/\s+/g, '-')}`);
      } catch (error) {
        console.error(`Failed to take screenshot: ${error}`);
      }
    }
  }
  
  // Close page and context
  if (this.page) {
    try {
      await this.page.close();
      console.log('Page closed');
    } catch (error) {
      console.error(`Error closing page: ${error}`);
    }
  }
  
  if (this.context) {
    try {
      await this.context.close();
      console.log('Browser context closed');
    } catch (error) {
      console.error(`Error closing browser context: ${error}`);
    }
  }
  
  this.clearTestData();
});

AfterAll(async function () {
  console.log('UI Automation Test Suite completed');
  
  // Close browser
  if (browser) {
    try {
      await browser.close();
      console.log('Browser closed');
    } catch (error) {
      console.error(`Error closing browser: ${error}`);
    }
  }
});
