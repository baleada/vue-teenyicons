import { configureable } from '@baleada/prepare'
import toComponent from './source-transforms/toComponent.js'
import toIndex from './source-transforms/toIndex.js'
import toIcons from './source-transforms/toIcons.js'

const icons = toIcons()

export default [
  configureable('rollup')
    .delete({ targets: 'lib/*' })
    .input('src/index.js')
    .resolve()
    .external([/^vue$/])
    .virtual(({ testable }) => ({
      test: testable.idEndsWith('src/index.js').test,
      transform: () => toIndex(icons)
    }))
    .virtual(({ testable }) => ({
      test: param => 
        icons.some(({ componentName }) => testable.idEndsWith(`src/components/${componentName}.vue`).test(param))
        &&
        testable.queryIsEmpty().test(param),
      transform: ({ id }) => toComponent(icons.find(({ componentName }) => id.endsWith(`${componentName}.vue`)))
    }))
    .vue()
    .esm({ file: 'lib/index.js', target: 'browser' })
    // .analyze()
    .configure()
]
