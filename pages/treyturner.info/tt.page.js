class TreyTurnerInfo {
  get preloader () { return $('.preloader') }
  get downloadCv () { return $('.lnks > a:nth-of-type(1)') }
}

module.exports = new TreyTurnerInfo()
