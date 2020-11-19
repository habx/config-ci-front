const helpers = require('../helpers')

module.exports = {
  addons: helpers.exists(
    '@storybook/addon-essentials',
    'install the package to enable default addons.'
  )
    ? ['@storybook/addon-essentials']
    : [],
  stories: ['../src/**/*.stories.tsx'],
}
