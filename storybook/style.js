const React = require('react')
const { createGlobalStyle } =  require('styled-components')

const { theme, Provider, ThemeProvider, DEFAULT_THEME } = require('@habx/ui-core')

const FONT_ROOT = 'https://cdn.habx.com/assets/fonts'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ${theme.font()};
    color: ${theme.textColor()};
  }

  * {
    box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a {
    text-decoration: none;
    font-weight: 500;
    color: inherit;

    &:visited {
      color: inherit;
    }
  }

   @font-face {
    font-family: 'EuclidCircularB';
    src: url('${FONT_ROOT}/euclid/regular.woff2') format('woff2'),
         url('${FONT_ROOT}/euclid/regular.woff') format('woff'),
         url('${FONT_ROOT}/euclid/regular.eot') format('eot'),
         local('Sans-Serif');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'EuclidCircularB';
    src: url('${FONT_ROOT}/euclid/medium.woff2') format('woff2'),
         url('${FONT_ROOT}/euclid/medium.woff') format('woff'),
         url('${FONT_ROOT}/euclid/medium.eot') format('eot'),
         local('Sans-Serif');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'EuclidCircularB';
    src: url('${FONT_ROOT}/euclid/semibold.woff2') format('woff2'),
         url('${FONT_ROOT}/euclid/semibold.woff') format('woff'),
         url('${FONT_ROOT}/euclid/semibold.eot') format('eot'),
         local('Sans-Serif');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'habx-icon';
    src:
      url('${FONT_ROOT}/icons/habx.woff2') format('woff2'),
      url('${FONT_ROOT}/icons/habx.woff') format('woff'),
      url('${FONT_ROOT}/icons/habx.eot') format('eot'),
      url('${FONT_ROOT}/icons/habx.eot?#iefix') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    font-display: fallback;
  }
`

const StyleDecorator = (storyFn) => React.createElement(Provider, {
  children: [React.createElement(ThemeProvider, {
    key: 1,
    theme: DEFAULT_THEME,
    children: [
      // Somehow, CSS overrides are broken inside Storybook.
      // The following component tries to mitigate the issue by reordering `styled-components` injected CSS stylesheets.
      React.createElement(() => {
        if (!ordered) {
          const head = document.head
          const style = head.querySelector('style[data-styled]')

          if (style) {
            head.appendChild(head.removeChild(style))
            ordered = true
          }
        }

        return null
      }, { key: 1 }),
      React.createElement(GlobalStyle, { key: 2 }),
      React.createElement(storyFn, { key: 3 }),
    ]
  })]
})

let ordered = false

module.exports = { StyleDecorator, Provider }
