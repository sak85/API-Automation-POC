import { Page, Browser, BrowserContext } from '@playwright/test';
import { ApiClient } from '../utils/api-client';
import { TestContext } from '../types/api.types';
import { Logger } from '../utils/logger';
import { UIWorld } from './ui-world';

export class CombinedWorld {
  // API properties
  public apiClient: ApiClient;
  public context: TestContext;
  
  // UI properties
  public page: Page;
  public browser: Browser;
  public browserContext: BrowserContext;
  public uiWorld: UIWorld;
  
  // Common properties
  public logger: typeof Logger;
  public testData: Record<string, any>;

  constructor(page?: Page, browser?: Browser, context?: BrowserContext) {
    // Initialize API client
    this.apiClient = new ApiClient();
    this.context = {};
    
    // Initialize UI properties
    this.page = page!;
    this.browser = browser!;
    this.browserContext = context!;
    this.uiWorld = new UIWorld(page!, browser!, context!);
    
    // Initialize common properties
    this.logger = Logger;
    this.testData = {};
  }

  // API methods
  public setApiTestData(key: string, value: any): void {
    if (!this.context.testData) {
      this.context.testData = {};
    }
    this.context.testData[key] = value;
  }

  public getApiTestData(key: string): any {
    return this.context.testData?.[key];
  }

  public setLastResponse(response: any): void {
    this.context.lastResponse = response;
  }

  public getLastResponse(): any {
    return this.context.lastResponse;
  }

  public setScenarioName(name: string): void {
    this.context.scenarioName = name;
  }

  public setFeatureName(name: string): void {
    this.context.featureName = name;
  }

  public clearApiContext(): void {
    this.context = {};
  }

  // UI methods (delegated to UIWorld)
  public setUITestData(key: string, value: any): void {
    this.uiWorld.setTestData(key, value);
  }

  public getUITestData(key: string): any {
    return this.uiWorld.getTestData(key);
  }

  public async navigateTo(url: string): Promise<void> {
    await this.uiWorld.navigateTo(url);
  }

  public async takeScreenshot(name: string): Promise<void> {
    await this.uiWorld.takeScreenshot(name);
  }

  public async clickElement(selector: string): Promise<void> {
    await this.uiWorld.clickElement(selector);
  }

  public async fillInput(selector: string, value: string): Promise<void> {
    await this.uiWorld.fillInput(selector, value);
  }

  public async getText(selector: string): Promise<string> {
    return await this.uiWorld.getText(selector);
  }

  public async isVisible(selector: string): Promise<boolean> {
    return await this.uiWorld.isVisible(selector);
  }

  public async isEnabled(selector: string): Promise<boolean> {
    return await this.uiWorld.isEnabled(selector);
  }

  public async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.uiWorld.waitForElement(selector, timeout);
  }

  public async waitForText(text: string, timeout: number = 10000): Promise<void> {
    await this.uiWorld.waitForText(text, timeout);
  }

  public async getCurrentUrl(): Promise<string> {
    return await this.uiWorld.getCurrentUrl();
  }

  public async getTitle(): Promise<string> {
    return await this.uiWorld.getTitle();
  }

  // Common methods
  public setTestData(key: string, value: any): void {
    this.testData[key] = value;
  }

  public getTestData(key: string): any {
    return this.testData[key];
  }

  public clearTestData(): void {
    this.testData = {};
  }

  public clearAllContext(): void {
    this.clearApiContext();
    this.clearTestData();
    this.uiWorld.clearTestData();
  }

  // Utility methods
  public isApiTest(): boolean {
    return this.context.scenarioName?.toLowerCase().includes('api') || false;
  }

  public isUITest(): boolean {
    return this.context.scenarioName?.toLowerCase().includes('ui') || 
           this.context.scenarioName?.toLowerCase().includes('web') || false;
  }

  public async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  public async closePage(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }
  }
}
