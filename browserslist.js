module.exports = {
  production: [
    '>0.2%',
    'not IE 11',
    'not safari 8',
    'not dead',
    'not op_mini all'
  ],
  development: [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 safari version'
  ]
}
