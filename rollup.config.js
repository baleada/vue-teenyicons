import { configureable, getIcons } from '@baleada/prepare'

const icons = getIcons({
  set: 'Teenyicons',
  dirs: ['filled', 'outline'],
  basePath: 'git_modules/teenyicons.com/assets/icons',
  toSnakeCased: ({ name, dir }) => `${name}${dir === 'outline' ? '-outline' : ''}`,
})

export default [
  configureable('rollup')
    .delete({ targets: 'lib/*' })
    .input('src/index.js')
    .resolve()
    .external([/^vue$/])
    .virtual.iconComponentIndex({ icons })
    .virtual.iconComponents({ icons })
    .vue()
    .esm({ file: 'lib/index.js', target: 'browser' })
    // .analyze()
    .configure()
]
