const fs = require('fs'),
      { toComponentCase } = require('./util')

module.exports = function () {
  const filledIcons = getIcons('filled'),
        outlineIcons = getIcons('outline')

  return [...filledIcons, ...outlineIcons]
}

const viewBoxRegexp = /viewBox="((?:\d|\s)+)/,
      openTagRegexp = /^<svg .*?>\n\s*/,
      closeTagRegexp = /(?:\n|\s)*<\/svg>(?:\n|\s)*$/,
      fileNameRegexp = /(?:\w|-|\.)+$/,
      fileExtensionRegexp = /\.svg$/
function getIcons (dir) {
  const files = fs.readdirSync(`./git_modules/teenyicons.com/assets/icons/${dir}`),
        metadata = files.map(file => ({
          name: `${file.match(fileNameRegexp)[0].replace(fileExtensionRegexp, '')}${dir === 'outline' ? '-outline' : ''}`,
          contents: fs.readFileSync(`./git_modules/teenyicons.com/assets/icons/${dir}/${file}`, 'utf8'),
        }))

  return metadata.map(({ name, contents }) => ({
    componentName: `Teenyicons${toComponentName(name)}`,
    contents: contents.replace(openTagRegexp, '').replace(closeTagRegexp, ''),
    viewBox: contents.match(viewBoxRegexp)[1],
  }))
}

function toComponentName (snakeCased) {
  return toComponentCase(snakeCased)
}