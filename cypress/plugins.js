const merge= require('lodash/merge')
const common = require('./default.json')

module.exports = (_on, config) => {
  return merge(config, common)
}
