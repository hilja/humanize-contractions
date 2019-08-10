const humanizeContractions = require('./')

const phrase = 'im not sure if shell be here ill say a lot of you arent okay'

test('If no params, return undefined', () => {
  expect(humanizeContractions()).toBeUndefined()
})

test('Should the string as if if no contractions found', () => {
  const expected = humanizeContractions('this banana is succulent')
  const actual = 'this banana is succulent'

  expect(actual).toBe(expected)
})

test('Should replace mangled contractions', () => {
  const expected = humanizeContractions(phrase)
  const actual =
    'I’m not sure if shell be here ill say a lot of you aren’t okay'

  expect(actual).toBe(expected)
})

test('Should brutally replace words that have other meaning', () => {
  const expected = humanizeContractions(phrase, { brutalMode: true })
  const actual =
    'I’m not sure if she’ll be here I’ll say a lot of you aren’t okay'

  expect(actual).toBe(expected)
})

test('Should not process the abbreviations in the exclude array', () => {
  const expected = humanizeContractions(phrase, {
    brutalMode: true,
    exclude: ['im']
  })
  const actual =
    'im not sure if she’ll be here I’ll say a lot of you aren’t okay'

  expect(actual).toBe(expected)
})

test('Should process the words on the include list', () => {
  const expected = humanizeContractions('shed be happy nonetheless', {
    include: ['shed']
  })
  const actual = 'she’d be happy nonetheless'

  expect(actual).toBe(expected)
})

test('Should be able to combine include and exclude', () => {
  const expected = humanizeContractions('the race at im was great id say', {
    // IM referring to Isle of Man in this case.
    exclude: ['im'],
    include: ['id']
  })
  const actual = 'the race at im was great I’d say'

  expect(actual).toBe(expected)
})

test('Should exclude words when brutalMode is on', () => {
  const expected = humanizeContractions(
    'shell be doing some work in the shed',
    {
      brutalMode: true,
      exclude: ['shed']
    }
  )
  const actual = 'she’ll be doing some work in the shed'

  expect(actual).toBe(expected)
})
