import { configureable, getIcons } from '@baleada/prepare'

const icons = getIcons({
  set: 'Teenyicons',
  dirs: ['filled', 'outline'],
  basePath: 'git_modules/teenyicons.com/assets/icons',
  toSnakeCased: ({ name, dir }) => `${name}${dir === 'outline' ? '-outline' : ''}`,
})

export default configureable('vite')
  .alias({
    '/@src/': `/src`,
  })
  .koa(configureable => 
    configureable
      .virtual.iconComponentIndex({ icons })
      .virtual.iconComponents({ icons })
      .configure()
  )
  .configure()
