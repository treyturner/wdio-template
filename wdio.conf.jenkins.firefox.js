const jenkinsBase = require('./wdio.conf.jenkins.base.js')

exports.config = Object.assign(jenkinsBase.config, {
  capabilities: [
    {
      browserName: 'firefox',
      maxInstances: 1
    }
  ]
})
