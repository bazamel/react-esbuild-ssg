const fs = require('fs').promises
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

  const props = {
    name: "Ali"
  }
  const html = AppSsr(props)

  const prerendered_page = template
  .replace('<%title%>', props.name)
  .replace('<%ssr_props%>', JSON.stringify(props))
  .replace('<%html%>', html)

  await fs.writeFile('build/index.html', prerendered_page)
}

const createFrontEndBundle = () => esbuild.build({
  entryPoints: ['./src/index.js'],
  format: 'esm',
  define: { "process.env.NODE_ENV": `"${NODE_ENV}"` },
  loader: {
    '.js': 'jsx'
  },
  bundle: true,
  outfile: './build/index.js'
})

const createSsrBundle = () => esbuild.build({
  entryPoints: ['./src/ssr.js'],
  platform: 'node',
  loader: {
    '.js': 'jsx'
  },
  bundle: true,
  outfile: './build/ssr.js'
})

main()
