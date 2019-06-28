shared.setup('treyturner.info')

let windowIds

describe('clicking a link', () => {
  it('can open in a new window', () => {
    browser.waitUntil(function () {
      return !tt.preloader.isDisplayed() && tt.downloadCv.isDisplayed()
    }, 5000, `Preloader didn't disappear or download link didn't appear`)
    windowIds = tt.downloadCv.clickAndHandleNewWindow()
    expect(browser.getWindowHandle()).to.equal(windowIds.new)
    expect(browser.getUrl()).to.include('Resume-Scrubbed.pdf')
  })
})

describe('new window', () => {
  it('can be closed', () => {
    browser.closeWindow()
    expect(browser.getWindowHandles()).to.not.include(windowIds.new)
  })
})

describe('original window', () => {
  it('is still available', () => {
    browser.switchToWindow(windowIds.original)
    expect(browser.getWindowHandle()).to.equal(windowIds.original)
    expect(browser.getTitle()).to.equal('Trey Turner – vCard')
  })
})
