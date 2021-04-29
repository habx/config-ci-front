const path = require('path')

const mapToFolder = (dependencies, folder) =>
  dependencies.reduce((acc, dependency) => ({
    [dependency]: path.resolve(`${folder}/${dependency}`),
    ...acc,
  }), {})

const getLinkedDependencies = () => {
  try {
    return require(path.resolve('./linked-deps.json'))
  } catch {
    return []
  }
}

module.exports = {
  resolve: {
    alias: {
      '@api': path.resolve('./src/api'),
      '@components': path.resolve('./src/components'),
      '@config': path.resolve('./src/config'),
      '@globalTypes': path.resolve('./src/globalTypes'),
      '@helpers': path.resolve('./src/helpers'),
      '@hooks': path.resolve('./src/hooks'),
      '@intl': path.resolve('./src/intl'),
      '@lib': path.resolve('./src/lib'),
      '@pages': path.resolve('./src/pages'),
      '@style': path.resolve('./src/style'),

      ...mapToFolder(
        [
          'react',
          'react-dom',
          'styled-components',
          'final-form',
          'final-form-arrays',
          'react-final-form',
          'react-intl',
          'react-beautiful-dnd',
          ...getLinkedDependencies()
        ],
        './node_modules'
      ),
    },
  },
}
