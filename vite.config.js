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
      .virtual(({ createIdEndsWith }) => ({
        test: createIdEndsWith('src/index.js'),
        transform: () => toIndex(icons)
      }))
      .virtual(({ createIdEndsWith }) => ({
        test: ({ id }) => {
          console.log(id)
          return icons.some(({ componentName }) => createIdEndsWith(`src/components/${componentName}.vue`)({ id }))
        },
        transform: ({ id }) => ({
          type: 'vue',
          source: toComponent(icons.find(({ componentName }) => id.endsWith(`${componentName}.vue`)))
        })
      }))
      .configure()
  )
  .configure()
