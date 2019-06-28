const localConfig = require('./wdio.conf.js')

exports.config = Object.assign(localConfig.config, {
  // Use Selenium grid
  hostname: process.env.SELENIUM_HUB_HOST,
  port: 4444,
  path: '/wd/hub',
  // Deselect 'selenium-standalone' from localConfig
  services: []
})
