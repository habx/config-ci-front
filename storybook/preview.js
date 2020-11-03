import { addParameters } from '@storybook/react'
import { create } from '@storybook/theming'

addParameters({
  info: {},
  layout: 'centered',
  options: {
    sortStoriesByKind: true,
    theme: create({
      base: 'light',
      brandTitle: 'Habx'
    }),
  },
})
