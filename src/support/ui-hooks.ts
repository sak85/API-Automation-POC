import { Before, After, BeforeAll, AfterAll, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { CombinedWorld } from './combined-world';
import { Logger } from '../utils/logger';
import { config } from '../config/config';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Set the world constructor
setWorldConstructor(CombinedWorld);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  Logger.info('Starting Combined API and UI Automation Test Suite');
  
  // Create necessary directories
  const reportDir = config.reporting.reportPath;
  const screenshotDir = config.reporting.screenshotPath;
  
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }
  
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser
  browser = await chromium.launch({
    headless: config.test.headless,
    slowMo: 50, // Slow down operations by 50ms
  });

  Logger.info('Browser launched successfully');
});

Before(async function (this: CombinedWorld, scenario) {
  Logger.info(`Starting scenario: ${scenario.pickle.name}`);
  
  // Set scenario context
  this.setScenarioName(scenario.pickle.name);
  this.setFeatureName(scenario.pickle.uri);
  
  // Clear all contexts
  this.clearAllContext();

  // Create new browser context and page for UI tests
  if (this.isUITest() || scenario.pickle.name.toLowerCase().includes('ui') || 
      scenario.pickle.name.toLowerCase().includes('web') || 
      scenario.pickle.name.toLowerCase().includes('form') ||
      scenario.pickle.name.toLowerCase().includes('navigation') ||
      scenario.pickle.name.toLowerCase().includes('search')) {
    
    context = await browser.newContext({
      viewport: {
        width: config.test.viewport.width,
        height: config.test.viewport.height
      }
    });
    
    const page = await context.newPage();
    
    // Set page and context in world
    this.page = page;
    this.browser = browser;
    this.browserContext = context;
    this.uiWorld = new (await import('./ui-world')).UIWorld(page, browser, context);
    
    Logger.info('New browser context and page created for UI test');
  } else {
    Logger.info('API test detected, skipping browser setup');
  }
});

After(async function (this: CombinedWorld, scenario) {
  const status = scenario.result?.status;
  const statusText = status === 'PASSED' ? 'PASS' : status === 'FAILED' ? 'FAIL' : 'SKIP';
  
  Logger.logTestStep(`Scenario: ${scenario.pickle.name}`, statusText);
  
  if (status === 'FAILED') {
    Logger.error(`Scenario failed: ${scenario.pickle.name}`);
    Logger.error(`Error: ${scenario.result?.message}`);
    
    // Take screenshot on failure for UI tests
    if (this.isUITest() && this.page) {
      try {
        await this.takeScreenshot(`failed-${scenario.pickle.name.replace(/\s+/g, '-')}`);
      } catch (error) {
        Logger.error(`Failed to take screenshot: ${error}`);
      }
    }
  }
  
  // Close page and context for UI tests
  if (this.page) {
    try {
      await this.page.close();
      Logger.info('Page closed');
    } catch (error) {
      Logger.error(`Error closing page: ${error}`);
    }
  }
  
  if (this.browserContext) {
    try {
      await this.browserContext.close();
      Logger.info('Browser context closed');
    } catch (error) {
      Logger.error(`Error closing browser context: ${error}`);
    }
  }
  
  this.clearAllContext();
});

AfterAll(async function () {
  Logger.info('Combined API and UI Automation Test Suite completed');
  
  // Close browser
  if (browser) {
    try {
      await browser.close();
      Logger.info('Browser closed');
    } catch (error) {
      Logger.error(`Error closing browser: ${error}`);
    }
  }
});
