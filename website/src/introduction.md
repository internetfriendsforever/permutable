# Permutable

A framework for exploring and composing graphics in the browser. Written in JavaScript with zero dependencies – it is [open-source](https://github.com/internetfriendsforever/permutable) and weighs around \~32 kB uncompressed.

permutable (pəˈmjuːtəb<sup>ə</sup>l) _adjective_ **able to be changed or exchanged**.

<div id="example"></div>
<style>#example { background: #000; }</style>
<script type="module">
  import { run } from 'http://unpkg.com/permutable@{{VERSION}}?module'
  run({
    name: 'dots',
    params: {
      radius: { type: 'number', value: 3, max: 10 },
      count: { type: 'number', value: 120, min: 10, max: 500, step: 1 },
      turn: { type: 'number', value: 0.25 },
      scale: { type: 'number', value: 2, min: 0.2, max: 5 }
    },
    setup (canvas) {
      const context = canvas.getContext('2d')
      return function render ({ radius, count, turn, scale }) {
        context.fillStyle = 'black'
        context.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < count; i++) {
          const x = canvas.width / 2 + Math.sin(i * turn) * i * scale
          const y = canvas.height / 2 + Math.cos(i * turn) * i * scale
          context.fillStyle = 'white'
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }
      }
    }
  }, {
    container: document.getElementById('example')
  })
</script>

```html
<script type="module">
  import { run } from 'http://unpkg.com/permutable@{{VERSION}}?module'
  
  run({
    name: 'radial',
    
    params: {
      radius: { type: 'number', value: 3, max: 10 },
      count: { type: 'number', value: 120, min: 10, max: 500, step: 1 },
      turn: { type: 'number', value: 0.25 },
      scale: { type: 'number', value: 2, min: 0.2, max: 5 }
    },

    setup (canvas) {
      const context = canvas.getContext('2d')
      
      return function render ({ radius, count, turn, scale }) {
        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < count; i++) {
          const x = canvas.width / 2 + Math.sin(i * turn) * i * scale
          const y = canvas.height / 2 + Math.cos(i * turn) * i * scale

          context.fillStyle = 'white'
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }
      }
    }
  })
</script>
```

## What does it do?

Permutable has two different runtimes. Programs you write are compatible with both, so you can easily switch based on what mode you are in.

[run](/api#run) gives you a minimal user interface with controls for the parameters you set up in your program. This runtime is good for exploring and developing single programs.

[mix](/api#mix) gives you an interface for composing and controlling multiple programs with a single output. This runtime is good for composing and layering programs, and for performing live.

Permutable tries to get out of your way, shorten the feedback loop, and to let you explore and work with your ideas.

## What does it _not_ do?

Permutable does not have an opinion on what or how you draw. It does not have any built in functions for [drawing full circles](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc#Drawing_a_full_circle) or perfect squares.

You are free to draw using _either_ the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) which provides a means for drawing 2D graphics via JavaScript, or the [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) when you need to draw high-performance 3D and 2D graphics. Both APIs use the HTML `<canvas>` element.

Permutable is not designed for mobile, although it might be usable in some cases.

## Resources

* [API](/api)
