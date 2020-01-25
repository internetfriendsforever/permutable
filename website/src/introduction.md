# Permutable

A framework for exploring and composing graphics in the browser. Written in JavaScript with zero dependencies – it is [open-source](https://github.com/internetfriendsforever/permutable) and weighs around \~32 kB uncompressed.

permutable (pəˈmjuːtəb<sup>ə</sup>l) _adjective_ **able to be changed or exchanged**.

## What does it do?

Permutable has two different runtimes:

[run](/api#run) gives you a minimal user interface with controls for the parameters you set up in your program. This runtime is good for exploring and developing single programs.

[mix](/api#mix) gives you an interface for composing and controlling multiple programs with a single output. This runtime is good for composing and layering programs, and for performing live.

Programs you write are compatible with both runtimes, so you can easily switch based on what mode you are in.

Permutable tries to get out of your way, shorten the feedback loop, and to let you explore and work with your ideas.

## What does it _not_ do?

Permutable does not have an opinion on what or how you draw. It does not have any built in functions for drawing full circles or perfect squares.

You are free to draw using _either_ the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) which provides a means for drawing 2D graphics via JavaScript, or the [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) when you need to draw high-performance 3D and 2D graphics. Both APIs use the HTML `<canvas>` element.

Permutable is not designed for mobile, although it might be usable in some cases.

## Resources

* Getting started
* [API](/api)
