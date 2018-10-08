import { hydrate } from 'react-dom'
import router from '@cyberspace/router'
import routes from './routes'

router.listen((path, navigate) => {
  const { key, params } = (router.resolve(routes, path) || {})
  const route = key ? routes[key]({ params }) : routes['NotFound']()

  document.title = route.title

  hydrate(route.component, document.getElementById('root'))
})

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
