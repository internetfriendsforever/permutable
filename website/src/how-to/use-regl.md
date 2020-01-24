Example using [regl](http://regl.party):
```javascript
function setup (canvas) {
  const regl = createREGL({ canvas })

  return function render (values) {
    regl.poll()
    regl.clear({
      color: [1, 0, 0, 1]
    })
  }
}
```
