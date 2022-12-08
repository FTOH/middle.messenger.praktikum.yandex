const { precompile } = require('handlebars')

/** @type {import('webpack').LoaderDefinitionFunction} */
module.exports = function loader(content) {
  const precompiled = precompile(content)

  return `
import { template } from 'handlebars/runtime';
export default template(${precompiled});
`
}
