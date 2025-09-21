import { Before, After, BeforeAll, AfterAll, setWorldConstructor } from '@cucumber/cucumber';
import { World } from './world';
import { Logger } from '../utils/logger';
import { config } from '../config/config';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Set the world constructor
setWorldConstructor(World);

BeforeAll(async function () {
  Logger.info('Starting API Automation Test Suite');
  
  // Create necessary directories
  const reportDir = config.reporting.reportPath;
  const screenshotDir = config.reporting.screenshotPath;
  
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }
  
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }
});

Before(async function (this: World, scenario) {
  Logger.info(`Starting scenario: ${scenario.pickle.name}`);
  this.setScenarioName(scenario.pickle.name);
  this.setFeatureName(scenario.pickle.uri);
  this.clearContext();
});

After(async function (this: World, scenario) {
  const status = scenario.result?.status;
  const statusText = status === 'PASSED' ? 'PASS' : status === 'FAILED' ? 'FAIL' : 'SKIP';
  
  Logger.logTestStep(`Scenario: ${scenario.pickle.name}`, statusText);
  
  if (status === 'FAILED') {
    Logger.error(`Scenario failed: ${scenario.pickle.name}`);
    Logger.error(`Error: ${scenario.result?.message}`);
  }
  
  this.clearContext();
});

AfterAll(async function () {
  Logger.info('API Automation Test Suite completed');
});
