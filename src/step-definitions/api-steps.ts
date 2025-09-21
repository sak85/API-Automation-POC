import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { World } from '../support/world';
import { ValidationHelper } from '../utils/validation';
import { TestDataHelper } from '../utils/test-data';
import { Logger } from '../utils/logger';

Given('I have a valid API client', async function (this: World) {
  this.logger.info('API client initialized');
});

Given('I set the base URL to {string}', async function (this: World, baseUrl: string) {
  this.apiClient = new (this.apiClient.constructor as any)(baseUrl);
  this.logger.info(`Base URL set to: ${baseUrl}`);
});

Given('I have a user ID {string}', async function (this: World, userId: string) {
  this.setTestData('userId', userId);
});

Given('I have a post ID {string}', async function (this: World, postId: string) {
  this.setTestData('postId', postId);
});

Given('I have user data:', async function (this: World, dataTable) {
  const userData = dataTable.hashes()[0];
  this.setTestData('userData', userData);
});

Given('I have post data:', async function (this: World, dataTable) {
  const postData = dataTable.hashes()[0];
  this.setTestData('postData', postData);
});

Given('I have updated user data:', async function (this: World, dataTable) {
  const updatedData = dataTable.hashes()[0];
  this.setTestData('updatedUserData', updatedData);
});

Given('I have updated post data:', async function (this: World, dataTable) {
  const updatedData = dataTable.hashes()[0];
  this.setTestData('updatedPostData', updatedData);
});

When('I make a GET request to {string}', async function (this: World, endpoint: string) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.get(endpoint);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    this.logger.logApiCall('GET', endpoint, response.status, duration);
  } catch (error) {
    this.logger.error(`GET request failed: ${error}`);
    throw error;
  }
});

When('I make a GET request to {string} with query parameter {string} equal to {string}', async function (this: World, endpoint: string, param: string, value: string) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.get(endpoint, { [param]: value });
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    this.logger.logApiCall('GET', endpoint, response.status, duration);
  } catch (error) {
    this.logger.error(`GET request with query parameter failed: ${error}`);
    throw error;
  }
});

When('I make a POST request to {string} with the user data', async function (this: World, endpoint: string) {
  const userData = this.getTestData('userData');
  const startTime = Date.now();
  try {
    const response = await this.apiClient.post(endpoint, userData);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    this.logger.logApiCall('POST', endpoint, response.status, duration);
  } catch (error) {
    this.logger.error(`POST request failed: ${error}`);
    throw error;
  }
});

When('I make a POST request to {string} with the post data', async function (this: World, endpoint: string) {
  const postData = this.getTestData('postData');
  const startTime = Date.now();
  try {
    const response = await this.apiClient.post(endpoint, postData);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    this.logger.logApiCall('POST', endpoint, response.status, duration);
  } catch (error) {
    this.logger.error(`POST request failed: ${error}`);
    throw error;
  }
});

When('I make a PUT request to {string} with the updated data', async function (this: World, endpoint: string) {
  const updatedData = this.getTestData('updatedUserData') || this.getTestData('updatedPostData');
  const startTime = Date.now();
  try {
    const response = await this.apiClient.put(endpoint, updatedData);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    this.logger.logApiCall('PUT', endpoint, response.status, duration);
  } catch (error) {
    this.logger.error(`PUT request failed: ${error}`);
    throw error;
  }
});

When('I make a DELETE request to {string}', async function (this: World, endpoint: string) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.delete(endpoint);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    this.logger.logApiCall('DELETE', endpoint, response.status, duration);
  } catch (error) {
    this.logger.error(`DELETE request failed: ${error}`);
    throw error;
  }
});

Then('the response status should be {int}', async function (this: World, expectedStatus: number) {
  const response = this.getLastResponse();
  expect(response).to.exist;
  expect(response.status).to.equal(expectedStatus);
  this.logger.info(`Response status verified: ${response.status}`);
});

Then('the response should contain an array of users', async function (this: World) {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('array');
  expect(response.data.length).to.be.greaterThan(0);
  this.logger.info(`Response contains ${response.data.length} users`);
});

Then('the response should contain an array of posts', async function (this: World) {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('array');
  expect(response.data.length).to.be.greaterThan(0);
  this.logger.info(`Response contains ${response.data.length} posts`);
});

Then('the response should contain a user object', async function (this: World) {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('object');
  expect(response.data).to.not.be.an('array');
  this.logger.info('Response contains a user object');
});

Then('the response should contain a post object', async function (this: World) {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('object');
  expect(response.data).to.not.be.an('array');
  this.logger.info('Response contains a post object');
});

Then('the response should contain the created user data', async function (this: World) {
  const response = this.getLastResponse();
  const userData = this.getTestData('userData');
  expect(response.data).to.include(userData);
  this.logger.info('Response contains the created user data');
});

Then('the response should contain the created post data', async function (this: World) {
  const response = this.getLastResponse();
  const postData = this.getTestData('postData');
  expect(response.data).to.include(postData);
  this.logger.info('Response contains the created post data');
});

Then('the response should contain the updated user data', async function (this: World) {
  const response = this.getLastResponse();
  const updatedData = this.getTestData('updatedUserData');
  expect(response.data).to.include(updatedData);
  this.logger.info('Response contains the updated user data');
});

Then('the response should contain the updated post data', async function (this: World) {
  const response = this.getLastResponse();
  const updatedData = this.getTestData('updatedPostData');
  expect(response.data).to.include(updatedData);
  this.logger.info('Response contains the updated post data');
});

Then('each user should have required fields: {string}', async function (this: World, fields: string) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  response.data.forEach((user: any, index: number) => {
    requiredFields.forEach(field => {
      expect(user).to.have.property(field, `User ${index + 1} missing required field: ${field}`);
    });
  });
  
  this.logger.info(`Verified required fields for ${response.data.length} users: ${requiredFields.join(', ')}`);
});

Then('each post should have required fields: {string}', async function (this: World, fields: string) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  response.data.forEach((post: any, index: number) => {
    requiredFields.forEach(field => {
      expect(post).to.have.property(field, `Post ${index + 1} missing required field: ${field}`);
    });
  });
  
  this.logger.info(`Verified required fields for ${response.data.length} posts: ${requiredFields.join(', ')}`);
});

Then('the user should have required fields: {string}', async function (this: World, fields: string) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field, `User missing required field: ${field}`);
  });
  
  this.logger.info(`Verified required fields for user: ${requiredFields.join(', ')}`);
});

Then('the post should have required fields: {string}', async function (this: World, fields: string) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field, `Post missing required field: ${field}`);
  });
  
  this.logger.info(`Verified required fields for post: ${requiredFields.join(', ')}`);
});

Then('the user ID should be {string}', async function (this: World, expectedId: string) {
  const response = this.getLastResponse();
  expect(response.data.id.toString()).to.equal(expectedId);
  this.logger.info(`User ID verified: ${response.data.id}`);
});

Then('the post ID should be {string}', async function (this: World, expectedId: string) {
  const response = this.getLastResponse();
  expect(response.data.id.toString()).to.equal(expectedId);
  this.logger.info(`Post ID verified: ${response.data.id}`);
});

Then('all posts should have userId equal to {string}', async function (this: World, expectedUserId: string) {
  const response = this.getLastResponse();
  response.data.forEach((post: any, index: number) => {
    expect(post.userId.toString()).to.equal(expectedUserId, `Post ${index + 1} has incorrect userId`);
  });
  this.logger.info(`Verified userId for ${response.data.length} posts`);
});

Then('the user name should be {string}', async function (this: World, expectedName: string) {
  const response = this.getLastResponse();
  expect(response.data.name).to.equal(expectedName);
  this.logger.info(`User name verified: ${response.data.name}`);
});

Then('the user email should be {string}', async function (this: World, expectedEmail: string) {
  const response = this.getLastResponse();
  expect(response.data.email).to.equal(expectedEmail);
  this.logger.info(`User email verified: ${response.data.email}`);
});

Then('the post title should be {string}', async function (this: World, expectedTitle: string) {
  const response = this.getLastResponse();
  expect(response.data.title).to.equal(expectedTitle);
  this.logger.info(`Post title verified: ${response.data.title}`);
});
