shared.setup('DuckDuckGo')

describe('Duck Duck Go', () => {
  before(function () {
    ddg.input.waitForDisplayed(5000)
  })

  describe('landing page', () => {
    it('should show the search input', () => {
      expect(ddg.input.isDisplayed()).to.be.true
    })

    it('should show the submit button', () => {
      expect(ddg.submit.isDisplayed()).to.be.true
    })

    it('should have class "search__button" on the submit button', () => {
      expect(ddg.submit.hasClass('search__button')).to.be.true
    })
  })

  describe('search', () => {
    it('should be enabled', () => {
      expect(ddg.input.isEnabled()).to.be.true
    })

    it('should take keyboard input from the user', () => {
      ddg.input.setValue('webdriver.io')
      expect(ddg.input.getValue()).to.equal('webdriver.io')
    })
  })

  describe('search results', () => {
    it('should appear once search is submitted', () => {
      ddg.submit.click()
      expect(ddg.resultsSection.isDisplayed()).to.be.true
    })

    it('can be handled in batch', () => {
      expect(ddg.results().length).to.equal(10)
    })

    it('can be handled individually by index', () => {
      // Print the title, snippit, and url for the first result
      for (let i = 0; i < 1; i++) {
        console.log(`title[${i}]: ${ddg.results(i).title.getText()}`)
        console.log(`snippit[${i}]: ${ddg.results(i).snippit.getText()}`)
        console.log(`url[${i}]: ${ddg.results(i).url.getText()}`)
      }
    })
  })
})
