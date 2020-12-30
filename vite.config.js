import { configureable } from '@baleada/prepare'
import toComponent from './source-transforms/toComponent.js'
import toIndex from './source-transforms/toIndex.js'
import toIcons from './source-transforms/toIcons.js'

const icons = toIcons()

export default configureable('vite')
  .alias({
    '/@src/': `/src`,
  })
  .koa(configureable => 
    configureable
      .virtual(({ testable }) => ({
        test: testable.idEndsWith('src/index.js').test,
        transform: () => toIndex(icons)
      }))
      .virtual(({ testable }) => ({
        test: param => 
          icons.some(({ componentName }) => testable.idEndsWith(`src/components/${componentName}.vue`).test(param)),
        transform: ({ id }) => toComponent(icons.find(({ componentName }) => id.endsWith(`${componentName}.vue`)))
      }))
      .configure()
  )
  .configure()
