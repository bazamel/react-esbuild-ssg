const fs = require('fs').promises
const { performance } = require('perf_hooks')
const esbuild = require('esbuild')
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV

const main = async () => {
  // 1) create build directory
  await fs.mkdir('build').catch(err => {})

  // 2) esbuild bundling
  await createFrontEndBundle()
  await createSsrBundle()

  // 3) SSG
  const template = await fs.readFile('public/index.html', "utf8")
  const AppSsr = require('./build/ssr.js').default

  const t0 = performance.now()
  const size = 20000 //generate 100 static pages
  await generateFiles(AppSsr, template, size)
  const t1 = performance.now()
  console.log('Generated %d static pages in %sms (%sms average per page)', size, t1 - t0, (t1-t0)/size)
}

const createFrontEndBundle = () => {
  const t0 = performance.now()

  return esbuild
  .build({
    entryPoints: ['./src/index.js'],
    format: 'esm',
    define: { "process.env.NODE_ENV": `"${NODE_ENV}"` },
    loader: {
      '.js': 'jsx'
    },
    bundle: true,
    outfile: './build/index.js'
  })
  .then(() => {
    const t1 = performance.now()
    console.log('JS bundle built in %sms', t1 - t0)
  })
}

const createSsrBundle = () => {
  const t0 = performance.now()

  return esbuild
  .build({
    entryPoints: ['./src/ssr.js'],
    platform: 'node',
    loader: {
      '.js': 'jsx'
    },
    bundle: true,
    outfile: './build/ssr.js'
  })
  .then(() => {
    const t1 = performance.now()
    console.log('SSR bundle built in %sms', t1 - t0)
  })
}

const generateFiles = (AppSsr, template, size) => {
  for(let i = 0 ; i < size ; i++){
    const props = {
      name: "Ali"
    }
    const html = AppSsr(props)

    const prerendered_page = template
    .replace('<%title%>', props.name)
    .replace('<%ssr_props%>', JSON.stringify(props))
    .replace('<%html%>', html)

    fs.writeFile(`build/index_${i}.html`, prerendered_page)
  }
}

main()
