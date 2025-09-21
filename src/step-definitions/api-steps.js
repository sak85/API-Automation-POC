const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const axios = require('axios');

// Simple World class for JavaScript
class World {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    this.context = {};
  }

  setTestData(key, value) {
    if (!this.context.testData) {
      this.context.testData = {};
    }
    this.context.testData[key] = value;
  }

  getTestData(key) {
    return this.context.testData?.[key];
  }

  setLastResponse(response) {
    this.context.lastResponse = response;
  }

  getLastResponse() {
    return this.context.lastResponse;
  }
}

// Set the world constructor
const { setWorldConstructor } = require('@cucumber/cucumber');
setWorldConstructor(World);

Given('I have a valid API client', async function () {
  console.log('API client initialized');
});

Given('I set the base URL to {string}', async function (baseUrl) {
  this.apiClient.defaults.baseURL = baseUrl;
  console.log(`Base URL set to: ${baseUrl}`);
});

Given('I have a user ID {string}', async function (userId) {
  this.setTestData('userId', userId);
});

Given('I have a post ID {string}', async function (postId) {
  this.setTestData('postId', postId);
});

Given('I have user data:', async function (dataTable) {
  const userData = dataTable.hashes()[0];
  this.setTestData('userData', userData);
});

Given('I have post data:', async function (dataTable) {
  const postData = dataTable.hashes()[0];
  this.setTestData('postData', postData);
});

Given('I have updated user data:', async function (dataTable) {
  const updatedData = dataTable.hashes()[0];
  this.setTestData('updatedUserData', updatedData);
});

Given('I have updated post data:', async function (dataTable) {
  const updatedData = dataTable.hashes()[0];
  this.setTestData('updatedPostData', updatedData);
});

When('I make a GET request to {string}', async function (endpoint) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.get(endpoint);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    console.log(`GET request to ${endpoint} - Status: ${response.status} (${duration}ms)`);
  } catch (error) {
    console.error(`GET request failed: ${error.message}`);
    throw error;
  }
});

When('I make a GET request to {string} with query parameter {string} equal to {string}', async function (endpoint, param, value) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.get(endpoint, { params: { [param]: value } });
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    console.log(`GET request to ${endpoint} with ${param}=${value} - Status: ${response.status} (${duration}ms)`);
  } catch (error) {
    console.error(`GET request with query parameter failed: ${error.message}`);
    throw error;
  }
});

When('I make a POST request to {string} with the user data', async function (endpoint) {
  const userData = this.getTestData('userData');
  const startTime = Date.now();
  try {
    const response = await this.apiClient.post(endpoint, userData);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    console.log(`POST request to ${endpoint} - Status: ${response.status} (${duration}ms)`);
  } catch (error) {
    console.error(`POST request failed: ${error.message}`);
    throw error;
  }
});

When('I make a POST request to {string} with the post data', async function (endpoint) {
  const postData = this.getTestData('postData');
  const startTime = Date.now();
  try {
    const response = await this.apiClient.post(endpoint, postData);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    console.log(`POST request to ${endpoint} - Status: ${response.status} (${duration}ms)`);
  } catch (error) {
    console.error(`POST request failed: ${error.message}`);
    throw error;
  }
});

When('I make a PUT request to {string} with the updated data', async function (endpoint) {
  const updatedData = this.getTestData('updatedUserData') || this.getTestData('updatedPostData');
  const startTime = Date.now();
  try {
    const response = await this.apiClient.put(endpoint, updatedData);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    console.log(`PUT request to ${endpoint} - Status: ${response.status} (${duration}ms)`);
  } catch (error) {
    console.error(`PUT request failed: ${error.message}`);
    throw error;
  }
});

When('I make a DELETE request to {string}', async function (endpoint) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.delete(endpoint);
    const duration = Date.now() - startTime;
    this.setLastResponse(response);
    console.log(`DELETE request to ${endpoint} - Status: ${response.status} (${duration}ms)`);
  } catch (error) {
    console.error(`DELETE request failed: ${error.message}`);
    throw error;
  }
});

Then('the response status should be {int}', async function (expectedStatus) {
  const response = this.getLastResponse();
  expect(response).to.exist;
  expect(response.status).to.equal(expectedStatus);
  console.log(`Response status verified: ${response.status}`);
});

Then('the response should contain an array of users', async function () {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('array');
  expect(response.data.length).to.be.greaterThan(0);
  console.log(`Response contains ${response.data.length} users`);
});

Then('the response should contain an array of posts', async function () {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('array');
  expect(response.data.length).to.be.greaterThan(0);
  console.log(`Response contains ${response.data.length} posts`);
});

Then('the response should contain a user object', async function () {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('object');
  expect(response.data).to.not.be.an('array');
  console.log('Response contains a user object');
});

Then('the response should contain a post object', async function () {
  const response = this.getLastResponse();
  expect(response.data).to.be.an('object');
  expect(response.data).to.not.be.an('array');
  console.log('Response contains a post object');
});

Then('the response should contain the created user data', async function () {
  const response = this.getLastResponse();
  const userData = this.getTestData('userData');
  expect(response.data).to.include(userData);
  console.log('Response contains the created user data');
});

Then('the response should contain the created post data', async function () {
  const response = this.getLastResponse();
  const postData = this.getTestData('postData');
  expect(response.data).to.include(postData);
  console.log('Response contains the created post data');
});

Then('the response should contain the updated user data', async function () {
  const response = this.getLastResponse();
  const updatedData = this.getTestData('updatedUserData');
  expect(response.data).to.include(updatedData);
  console.log('Response contains the updated user data');
});

Then('the response should contain the updated post data', async function () {
  const response = this.getLastResponse();
  const updatedData = this.getTestData('updatedPostData');
  expect(response.data).to.include(updatedData);
  console.log('Response contains the updated post data');
});

Then('each user should have required fields: {string}', async function (fields) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  response.data.forEach((user, index) => {
    requiredFields.forEach(field => {
      expect(user).to.have.property(field, `User ${index + 1} missing required field: ${field}`);
    });
  });
  
  console.log(`Verified required fields for ${response.data.length} users: ${requiredFields.join(', ')}`);
});

Then('each user should have required fields: {string}, {string}, {string}, {string}', async function (field1, field2, field3, field4) {
  const response = this.getLastResponse();
  const requiredFields = [field1, field2, field3, field4].map(field => field.replace(/"/g, ''));
  
  response.data.forEach((user, index) => {
    requiredFields.forEach(field => {
      expect(user).to.have.property(field);
    });
  });
  
  console.log(`Verified required fields for ${response.data.length} users: ${requiredFields.join(', ')}`);
});

Then('each post should have required fields: {string}', async function (fields) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  response.data.forEach((post, index) => {
    requiredFields.forEach(field => {
      expect(post).to.have.property(field);
    });
  });
  
  console.log(`Verified required fields for ${response.data.length} posts: ${requiredFields.join(', ')}`);
});

Then('each post should have required fields: {string}, {string}, {string}, {string}', async function (field1, field2, field3, field4) {
  const response = this.getLastResponse();
  const requiredFields = [field1, field2, field3, field4].map(field => field.replace(/"/g, ''));
  
  response.data.forEach((post, index) => {
    requiredFields.forEach(field => {
      expect(post).to.have.property(field);
    });
  });
  
  console.log(`Verified required fields for ${response.data.length} posts: ${requiredFields.join(', ')}`);
});

Then('the user should have required fields: {string}', async function (fields) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field);
  });
  
  console.log(`Verified required fields for user: ${requiredFields.join(', ')}`);
});

Then('the user should have required fields: {string}, {string}, {string}, {string}', async function (field1, field2, field3, field4) {
  const response = this.getLastResponse();
  const requiredFields = [field1, field2, field3, field4].map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field);
  });
  
  console.log(`Verified required fields for user: ${requiredFields.join(', ')}`);
});

Then('the user should have required fields: {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}', async function (field1, field2, field3, field4, field5, field6, field7, field8) {
  const response = this.getLastResponse();
  const requiredFields = [field1, field2, field3, field4, field5, field6, field7, field8].map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field);
  });
  
  console.log(`Verified required fields for user: ${requiredFields.join(', ')}`);
});

Then('the post should have required fields: {string}', async function (fields) {
  const response = this.getLastResponse();
  const requiredFields = fields.split(', ').map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field);
  });
  
  console.log(`Verified required fields for post: ${requiredFields.join(', ')}`);
});

Then('the post should have required fields: {string}, {string}, {string}, {string}', async function (field1, field2, field3, field4) {
  const response = this.getLastResponse();
  const requiredFields = [field1, field2, field3, field4].map(field => field.replace(/"/g, ''));
  
  requiredFields.forEach(field => {
    expect(response.data).to.have.property(field);
  });
  
  console.log(`Verified required fields for post: ${requiredFields.join(', ')}`);
});

Then('the user ID should be {string}', async function (expectedId) {
  const response = this.getLastResponse();
  expect(response.data.id.toString()).to.equal(expectedId);
  console.log(`User ID verified: ${response.data.id}`);
});

Then('the post ID should be {string}', async function (expectedId) {
  const response = this.getLastResponse();
  expect(response.data.id.toString()).to.equal(expectedId);
  console.log(`Post ID verified: ${response.data.id}`);
});

Then('all posts should have userId equal to {string}', async function (expectedUserId) {
  const response = this.getLastResponse();
  response.data.forEach((post, index) => {
    expect(post.userId.toString()).to.equal(expectedUserId, `Post ${index + 1} has incorrect userId`);
  });
  console.log(`Verified userId for ${response.data.length} posts`);
});

Then('the user name should be {string}', async function (expectedName) {
  const response = this.getLastResponse();
  expect(response.data.name).to.equal(expectedName);
  console.log(`User name verified: ${response.data.name}`);
});

Then('the user email should be {string}', async function (expectedEmail) {
  const response = this.getLastResponse();
  expect(response.data.email).to.equal(expectedEmail);
  console.log(`User email verified: ${response.data.email}`);
});

Then('the post title should be {string}', async function (expectedTitle) {
  const response = this.getLastResponse();
  expect(response.data.title).to.equal(expectedTitle);
  console.log(`Post title verified: ${response.data.title}`);
});
