const jenkinsConfig = require('./wdio.conf.jenkins.base.js')

exports.config = Object.assign(jenkinsConfig.config, {
  capabilities: [
    {
      browserName: 'chrome',
      maxInstances: 1,
      'goog:chromeOptions': {
        args: ['--disable-infobars']
      }
    }, {
      browserName: 'firefox',
      maxInstances: 1
    }
  ]
})
