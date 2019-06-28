class SearchResult {
  constructor (selector, index, parent) {
    this.selector = selector
    this.index = index
    this.parent = parent
  }

  get container () { return this.parent.$$(this.selector)[this.index] }
  get title () { return this.container.$('.result__a') }
  get snippit () { return this.container.$('.result__snippet') }
  get url () { return this.container.$('.result__url') }
  get icon () { return this.container.$('.result__icon img') }
}

module.exports = SearchResult
