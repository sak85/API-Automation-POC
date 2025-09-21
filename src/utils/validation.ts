import Joi from 'joi';
import { ValidationRule } from '../types/api.types';

export class ValidationHelper {
  static validateResponse(response: any, rules: ValidationRule[]): void {
    const errors: string[] = [];

    rules.forEach(rule => {
      const value = this.getNestedValue(response, rule.field);
      
      if (rule.required && (value === undefined || value === null)) {
        errors.push(`Field '${rule.field}' is required but missing`);
        return;
      }

      if (value !== undefined && value !== null) {
        if (!this.validateType(value, rule.type)) {
          errors.push(`Field '${rule.field}' should be of type ${rule.type}, got ${typeof value}`);
        }

        if (rule.minLength !== undefined && typeof value === 'string' && value.length < rule.minLength) {
          errors.push(`Field '${rule.field}' should have minimum length ${rule.minLength}, got ${value.length}`);
        }

        if (rule.maxLength !== undefined && typeof value === 'string' && value.length > rule.maxLength) {
          errors.push(`Field '${rule.field}' should have maximum length ${rule.maxLength}, got ${value.length}`);
        }

        if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
          errors.push(`Field '${rule.field}' does not match required pattern`);
        }

        if (rule.custom && !rule.custom(value)) {
          errors.push(`Field '${rule.field}' failed custom validation`);
        }
      }
    });

    if (errors.length > 0) {
      throw new Error(`Validation failed:\n${errors.join('\n')}`);
    }
  }

  static validateSchema(data: any, schema: Joi.ObjectSchema): void {
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(`Schema validation failed: ${error.details.map(d => d.message).join(', ')}`);
    }
  }

  static validateStatusCode(actual: number, expected: number | number[]): void {
    const expectedCodes = Array.isArray(expected) ? expected : [expected];
    if (!expectedCodes.includes(actual)) {
      throw new Error(`Expected status code ${expectedCodes.join(' or ')}, got ${actual}`);
    }
  }

  static validateResponseTime(actual: number, maxTime: number): void {
    if (actual > maxTime) {
      throw new Error(`Response time ${actual}ms exceeded maximum allowed time ${maxTime}ms`);
    }
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private static validateType(value: any, type: string): boolean {
    switch (type) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'array':
        return Array.isArray(value);
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      default:
        return true;
    }
  }
}

