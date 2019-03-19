# Permutable
Tools for programming graphics

## Usage

The recommended way is using ECMAScript modules (esm):

```html
<script type='module'>
  import { run, mix } from 'https://unpkg.com/permutable?module'
</script>
```

See full [examples](examples)

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
      type: 'boolean',
      value: true
    }
  },
  setup: function (canvas) {
    const context = canvas.getContext('2d')

    return function render (params) {
      if (params.stroke.value) {
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

##### boolean

```javascript
{
  type: 'boolean',
  value: false
}
```

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

#### setup (function)
A setup function for the program. The canvas is given as an argument. Expects a render function to be returned.

Example with 2d context:
```javascript
function setup (canvas) {
  const context = canvas.getContext('2d')
  
  return function render (params) {
    context.strokeRect(0, 0, 100, 100)
  }
}
```

Example with regl:
```javascript
function setup (canvas) {
  const regl = createREGL({ canvas })
  
  return function render (params) {
    regl.poll()
    regl.clear({
      color: [1, 0, 0, 1]
    })
  }
}
```
