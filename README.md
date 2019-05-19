# Permutable
Tools for programming graphics

## Usage

The recommended way is using ECMAScript modules (esm):

```html
<script type='module'>
  import { mix, run } from 'https://unpkg.com/permutable?module'
</script>
```

## Examples

- [Basic](examples/basic/index.html)
- [Async](examples/async/index.html)
- [Custom size](examples/custom-size/index.html)
- [Mixer inline](examples/mixer-inline/index.html)
- [Mixer load](examples/mixer-load/index.html)
- [Timer](examples/timer/index.html)

## API

### run

Run a single program

```javascript
run(program)
```

### mix

Mix multiple programs

```javascript
mix([
  program1,
  program2
])
```

### program

A program is defined as a plain JavaScript object

```
{
  name: string,
  params: object,
  setup: function
}
```

Example:

```javascript
{
  name: 'circle',
  params: {
    stroke: {
      type: 'toggle',
      value: true
    }
  },
  setup: function (canvas) {
    const context = canvas.getContext('2d')

    return function render ({ stroke }) {
      if (stroke) {
        context.strokeRect(0, 0, 100, 100)
      } else {
        context.fillRect(0, 0, 100, 100)
      }
    }
  }
}
```

#### name (string)
A name for the program

#### params (object)
Parameters for the program. These are the types available:

##### number

```javascript
{
  type: 'number',
  value: 5,
  min: 0,
  max: 10,
  step: 1
}
```

##### timer

```javascript
{
  type: 'timer'
}
```

##### toggle

```javascript
{
  type: 'toggle',
  value: false
}
```

##### trigger

```javascript
{
  type: 'trigger'
}
```

#### setup (function)
A setup function will run once when the program is loaded. In it, the canvas element is being provided as a parameter. A render function is expected to be returned from the setup function. It will be called anytime the params changes.

Example with [2d context](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial):
```javascript
function setup (canvas) {
  const context = canvas.getContext('2d')

  return function render (values) {
    context.strokeRect(0, 0, 100, 100)
  }
}
```

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
