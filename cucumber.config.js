module.exports = {
  default: {
    require: [
      'src/step-definitions/api-steps.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: [
      'src/features/**/*.feature'
    ],
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    parallel: 1,
    timeout: 60000
  }
};
