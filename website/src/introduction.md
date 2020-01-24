# Permutable

A framework for exploring and composing graphics in the browser. Written in JavaScript with zero dependencies.

permutable (pəˈmjuːtəb<sup>ə</sup>l) _adjective_ **able to be changed or exchanged**.

## What does it do?

**Permutable run** gives you a minimal user interface with controls for the parameters you set up in your program.

> We use `run` when we explore and develop single programs.

**Permutable mix** gives you an interface for composing and controlling multiple programs with a single output. 

> We use `mix` for composing and layering programs, and for performing live.

Permutable tries to get out of your way, shorten the feedback loop, and to let you explore and work with your ideas.


## when does it update?
Permutable only updates or redraws your graphic when a value changes, unless you tell it otherwise.

## What does it _not_ do?

Permutable does not have an opinion on what or how you draw. It does not have any built in functions for drawing [full circles](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc#Drawing_a_full_circle) or perfect squares.

You are free to draw using _either_ the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) which provides a means for drawing 2D graphics via JavaScript, or the [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) when you need to draw high-performance 3D and 2D graphics. Both APIs use the HTML `<canvas>` element.

Permutable is not designed for mobile, although it might be usable in some cases.

## How does it work?

At its core, Permutable provides you with the `run` function. The `run` function is wrapper that lets you set up Permutable parameters and provides you with a real time, live updated canvas.

When your program is run in standalone mode it provides the ‘run user interface’ which sets up interactive controls for your defined parameters.

You can map each parameter to a control on a MIDI interface.

> In short: you can build and run standalone Permutable graphics with an interface for controlling your parameters.

Further, Permutable provides a `mix` function. The `mix` function allows you to combine and mix multiple programs into a single output. You can mix several instances of the same or completely different programs together.

The ‘mix user interface’ lets you add instances of a predefined list of programs as channels in your mixer. There is no limit to the number of channels you can add.

Each added program will appear in the channels list. Each channel will have channel-specific controls set up by the mixer in addition to their own program-specific controls.

The mixer can also have its own set of global controls, which can be set up in a similar way to a standalone program.

Out of the box, the `mix` function comes with a parameter called ‘mix’ for each channel and a global parameter for adjusting the ‘brightness’.

## Resources

* [API reference](/api)
