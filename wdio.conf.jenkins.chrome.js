const jenkinsBase = require('./wdio.conf.jenkins.base.js')

exports.config = Object.assign(jenkinsBase.config, {
  capabilities: [
    {
      browserName: 'chrome',
      maxInstances: 1,
      'goog:chromeOptions': {
        args: ['--disable-infobars']
      }
    }
  ]
})
