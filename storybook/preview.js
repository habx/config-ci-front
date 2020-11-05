import { addDecorator, addParameters } from '@storybook/react'

import { StyleDecorator } from './style'

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
