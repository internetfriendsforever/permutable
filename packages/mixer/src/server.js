import fs from 'fs'
import path from 'path'
import express from 'express'
import favicon from './assets/favicon.png'
import styles from './styles.css'

const app = express()

app.use('/static', express.static(path.join(__dirname, 'static'), {
  immutable: true,
  maxAge: '1y'
}))

const client = fs.readFileSync(path.join(__dirname, 'scripts/client'))

app.get('/', (req, res, next) => {
  res.status(200).send(`
    <!doctype html>
    <html lang='en'>
      <head>
        <title>Mixer</title>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='${styles}' />
        <link rel='icon' type='image/png' href='${favicon}'>
      </head>
      <body>
        <div id='root'></div>
        <script src='/${client}'></script>
      </body>
    </html>
  `)
})

const port = 3000

app.listen(port, () => {
  console.log('✨ Server ready at port', port)
})
