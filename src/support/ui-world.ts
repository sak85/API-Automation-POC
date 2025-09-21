import { Page, Browser, BrowserContext, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export class UIWorld {
  public page: Page;
  public browser: Browser;
  public context: BrowserContext;
  public logger: typeof Logger;
  public testData: Record<string, any>;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    this.page = page;
    this.browser = browser;
    this.context = context;
    this.logger = Logger;
    this.testData = {};
  }

  public setTestData(key: string, value: any): void {
    this.testData[key] = value;
  }

  public getTestData(key: string): any {
    return this.testData[key];
  }

  public async navigateTo(url: string): Promise<void> {
    this.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  public async takeScreenshot(name: string): Promise<void> {
    const screenshotPath = `reports/screenshots/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    this.logger.info(`Screenshot saved: ${screenshotPath}`);
  }

  public async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  public async clickElement(selector: string): Promise<void> {
    this.logger.info(`Clicking element: ${selector}`);
    await this.page.click(selector);
  }

  public async fillInput(selector: string, value: string): Promise<void> {
    this.logger.info(`Filling input ${selector} with: ${value}`);
    await this.page.fill(selector, value);
  }

  public async getText(selector: string): Promise<string> {
    const text = await this.page.textContent(selector);
    this.logger.info(`Got text from ${selector}: ${text}`);
    return text || '';
  }

  public async getAttribute(selector: string, attribute: string): Promise<string | null> {
    const value = await this.page.getAttribute(selector, attribute);
    this.logger.info(`Got attribute ${attribute} from ${selector}: ${value}`);
    return value;
  }

  public async isVisible(selector: string): Promise<boolean> {
    const isVisible = await this.page.isVisible(selector);
    this.logger.info(`Element ${selector} is visible: ${isVisible}`);
    return isVisible;
  }

  public async isEnabled(selector: string): Promise<boolean> {
    const isEnabled = await this.page.isEnabled(selector);
    this.logger.info(`Element ${selector} is enabled: ${isEnabled}`);
    return isEnabled;
  }

  public async waitForText(text: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForFunction(
      (searchText) => document.body.innerText.includes(searchText),
      text,
      { timeout }
    );
  }

  public async selectOption(selector: string, value: string): Promise<void> {
    this.logger.info(`Selecting option ${value} from ${selector}`);
    await this.page.selectOption(selector, value);
  }

  public async checkCheckbox(selector: string): Promise<void> {
    this.logger.info(`Checking checkbox: ${selector}`);
    await this.page.check(selector);
  }

  public async uncheckCheckbox(selector: string): Promise<void> {
    this.logger.info(`Unchecking checkbox: ${selector}`);
    await this.page.uncheck(selector);
  }

  public async hoverElement(selector: string): Promise<void> {
    this.logger.info(`Hovering over element: ${selector}`);
    await this.page.hover(selector);
  }

  public async doubleClickElement(selector: string): Promise<void> {
    this.logger.info(`Double clicking element: ${selector}`);
    await this.page.dblclick(selector);
  }

  public async rightClickElement(selector: string): Promise<void> {
    this.logger.info(`Right clicking element: ${selector}`);
    await this.page.click(selector, { button: 'right' });
  }

  public async pressKey(key: string): Promise<void> {
    this.logger.info(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  public async typeText(text: string): Promise<void> {
    this.logger.info(`Typing text: ${text}`);
    await this.page.keyboard.type(text);
  }

  public async clearInput(selector: string): Promise<void> {
    this.logger.info(`Clearing input: ${selector}`);
    await this.page.fill(selector, '');
  }

  public async scrollToElement(selector: string): Promise<void> {
    this.logger.info(`Scrolling to element: ${selector}`);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  public async waitForUrl(url: string | RegExp, timeout: number = 10000): Promise<void> {
    this.logger.info(`Waiting for URL: ${url}`);
    await this.page.waitForURL(url, { timeout });
  }

  public async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    this.logger.info(`Current URL: ${url}`);
    return url;
  }

  public async getTitle(): Promise<string> {
    const title = await this.page.title();
    this.logger.info(`Page title: ${title}`);
    return title;
  }

  public async reloadPage(): Promise<void> {
    this.logger.info('Reloading page');
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  public async goBack(): Promise<void> {
    this.logger.info('Going back');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  public async goForward(): Promise<void> {
    this.logger.info('Going forward');
    await this.page.goForward();
    await this.page.waitForLoadState('networkidle');
  }

  public async closePage(): Promise<void> {
    this.logger.info('Closing page');
    await this.page.close();
  }

  public async closeBrowser(): Promise<void> {
    this.logger.info('Closing browser');
    await this.browser.close();
  }

  public async clearTestData(): Promise<void> {
    this.testData = {};
  }
}
