import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env') });

export const config = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: parseInt(process.env.API_TIMEOUT || '30000'),
    retryAttempts: parseInt(process.env.API_RETRY_ATTEMPTS || '3')
  },
  test: {
    headless: process.env.HEADLESS === 'true',
    browser: process.env.BROWSER || 'chromium',
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '720')
    }
  },
  reporting: {
    reportPath: process.env.REPORT_PATH || 'reports',
    screenshotPath: process.env.SCREENSHOT_PATH || 'reports/screenshots'
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

