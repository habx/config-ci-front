/**
 * @param name {string}
 * @param [warning] {string}
 */
exports.exists = (name, warning) => {
  try {
    require.resolve(name)
  } catch {
    if (warning) {
      console.warn(`[${name}]: ${warning}`)
    }

    return false
  }

  return true
}
