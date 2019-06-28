const SearchResult = require('./generic/SearchResult.generic')

class DuckDuckGo {
  get input () { return $('#search_form_input_homepage') }
  get submit () { return $('#search_button_homepage') }
  get resultsSection () { return $('#links') }
  results (index = undefined) {
    let selector = '.results_links_deep'
    let parent = this.resultsSection
    return typeof index === 'undefined' ? parent.$$(selector) : new SearchResult(selector, index, parent)
  }
}

module.exports = new DuckDuckGo()
