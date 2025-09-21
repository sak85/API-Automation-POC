import { Page, Locator } from '@playwright/test';
import { Logger } from './logger';

export class UIHelpers {
  static async waitForElementToBeVisible(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    Logger.info(`Waiting for element to be visible: ${selector}`);
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  static async waitForElementToBeHidden(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    Logger.info(`Waiting for element to be hidden: ${selector}`);
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  static async waitForElementToBeAttached(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    Logger.info(`Waiting for element to be attached: ${selector}`);
    await page.waitForSelector(selector, { state: 'attached', timeout });
  }

  static async waitForElementToBeDetached(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    Logger.info(`Waiting for element to be detached: ${selector}`);
    await page.waitForSelector(selector, { state: 'detached', timeout });
  }

  static async getElementCount(page: Page, selector: string): Promise<number> {
    const count = await page.locator(selector).count();
    Logger.info(`Found ${count} elements matching selector: ${selector}`);
    return count;
  }

  static async getElementByText(page: Page, text: string): Promise<Locator> {
    Logger.info(`Getting element by text: ${text}`);
    return page.getByText(text);
  }

  static async getElementByRole(page: Page, role: string, options?: { name?: string }): Promise<Locator> {
    Logger.info(`Getting element by role: ${role}`);
    return page.getByRole(role as any, options);
  }

  static async getElementByPlaceholder(page: Page, placeholder: string): Promise<Locator> {
    Logger.info(`Getting element by placeholder: ${placeholder}`);
    return page.getByPlaceholder(placeholder);
  }

  static async getElementByLabel(page: Page, label: string): Promise<Locator> {
    Logger.info(`Getting element by label: ${label}`);
    return page.getByLabel(label);
  }

  static async getElementByTitle(page: Page, title: string): Promise<Locator> {
    Logger.info(`Getting element by title: ${title}`);
    return page.getByTitle(title);
  }

  static async getElementByTestId(page: Page, testId: string): Promise<Locator> {
    Logger.info(`Getting element by test ID: ${testId}`);
    return page.getByTestId(testId);
  }

  static async waitForResponse(page: Page, url: string | RegExp, timeout: number = 10000): Promise<any> {
    Logger.info(`Waiting for response from: ${url}`);
    return await page.waitForResponse(url, { timeout });
  }

  static async waitForRequest(page: Page, url: string | RegExp, timeout: number = 10000): Promise<any> {
    Logger.info(`Waiting for request to: ${url}`);
    return await page.waitForRequest(url, { timeout });
  }

  static async waitForDownload(page: Page, timeout: number = 10000): Promise<any> {
    Logger.info('Waiting for download');
    return await page.waitForEvent('download', { timeout });
  }

  static async waitForPopup(page: Page, timeout: number = 10000): Promise<any> {
    Logger.info('Waiting for popup');
    return await page.waitForEvent('popup', { timeout });
  }

  static async waitForConsoleMessage(page: Page, message?: string | RegExp, timeout: number = 10000): Promise<any> {
    Logger.info(`Waiting for console message: ${message || 'any'}`);
    return await page.waitForEvent('console', { timeout });
  }

  static async waitForPageError(page: Page, timeout: number = 10000): Promise<any> {
    Logger.info('Waiting for page error');
    return await page.waitForEvent('pageerror', { timeout });
  }

  static async waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
    Logger.info('Waiting for network idle');
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async waitForDOMContentLoaded(page: Page, timeout: number = 10000): Promise<void> {
    Logger.info('Waiting for DOM content loaded');
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  static async waitForLoad(page: Page, timeout: number = 10000): Promise<void> {
    Logger.info('Waiting for page load');
    await page.waitForLoadState('load', { timeout });
  }

  static async dragAndDrop(page: Page, source: string, target: string): Promise<void> {
    Logger.info(`Dragging from ${source} to ${target}`);
    await page.dragAndDrop(source, target);
  }

  static async selectFile(page: Page, selector: string, filePath: string): Promise<void> {
    Logger.info(`Selecting file ${filePath} for input ${selector}`);
    await page.setInputFiles(selector, filePath);
  }

  static async selectMultipleFiles(page: Page, selector: string, filePaths: string[]): Promise<void> {
    Logger.info(`Selecting multiple files for input ${selector}`);
    await page.setInputFiles(selector, filePaths);
  }

  static async clearFiles(page: Page, selector: string): Promise<void> {
    Logger.info(`Clearing files for input ${selector}`);
    await page.setInputFiles(selector, []);
  }

  static async evaluateScript(page: Page, script: string): Promise<any> {
    Logger.info(`Evaluating script: ${script}`);
    return await page.evaluate(script);
  }

  static async evaluateFunction(page: Page, fn: Function, ...args: any[]): Promise<any> {
    Logger.info(`Evaluating function with args: ${args}`);
    return await page.evaluate(fn, ...args);
  }

  static async addScriptTag(page: Page, url?: string, content?: string): Promise<void> {
    Logger.info(`Adding script tag: ${url || 'inline content'}`);
    await page.addScriptTag({ url, content });
  }

  static async addStyleTag(page: Page, url?: string, content?: string): Promise<void> {
    Logger.info(`Adding style tag: ${url || 'inline content'}`);
    await page.addStyleTag({ url, content });
  }

  static async routeRequest(page: Page, url: string | RegExp, handler: (route: any) => void): Promise<void> {
    Logger.info(`Setting up route handler for: ${url}`);
    await page.route(url, handler);
  }

  static async unrouteRequest(page: Page, url?: string | RegExp): Promise<void> {
    Logger.info(`Removing route handler for: ${url || 'all'}`);
    await page.unroute(url);
  }

  static async mockResponse(page: Page, url: string | RegExp, response: any): Promise<void> {
    Logger.info(`Mocking response for: ${url}`);
    await page.route(url, route => route.fulfill(response));
  }

  static async blockRequest(page: Page, url: string | RegExp): Promise<void> {
    Logger.info(`Blocking request to: ${url}`);
    await page.route(url, route => route.abort());
  }

  static async interceptRequest(page: Page, url: string | RegExp, handler: (request: any) => void): Promise<void> {
    Logger.info(`Intercepting request to: ${url}`);
    await page.route(url, route => {
      handler(route.request());
      route.continue();
    });
  }

  static async getCookies(page: Page): Promise<any[]> {
    Logger.info('Getting cookies');
    return await page.context().cookies();
  }

  static async setCookie(page: Page, cookie: any): Promise<void> {
    Logger.info(`Setting cookie: ${cookie.name}`);
    await page.context().addCookies([cookie]);
  }

  static async clearCookies(page: Page): Promise<void> {
    Logger.info('Clearing cookies');
    await page.context().clearCookies();
  }

  static async getLocalStorage(page: Page): Promise<Record<string, string>> {
    Logger.info('Getting local storage');
    return await page.evaluate(() => ({ ...localStorage }));
  }

  static async setLocalStorage(page: Page, key: string, value: string): Promise<void> {
    Logger.info(`Setting local storage: ${key} = ${value}`);
    await page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key, value });
  }

  static async clearLocalStorage(page: Page): Promise<void> {
    Logger.info('Clearing local storage');
    await page.evaluate(() => localStorage.clear());
  }

  static async getSessionStorage(page: Page): Promise<Record<string, string>> {
    Logger.info('Getting session storage');
    return await page.evaluate(() => ({ ...sessionStorage }));
  }

  static async setSessionStorage(page: Page, key: string, value: string): Promise<void> {
    Logger.info(`Setting session storage: ${key} = ${value}`);
    await page.evaluate(({ key, value }) => sessionStorage.setItem(key, value), { key, value });
  }

  static async clearSessionStorage(page: Page): Promise<void> {
    Logger.info('Clearing session storage');
    await page.evaluate(() => sessionStorage.clear());
  }
}
