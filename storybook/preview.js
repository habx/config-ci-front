const { addDecorator, addParameters } = require('@storybook/react')

const { StyleDecorator } = require('./style')

addDecorator(StyleDecorator)

addParameters({
  info: {},
  layout: 'centered',
  options: {
    sortStoriesByKind: true,
    theme: {
      base: 'light',
      brandTitle: 'Habx'
    },
  },
})
