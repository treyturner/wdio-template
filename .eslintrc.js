module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    // Globals
    'suiteStats': 'true',
    '$': 'true',
    'platform': 'true',
    'browser': 'readonly',
    'localBrowser': 'true',
    // Mocha
    'before': 'true',
    'describe': 'true',
    'after': 'true',
    'it': 'true',
    // Libraries
    '_': 'true',
    'moment': 'true',
    'shared': 'true',
    'itParam': 'true',
    'expect': 'true',
    // Page objects
    'ddg': 'true',
    'tt': 'true',
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'no-unused-expressions': 'off'
  }
}
