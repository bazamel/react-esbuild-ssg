const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
const path = require('path')

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'build')
})

const start = async () => {
  try {
    console.log('listening on port 3000 (http://localhost:3000)')
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
