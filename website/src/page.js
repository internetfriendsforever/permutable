const pretty = require('pretty')

module.exports = function page ({ title, content }) {
  return pretty(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8" />
        <link rel="stylesheet" href="assets/highlight/dracula.css" />
        <link rel="stylesheet" href="assets/styles.css" />
      </head>
      <body>
        ${content}
        <footer>
          <p>
            Happy coding!
            ♥
            <a href="https://internetfriendsforever.com" target="_blank" rel="noopener noreferrer">
              internetfriendsforever
            </a>
          </p>
          <p>
            Supported by funding from
            <a href="https://www.grafill.no/" target="_blank" rel="noopener noreferrer">
              Grafill
            </a>
          </p>
        </footer>
      </body>
    </html>
  `)
}