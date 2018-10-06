export default function css (strings, ...keys) {
  function apply (css) {
    const className = getClassName(css)
    inject(className, css)
    return className
  }

  if (!keys.length) {
    return apply(strings.raw[0].trim())
  }

  return function (...args) {
    const lines = [strings[0]]

    keys.forEach((key, i) => {
      const value = key(...args)
      lines.push(value, strings[i + 1])
    })

    return apply(lines.join('').trim())
  }
}

function getClassName (css) {
  return `style-${hashCode(css)}`
}

function inject (className, css) {
  if (!document.getElementById(className)) {
    const element = document.createElement('style')
    element.id = className
    element.innerHTML = `.${className} {${css}}`
    document.head.appendChild(element)
  }
}

function hashCode (string) {
  var hash = 0, i, chr

  if (string.length === 0) {
    return hash
  }

  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }

  return hash
}
