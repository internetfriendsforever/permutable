# [Permutable](/) / API

* [Program](#program-object)
* [Parameter](#parameter-object)
  * [BPM](#type-bpm)
  * [Camera](#type-camera)
  * [Number](#type-number)
  * [Timer](#type-timer)
  * [Toggle](#type-toggle)
  * [Trigger](#type-trigger)
* [Run](#run-function)
* [Mix](#mix-function)

## Program `object`

A program is described by a plain object

| Attribute | Type | Description |
| --- | --- | --- |
| name | string | A name for your program |
| [params] | object | An object describing the parameters for the program. The _keys_ should be short descriptive names of the parameter, for example "radius". The _value_ should be an object describing the [parameter](#parameter) |
| setup | function | A setup function that will run once the program is loaded. In it, the canvas element is being provided as an argument. An update function can be returned from the setup function. It will be called anytime the params changes and has one argument – an object containing the values of all the parameters  |

Example:

```javascript
{
  name: 'Rectangle',
  params: {
    hue: {
      type: 'number',
      value: 50,
      max: 360
    },
    radius: {
      type: 'number',
      value: 0.5
    }
  },
  setup: function (canvas) {
    // This function is called once when the program loads

    return function update (values) {
      // This function is called whenever any of the parameter changes
      console.log(values) // { hue: 50, radius: 0.5 }
    }
  }
}
```

## Parameter `object`

A parameter is described by a plain object

| Attribute | Type | Description |
| --- | --- | --- |
| type | string | The parameter type |
| [...options] | mixed | Type-specific options |

### Type `'number'`

Ouput value type: `number`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | number | 0 | Initial value |
| [min] | number | 0 | Minimum value |
| [max] | number | 1 | Maximum value |
| [step] | number | 0.01 | Increments |

Example with inital value:

```javascript
{
  type: 'number',
  value: 0.5
}
```

Example with all options:

```javascript
{
  type: 'number',
  value: 20,
  min: 10,
  max: 70,
  step: 1
}
```

### Type `'toggle'`

A toggle works like a toggle switch. Ouput value type: `boolean`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| [active] | boolean | true | Initial state |

Example with initial deactivated state:

```javascript
{
  type: 'toggle',
  active: false
}
```

### Type `'trigger'`

A trigger is similar to a spring-loaded switch, it is only active when pressed down. Ouput value type: `boolean`

```javascript
{
  type: 'trigger'
}
```

### Type `'timer'`

A timer is updated continuously through [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Output value type: The time since the program started as a `number`

```javascript
{
  type: 'timer'
}
```

### Type `'bpm'`

A special parameter meant to set tempo (beats per minute). Output value type: BPM as a `number`

```javascript
{
  type: 'bpm'
}
```

### Type `'camera'`

Camera input from [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia). Output value type: An `<video />` element (can be used directly with [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) or as a texture image)

```javascript
{
  type: 'camera'
}
```

## run `function`

Gives you a minimal user interface with controls for the parameters you set up in your program.

| Parameter | Type | Description |
| --- | --- | --- |
| program | [program](#program) | Your program |
| [options] | object | Runtime options |

| Option | Type | Description |
| --- | --- | --- |
| [container] | element | Which container element to run in. Defaults to: `document.body` |
| [width] | number | Use a fixed width. If ommited it will use the width of the container |
| [height] | number | Use a fixed height. If ommited it will use the height of the container |
| [ratio] | number | Use a fixed pixel ratio. Defaults to: `window.devicePixelRatio` |

```javascript
run(program)
```

## mix `function`

Gives you an interface for composing and controlling _multiple_ programs with a single output.

| Parameter | Type | Description |
| --- | --- | --- |
| programs | Array of [program](#program) | Your programs |

```javascript
mix(programs)
```
