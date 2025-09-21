import { ApiClient } from '../utils/api-client';
import { TestContext } from '../types/api.types';
import { Logger } from '../utils/logger';

export class World {
  public apiClient: ApiClient;
  public context: TestContext;
  public logger: typeof Logger;

  constructor() {
    this.apiClient = new ApiClient();
    this.context = {};
    this.logger = Logger;
  }

  public setTestData(key: string, value: any): void {
    if (!this.context.testData) {
      this.context.testData = {};
    }
    this.context.testData[key] = value;
  }

  public getTestData(key: string): any {
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

  public clearContext(): void {
    this.context = {};
  }
}
