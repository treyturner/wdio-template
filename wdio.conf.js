const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  //
  // =====================
  // Server Configurations
  // =====================
  // Host address of the running Selenium server. This information is usually obsolete as
  // WebdriverIO automatically connects to localhost. Also, if you are using one of the
  // supported cloud services like Sauce Labs, Browserstack, or Testing Bot you don't
  // need to define host and port information because WebdriverIO can figure that out
  // according to your user and key information. However, if you are using a private Selenium
  // backend you should define the host address, port, and path here.
  //
  // hostname: 'grid.example.com',
  // port: 4444,
  // path: '/wd/hub',
  //
  // Uncomment line below to override default path ('/wd/hub') for usage of driver binary directly, ex: chromedriver or geckodriver.
  // path: '/',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    './specs/**/*.js'
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [
    // {
    //   browserName: 'chrome',
    //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    //   // grid with only 5 firefox instances available you can make sure that not more than
    //   // 5 instances get started at a time.
    //   maxInstances: 1,
    //   'goog:chromeOptions': {
    //     args: ['--disable-infobars']
    //   }
    //   // If outputDir is provided WebdriverIO can capture driver session logs
    //   // it is possible to configure which logTypes to include/exclude.
    //   // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    //   // excludeDriverLogs: ['bugreport', 'server'],
    // },
    {
      browserName: 'firefox',
      maxInstances: 1
    }
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'info',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner, @wdio/lambda-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  outputDir: path.join(__dirname, 'logs'),
  //
  // Set a folder to create screenshots on error
  screenshotPath: path.join(__dirname, 'screenshots'),
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: '',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['selenium-standalone'],
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  reporters: [
    'spec',
    ['junit', {
      outputDir: './reports/junit',
      outputFileFormat: function (options) {
        // console.log(`junitReporter.options:`, options)
        let platform = options.capabilities.platform || options.capabilities.platformName
        return `results-${options.cid}.${platform}.${options.capabilities.browserName}.xml`.replace(/\s+/g, '_')
      }
    }],
    ['allure', {
      outputDir: './reports/allure-results'
    }]
  ],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    bail: false // Set true to stop test after first failure
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    // console.log(`onPrepare.config:`, config)
    // console.log(`onPrepare.capabilities:`, capabilities)

    // Determine if the browser is on the local machine and store for later use, such as
    // determining the path of test files to upload
    localBrowser = config.hostname === '127.0.0.1'

    // We need to create screenshots directory if it doesn't exist
    if (!fs.existsSync(this.screenshotPath)) { mkdirp.sync(this.screenshotPath) }
  },
  //
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  //   console.log(`beforeSession.config:`, config)
  //   console.log(`beforeSession.capabilities:`, capabilities)
  //   console.log(`beforeSession.specs:`, specs)    
  // },
  //
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
    // console.log(`before.capabilities:`, capabilities)
    // console.log(`before.specs:`, specs)
    // console.log(`before.browser:`, browser)

    // Normalize platform string
    platform = browser.capabilities.platform || browser.capabilities.platformName

    // Load libraries
    _ = require('lodash')
    moment = require('moment')
    shared = require('mocha-shared')
    itParam = require('mocha-param')
    expect = require('chai').expect

    // Define custom commands
    /**
     * Check an element for a specific class
     * @param {String} className The name of the class to search
     */
    browser.addCommand('hasClass', function (className) {
      return this.getAttribute('class').split(' ').includes(className)
    }, true)

    /**
     * Right click abstraction since browsers do this differently
     */
    browser.addCommand('rightClick', function () {
      switch (browser.capabilities.browserName) {
        case 'chrome':
          return this.rightClick()
        default:
          // TODO: Implement actions API for Firefox and Safari
          break
      }
    }, true)

    /**
     * Click an element that spawns a new window and return the new and original window IDs
     */
    browser.addCommand('clickAndHandleNewWindow', function () {
      // Get current window ID
      let originalWindowId = browser.getWindowHandle()
      // Get original list of window IDs
      let originalWindowIds = browser.getWindowHandles()
      // Click the element
      this.click()
      // Wait for a new window to appear
      browser.waitUntil(function () {
        return browser.getWindowHandles().length > originalWindowIds.length
      }, 5000, `Didn't detect a new window opened`)
      // Subtract original window IDs from new list and fetch the only member of the result
      let newWindowId = browser.getWindowHandles().filter(e => !originalWindowIds.includes(e))[0]
      // Switch to the new window
      browser.switchToWindow(newWindowId)
      // Firefox needs some time to init the new window
      if (browser.capabilities.browserName === 'firefox') {
        browser.waitUntil(function () {
          return browser.getUrl() !== 'about:blank'
        }, 5000, `Firefox never navigated away from about:blank`)
      }
      // Return an object with both new and original window IDs
      return { original: originalWindowId, new: newWindowId }
    }, true)

    /**
     * Handles file uploads. We'll use a base file path of testData/ when running
     * locally and specify a path containing the same files that we can somehow
     * keep in sync on Selenium nodes.
     */
    browser.addCommand('upload', function (file) {
      // TODO: Handle file uploads
    }, true)

    /**
     * Load page objects
     */
    ddg = require('./pages/DuckDuckGo/ddg.page')
    tt = require('./pages/treyturner.info/tt.page')

    /**
     * Shared setups
     */
    shared.setup('DuckDuckGo', function () {
      browser.url('https://duckduckgo.com')
    })

    shared.setup('treyturner.info', function () {
      browser.url('https://treyturner.info')
    })

    // Maximize browser
    browser.maximizeWindow()
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  // beforeSuite: function (suite) {
  //   console.log(`beforeSuite.suite:`, suite)
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  // beforeTest: function (test) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function () {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function () {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest: function (test) {
    // console.log(`afterTest.test:`, test)

    if (!test.passed) {
      let timestamp = moment().format('YYYYMMDD-HHmmss')
      let filename = `${timestamp}-${browser.capabilities.browserName}-${test.fullTitle}`.replace(/\s+/g, '_')
      let encoded = encodeURIComponent(filename)
      let filePath = path.join(this.screenshotPath, `${encoded}.png`)
      browser.saveScreenshot(filePath)
    }
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  //   // console.log(`afterSuite.suite:`, suite)
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  //   console.log(`after.result:`, result)
  //   console.log(`after.capabilities:`, capabilities)
  //   console.log(`after.specs:`, specs)
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  //   console.log(`afterSession.config:`, config)
  //   console.log(`afterSession.capabilities:`, capabilities)
  //   console.log(`afterSession.specs:`, specs)
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  // onComplete: function (exitCode, config, capabilities, results) {
  //   console.log(`onComplete.exitCode:`, exitCode)
  //   console.log(`onComplete.config:`, config)
  //   console.log(`onComplete.capabilities:`, capabilities)
  //   console.log(`onComplete.results:`, results)
  // }
  /**
  * Gets executed when a refresh happens.
  * @param {String} oldSessionId session ID of the old session
  * @param {String} newSessionId session ID of the new session
  */
  // onReload: function (oldSessionId, newSessionId) {
  // }
}
