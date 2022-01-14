import { StyleDecorator } from './style'

export const decorators = [
  (Story) => (
    <StyleDecorator>
      <Story />
    </StyleDecorator>
  ),
];

export const parameters = {
  info: {},
  layout: 'centered',
  options: {
    sortStoriesByKind: true,
    theme: {
      base: 'light',
      brandTitle: 'Habx'
    },
  },
}
