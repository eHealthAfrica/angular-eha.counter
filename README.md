# angular-eha.counter

[![Build Status][travis-image]][travis-url]

> Counting directive

[travis-image]: https://img.shields.io/travis/eHealthAfrica/angular-eha.counter.svg
[travis-url]: https://travis-ci.org/eHealthAfrica/angular-eha.counter

A numeric counting input with increment/decrement buttons and on-change
callbacks. Check out the [demo][].

[demo]: http://docs.ehealthafrica.org/angular-eha.counter/

## Usage

Use the `bind` attribute to bind on the current count:

```html
<eha-counter
  bind="myCtrl.count"
></eha-counter>
```

## Options

### `template-url`

A custom template can be used with the `template-url` attribute:

```html
<eha-counter
  bind="myCtrl.count"
  template-url="/path/to/tpl.html"
></eha-counter>
```

Note, the default template assumes a mobile UI and depends on [Bootstrap][] and
[font-awesome][].

[bootstrap]: http://getbootstrap.com
[font-awesome]: http://fontawesome.io

### `onchange`

Evaluate the given expression when the user changes the input. Passed through
directly to [ng-change][] on the input field in the default template.

```html
<eha-counter
  bind="myCtrl.count"
  onchange="myCtrl.countChange()
></eha-counter>
```

[ng-change]: https://docs.angularjs.org/api/ng/directive/ngChange

### `ehaCounterProvider`

Exposes the `increment` and `decrement` callbacks (both `angular.noop` by
default), which are passed corresponding count on change. Can be overridden in
an `angular.config` block, for example:

```js
angular.module('myApp')
  .config(function (ehaCounterProvider) {
    ehaCounterProvider.increment = function (count) {
      console.log('The count is', count)
    }
  })
```

## Installation

Install with npm:

    npm install --save angular-eha.counter

Or alternatively bower:

    bower install --save angular-eha.counter

Then simply add `eha.counter` as a dependency somewhere in your project
that makes sense and you're good to go.

## Contributors

* © 2015 Jideobi Ofomah <jideobi.ofomah@ehealthnigeria.org>
* © 2015 Tom Vincent <tom.vincent@ehealthnigeria.org> (https://tlvince.com)

## License

Released under the [Apache 2.0 License][license].

[license]: http://www.apache.org/licenses/LICENSE-2.0.html
