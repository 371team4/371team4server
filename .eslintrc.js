// https://eslint.org/docs/user-guide/configuring

// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    es6: true,
    mocha: true,
    node: true
  },
  extends: ['eslint:recommended'],

  // add your custom rules here
  rules: {
    strict: 'error',
    'no-console': 'off',
    camelcase: [
      'error',
      {
        properties: 'always'
      }
    ],
    // don"t require comma in the last line of an object/dictionary declaration
    'comma-dangle': ['error', 'never'],
    // ignore max-len for comments
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true
      }
    ],
    // force space after and before curly braces in object/dict declarations
    'object-curly-spacing': ['error', 'always'],
    // force "===" in comparisons when ambiguous
    eqeqeq: ['error', 'smart'],
    'no-tabs': 'off',
    'require-jsdoc': 'off',
    'new-cap': ['error', { capIsNew: false }],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', { anonymous: 'always' }],
    'no-use-before-define': ['error', 'nofunc']
  }
}
