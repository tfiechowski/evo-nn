'use strict';

module.exports = {
  root: true,
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true
  },
  globals: {
    fetch: true,
    window: true
  },
  plugins: ['class-property', 'react'],
  rules: {
    // Possible Errors
    'no-await-in-loop': 0,
    'no-cond-assign': [2, 'always'],
    'no-console': 0,
    'no-constant-condition': [1, { checkLoops: false }],
    'no-control-regex': 1,
    'no-debugger': 1,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty': 1,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 1,
    // 'no-extra-parens': 1,
    'no-extra-semi': 1,
    'no-func-assign': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': [2, { skipStrings: false }],
    'no-obj-calls': 2,
    'no-prototype-builtins': 0,
    'no-regex-spaces': 1,
    'no-sparse-arrays': 2,
    'no-template-curly-in-string': 1,
    'no-unexpected-multiline': 2,
    'no-unreachable': 1,
    'no-unsafe-finally': 2,
    'no-unsafe-negation': 2,
    'use-isnan': 2,
    'valid-jsdoc': 0,
    'valid-typeof': 2,

    // Best Practices
    'accessor-pairs': 1,
    'array-callback-return': 2,
    'block-scoped-var': 2,
    'class-methods-use-this': 0, // TODO: make it 1 later - it can run, but we don't want it on production
    complexity: 1,
    'consistent-return': 0,
    curly: 1,
    'default-case': 0,
    'dot-location': [1, 'property'],
    // 'dot-notation': 1,
    eqeqeq: 2,
    'guard-for-in': 0,
    'no-alert': 0, // TODO: make it 1 later - we don't want this on production
    'no-caller': 2,
    'no-case-declarations': 2,
    'no-div-regex': 2,
    // 'no-else-return': 1,
    // 'no-empty-function': 1,
    'no-empty-pattern': 1,
    'no-eq-null': 1,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 1,
    'no-extra-label': 1,
    'no-fallthrough': 1,
    'no-floating-decimal': 1,
    'no-global-assign': 2,
    'no-implicit-coercion': [1, { allow: ['!!', '+'] }],
    'no-implicit-globals': 2,
    'no-implied-eval': 2,
    'no-invalid-this': 0,
    'no-iterator': 2,
    'no-labels': 1,
    'no-lone-blocks': 1,
    'no-loop-func': 1,
    'no-magic-numbers': 0,
    'no-multi-spaces': 1,
    'no-multi-str': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    // 'no-new': 1,
    'no-octal-escape': 2,
    'no-octal': 2,
    // 'no-param-reassign': 1,
    'no-proto': 2,
    'no-redeclare': 2,
    // 'no-restricted-properties': 0,
    'no-return-assign': 2,
    'no-return-await': 1,
    'no-script-url': 2,
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 1,
    'no-throw-literal': 1,
    'no-unmodified-loop-condition': 1,
    'no-unused-expressions': 1,
    'no-unused-labels': 1,
    'no-useless-call': 1,
    'no-useless-concat': 1,
    'no-useless-escape': 2,
    'no-useless-return': 1,
    'no-void': 1,
    'no-warning-comments': 0,
    'no-with': 2,
    radix: 2,
    'require-await': 1,
    'vars-on-top': 0,
    'wrap-iife': 0,
    yoda: 1,

    // Strict Mode
    strict: 1,

    // Variables
    'init-declarations': 0,
    'no-catch-shadow': 2,
    'no-delete-var': 2,
    'no-label-var': 2,
    'no-restricted-globals': 0,
    'no-shadow-restricted-names': 2,
    'no-shadow': 0,
    'no-undef-init': 1,
    'no-undef': 2,
    // 'no-undefined': 1,
    'no-unused-vars': 1,
    'no-use-before-define': [2, 'nofunc'],

    // Node.js and CommonJS
    'callback-return': 0,
    'global-require': 0,
    'handle-callback-err': 1,
    'no-mixed-requires': 0,
    'no-new-require': 2,
    'no-path-concat': 1,
    'no-process-env': 0,
    'no-process-exit': 0,
    'no-restricted-modules': 0,
    'no-sync': 0,

    // Stylistic Issues
    'array-bracket-spacing': 1,
    'block-spacing': 1,
    'brace-style': 1,
    camelcase: 0,
    'capitalized-comments': 0,
    'comma-dangle': [1, 'always-multiline'],
    'comma-spacing': 1,
    'comma-style': 1,
    'computed-property-spacing': 1,
    // 'consistent-this': [1, 'self'],
    'eol-last': 1,
    'func-call-spacing': 1,
    'func-name-matching': 2,
    'func-names': 0,
    'func-style': [1, 'declaration', { allowArrowFunctions: true }],
    'id-blacklist': 0,
    'id-length': 0,
    'id-match': 0,
    indent: [1, 2, { SwitchCase: 1 }],
    'jsx-quotes': 1,
    'key-spacing': 1,
    'keyword-spacing': 1,
    'line-comment-position': 0,
    'linebreak-style': 1,
    'lines-around-comment': 0,
    'lines-around-directive': 1,
    'max-depth': 1,
    // 'max-len': [1, { code: 120 }],
    // 'max-lines': [1, 420],
    'max-nested-callbacks': 1,
    // 'max-params': 1,
    'max-statements-per-line': 1,
    // 'max-statements': [1, 24],
    // 'multiline-ternary': 0,
    'max-statements-per-line': 1,
    // 'new-cap': 1,
    'new-parens': 1,
    // 'newline-after-var': 1,
    // 'newline-before-return': 1,
    'newline-per-chained-call': 0,
    'no-array-constructor': 2,
    'no-bitwise': 1,
    'no-continue': 0,
    'no-inline-comments': 0,
    'no-lonely-if': 0,
    'no-mixed-operators': 0,
    'no-mixed-spaces-and-tabs': 1,
    'no-multiple-empty-lines': [1, { max: 2, maxBOF: 0, maxEOF: 0 }],
    'no-negated-condition': 0,
    'no-nested-ternary': 0,
    'no-new-object': 1,
    'no-plusplus': [1, { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 0,
    'no-tabs': 1,
    'no-ternary': 0,
    'no-trailing-spaces': 1,
    'no-underscore-dangle': 0,
    'no-unneeded-ternary': 1,
    'no-whitespace-before-property': 1,
    'object-curly-newline': 0,
    'object-curly-spacing': [1, 'always'],
    'object-property-newline': [1, { allowMultiplePropertiesPerLine: true }],
    'one-var-declaration-per-line': 1,
    'one-var': [1, 'never'],
    'operator-assignment': 1,
    'operator-linebreak': [1, 'after'],
    'padded-blocks': 0,
    // 'quote-props': [1, 'consistent'],
    quotes: [1, 'single'],
    'require-jsdoc': 0,
    'semi-spacing': 1,
    semi: 1,
    'sort-keys': 0,
    'sort-vars': 0,
    'space-before-blocks': 1,
    'space-before-function-paren': [1, { anonymous: 'always', named: 'never' }],
    'space-in-parens': 1,
    'space-infix-ops': 1,
    'space-unary-ops': 1,
    'spaced-comment': 1,
    'unicode-bom': 1,
    'wrap-regex': 1,

    // ECMAScript 6
    'arrow-body-style': 1,
    'arrow-parens': [1, 'as-needed'],
    'arrow-spacing': 1,
    'constructor-super': 2,
    'generator-star-spacing': [1, { before: false, after: true }],
    'no-class-assign': 2,
    'no-confusing-arrow': [1, { allowParens: true }],
    'no-const-assign': 2,
    'no-dupe-class-members': 2,
    'no-duplicate-imports': 1,
    'no-new-symbol': 2,
    'no-restricted-imports': 0,
    'no-this-before-super': 2,
    'no-useless-computed-key': 1,
    'no-useless-constructor': 1,
    'no-useless-rename': 1,
    'no-var': 1,
    'object-shorthand': 1,
    // 'prefer-arrow-callback': 1,
    'prefer-const': 1,
    // 'prefer-destructuring': 1, // maybe someday
    'prefer-numeric-literals': 1,
    'prefer-rest-params': 1,
    'prefer-spread': 1,
    // 'prefer-template': 1,
    'require-yield': 1,
    'rest-spread-spacing': 1,
    'sort-imports': 0,
    // 'symbol-description': 0,
    'template-curly-spacing': 1,
    'yield-star-spacing': [1, 'after'],

    'class-property/class-property-semicolon': 1,

    'react/react-in-jsx-scope': 0
  }
};