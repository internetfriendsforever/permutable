import fs from 'fs'
import path from 'path'
import express from 'express'
import router from '@cyberspace/router'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import routes from './routes'
import favicon from './assets/favicon.png'
import styles from './styles.css'

const app = express()

app.use('/static', express.static(path.join(__dirname, 'static'), {
  immutable: true,
  maxAge: '1y'
}))

const client = fs.readFileSync(path.join(__dirname, 'scripts/client'))

app.use((req, res, next) => {
  const { key, params } = (router.resolve(routes, req.path) || {})
  const route = key ? routes[key]({ params }) : routes['NotFound']()

  res.status(route.status || 200).send(`
    <!doctype html>
    <html lang='en'>
      <head>
        <title>${route.title}</title>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='${styles}' />
        <link rel='icon' type='image/png' href='${favicon}'>
      </head>
      <body>
        <div id='root'>${renderStylesToString(renderToString(route.component))}</div>
        <script src='/${client}'></script>
      </body>
    </html>
  `)
})

const port = 3000

app.listen(port, () => {
  console.log('✨ Server ready at port', port)
})
