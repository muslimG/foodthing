/* eslint-disable */
const path = require('path');
const { capitalize, startCase } = require('lodash');

module.exports = {
  // @ts-ignore
  process(_, filename) {
    const name = startCase(capitalize(path.parse(filename).name)).replace(/ /g, '');
    return {
      code: `const ${name}SVG = () =>  null;
             module.exports = ${name}SVG;`,
    };
  },
};
