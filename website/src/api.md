# [Permutable](/) / API

# Functions

## run

Gives you a minimal user interface with controls for the parameters you set up in your program.

| Parameter | Type | Description |
| --- | --- | --- |
| program | [program](#program) | Your program |

```javascript
run(program)
```


## mix

Gives you an interface for composing and controlling _multiple_ programs with a single output.

| Parameter | Type | Description |
| --- | --- | --- |
| programs | Array of [program](#program) | Your programs |

```javascript
mix(programs)
```

# Type definitions

## Program

A program is described by a plain `object` with the shape:

| Attribute | Type | Description |
| --- | --- | --- |
| name | string | A name for your program. |
| [params] | object | An object describing the parameters for the program. The _keys_ should be short descriptive names of the parameter, for example "radius". The _value_ should be an object describing the [parameter](#parameter). |
| setup | function | A setup function that will run once the program is loaded. In it, the canvas element is being provided as an argument. An update function can be returned from the setup function. It will be called anytime the params changes and has one argument – an object containing the values of all the parameters.  |

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

## Parameter

A parameter is described by a plain `object` with the shape:

| Attribute | Type | Description |
| --- | --- | --- |
| type | string | The parameter type. See [list of parameter types](#list-of-parameter-types). |
| [...options] | mixed | Type-specific options. See [list of parameter types](#list-of-parameter-types). |

### List of parameter types

#### Type `'number'`

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

#### Type `'toggle'`

A toggle works like a toggle switch.

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

#### Type `'trigger'`

A trigger is similar to a spring-loaded switch, it is only active when pressed down.

```javascript
{
  type: 'trigger'
}
```

#### Type `'timer'`

A timer is updated continuously through [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). The value is the time since the program started

```javascript
{
  type: 'timer'
}
```

#### Type `'bpm'`

A special parameter meant to set tempo (beats per minute)

```javascript
{
  type: 'bpm'
}
```