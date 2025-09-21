import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export class TestDataHelper {
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail(): string {
    return `test.${this.generateRandomString(8)}@example.com`;
  }

  static generateRandomNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateUUID(): string {
    return uuidv4();
  }

  static generateTimestamp(): string {
    return moment().toISOString();
  }

  static generateDate(daysFromNow: number = 0): string {
    return moment().add(daysFromNow, 'days').format('YYYY-MM-DD');
  }

  static generateUserData() {
    return {
      name: `Test User ${this.generateRandomString(5)}`,
      email: this.generateRandomEmail(),
      username: `testuser_${this.generateRandomString(6)}`,
      phone: `+1-${this.generateRandomNumber(100, 999)}-${this.generateRandomNumber(100, 999)}-${this.generateRandomNumber(1000, 9999)}`,
      website: `https://${this.generateRandomString(8)}.example.com`
    };
  }

  static generatePostData() {
    return {
      title: `Test Post ${this.generateRandomString(8)}`,
      body: `This is a test post content generated at ${this.generateTimestamp()}`,
      userId: this.generateRandomNumber(1, 10)
    };
  }

  static generateCommentData() {
    return {
      name: `Test Comment ${this.generateRandomString(6)}`,
      email: this.generateRandomEmail(),
      body: `This is a test comment generated at ${this.generateTimestamp()}`,
      postId: this.generateRandomNumber(1, 100)
    };
  }
}

