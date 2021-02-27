# A minimalist static file generator for React using esbuild

## Getting started

1. `yarn install`
2. `yarn dev`
3. Visit [http://localhost:3000](http://localhost:3000)

## Command lines

- `yarn dev`  
to generate a static website from the `build` directory and serve it from the port 3000

- `yarn test`  
to test the performance of the static site generator (execution time of the different steps)

## Observations

Webpack/NextJS/GatsbyJS is much slower for a simple Hello World program, but esbuild has nowhere near the same plugin ecosystem. This is a good choice for simple static sites or if you have time to transpile Webpack features to esbuild yourself.

## TODO

- Production build
- SPA routing
