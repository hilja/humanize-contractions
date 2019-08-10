# Revive contractions

The point of this package is, that it tries to revive English language contractions after they have been destroyed by dehumanizing process like camel-casing, kebab-casing, lower-casing, snakes-casing, or such. It's not an exact science and you can’t ever get 100% results, but maybe 80% results, on a good day.

## How it works

It’s just a simple replace basically, no dark arts of any sort. It works on an array of objects like this:

```js
const contractions = [
  { word: 'I’m', simplified: 'im', isReplaceable: true },
  { word: 'she’ll', simplified: 'shell', isReplaceable: false },
  ...
}
```

Some words are replaceable, some are not, because they have another meaning, like "shell" for example. And that’s the crux of this operation: _it’s imperfect in its core_. But it provides tremendous helps in the process of reverse engineering a destroyed string.

## Examples

Simple example:

```js
const humanized = humanizeContractions('im having a bad day')
// I'm having a bad day
```

It doesn't replace words that have a meaning:

```js
const humanized = humanizeContractions('shed be mad')
// shed be mad
```

Unless you know your data-set and enable the `brutalMode`:

```js
const humanized = humanizeContractions('shed be mad', { brutalMode: true })
// she’d be mad
```

If the `brutalMode` is too brutal, individual words can be included, maybe the contraction "she’d" appears a lot in a given data-set and the word "shed" never:

```js
const humanized = humanizeContractions('shed be mad', { include: ['shed'] })
// she’d be mad
```

If you have special data-set with replicable words that have a meaning, you can exclude them:

```js
const humanized = humanizeContractions('the race at im was great', {
  // IM referring to Isle of Man in this case.
  exclude: ['im']
})
// the race at im was great
```

Or you can tweak it more by combining includes and excludes to suit your data:

```js
const humanized = humanizeContractions('the race at im was great id say', {
  // IM referring to Isle of Man in this case.
  exclude: ['im'],
  include: ['id']
})
// the race at im was great I’d say
```

Words can be excluded when in `brutalMode`:

```js
const expected = humanizeContractions('shell be doing some work in the shed', {
  brutalMode: true,
  exclude: ['shed']
})
// she’ll be doing some work in the shed
```

## Access the list of contractions

The module exports it:

```js
import { contractions } from 'humanize-contractions'
```

## About humanizing the string

This package expects phrases where words are separated by spaces, so you have to humanize the string you feed it, if it happens to be, for example, camel-cased:

```js
import humanize from 'humanize-string'

const input = 'im-having-a-bad-day'

const humanized = humanizeContractions(input)
// I'm having a bad day
```

Some humanize package available in npm:

- [humanize-sting](https://www.npmjs.com/package/humanize-string)
- [string-humanize](https://www.npmjs.com/package/string-humanize)

## API

### humanizeContractions(phrase[, options])

Returns the humanized string.

#### phrase

Type: `string`

Words separated by spaces.

#### options?

**options.brutalMode**

Type: `boolean`

Should it obey the `isReplaceable` hint.

**options.exclude**

Type: `array`

Replaceable words to exclude.

**options.include**

Type: `array`

Irreplaceable words to include.

### humanizeContractions.contractions

Type: `array`

List of the contractions.
