import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app.js'

export const main = props => {
  return renderToString(<App {...props}/>)
}

export default main
