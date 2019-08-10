const contractions = [
  { word: 'I’m', simplified: 'im', isReplaceable: true },
  { word: 'you’re', simplified: 'youre', isReplaceable: true },
  { word: 'we’re', simplified: 'were', isReplaceable: false },
  { word: 'they’re', simplified: 'theyre', isReplaceable: true },
  { word: 'who’re', simplified: 'whore', isReplaceable: false },
  { word: 'I’ve', simplified: 'ive', isReplaceable: false },
  { word: 'we’ve', simplified: 'weve', isReplaceable: true },
  { word: 'they’ve', simplified: 'theyve', isReplaceable: true },
  { word: 'could’ve', simplified: 'couldve', isReplaceable: true },
  { word: 'would’ve', simplified: 'wouldve', isReplaceable: true },
  { word: 'should’ve', simplified: 'shouldve', isReplaceable: true },
  { word: 'might’ve', simplified: 'mightve', isReplaceable: true },
  { word: 'who’ve', simplified: 'whove', isReplaceable: true },
  { word: 'there’ve', simplified: 'thereve', isReplaceable: true },
  { word: 'he’s', simplified: 'hes', isReplaceable: true },
  { word: 'she’s', simplified: 'shes', isReplaceable: true },
  { word: 'it’s', simplified: 'its', isReplaceable: false },
  { word: 'what’s', simplified: 'whats', isReplaceable: true },
  { word: 'that’s', simplified: 'thats', isReplaceable: true },
  { word: 'who’s', simplified: 'whos', isReplaceable: true },
  { word: 'there’s', simplified: 'theres', isReplaceable: true },
  { word: 'here’s', simplified: 'heres', isReplaceable: true },
  { word: 'one’s', simplified: 'ones', isReplaceable: false },
  { word: 'I’ll', simplified: 'ill', isReplaceable: false },
  { word: 'you’ll', simplified: 'youll', isReplaceable: true },
  { word: 'she’ll', simplified: 'shell', isReplaceable: false },
  { word: 'he’ll', simplified: 'hell', isReplaceable: false },
  { word: 'it’ll', simplified: 'itll', isReplaceable: true },
  { word: 'we’ll', simplified: 'well', isReplaceable: false },
  { word: 'they’ll', simplified: 'theyll', isReplaceable: true },
  { word: 'that’ll', simplified: 'thatll', isReplaceable: true },
  { word: 'there’ll', simplified: 'therell', isReplaceable: true },
  { word: 'this’ll', simplified: 'thisll', isReplaceable: true },
  { word: 'what’ll', simplified: 'whatll', isReplaceable: true },
  { word: 'who’ll', simplified: 'wholl', isReplaceable: true },
  { word: 'I’d', simplified: 'id', isReplaceable: false },
  { word: 'you’d', simplified: 'youd', isReplaceable: true },
  { word: 'he’d', simplified: 'hed', isReplaceable: true },
  { word: 'she’d', simplified: 'shed', isReplaceable: false },
  { word: 'we’d', simplified: 'wed', isReplaceable: false },
  { word: 'they’d', simplified: 'theyd', isReplaceable: true },
  { word: 'it’d', simplified: 'itd', isReplaceable: true },
  { word: 'there’d', simplified: 'thered', isReplaceable: true },
  { word: 'what’d', simplified: 'whatd', isReplaceable: true },
  { word: 'who’d', simplified: 'whod', isReplaceable: true },
  { word: 'that’d', simplified: 'thatd', isReplaceable: true },
  { word: 'let’s', simplified: 'lets', isReplaceable: true },
  { word: 'can’t', simplified: 'cant', isReplaceable: true },
  { word: 'don’t', simplified: 'dont', isReplaceable: true },
  { word: 'isn’t', simplified: 'isnt', isReplaceable: true },
  { word: 'won’t', simplified: 'wont', isReplaceable: true },
  { word: 'shouldn’t', simplified: 'shouldnt', isReplaceable: true },
  { word: 'couldn’t', simplified: 'couldnt', isReplaceable: true },
  { word: 'wouldn’t', simplified: 'wouldnt', isReplaceable: true },
  { word: 'aren’t', simplified: 'arent', isReplaceable: true },
  { word: 'doesn’t', simplified: 'doesnt', isReplaceable: true },
  { word: 'wasn’t', simplified: 'wasnt', isReplaceable: true },
  { word: 'weren’t', simplified: 'werent', isReplaceable: true },
  { word: 'hasn’t', simplified: 'hasnt', isReplaceable: true },
  { word: 'haven’t', simplified: 'havent', isReplaceable: true },
  { word: 'hadn’t', simplified: 'hadnt', isReplaceable: true },
  { word: 'mustn’t', simplified: 'mustnt', isReplaceable: true },
  { word: 'didn’t', simplified: 'didnt', isReplaceable: true },
  { word: 'mightn’t', simplified: 'mightnt', isReplaceable: true },
  { word: 'needn’t', simplified: 'neednt', isReplaceable: true }
]

const humanizeContractions = (phrase, options) => {
  const DEFAULTS = { brutalMode: false, exclude: [], include: [] }
  const OPTIONS = { ...DEFAULTS, ...options }
  if (!phrase) return

  const output = phrase
    .split(' ')
    .map(word => {
      const findWord = words => words.find(item => item === word)
      const shouldBeExcluded = Boolean(findWord(OPTIONS.exclude))
      const shouldBeForceIncluded = Boolean(findWord(OPTIONS.include))

      if (shouldBeExcluded) return word

      // Try to find the word from the list of contraction.
      const contraction = contractions.find(({ isReplaceable, simplified }) => {
        const shouldReplace =
          OPTIONS.brutalMode || shouldBeForceIncluded
            ? true
            : isReplaceable || shouldBeForceIncluded

        return new RegExp(word, 'i').test(simplified) && shouldReplace
      })

      if (!contraction) return word

      const regex = new RegExp('\\b' + contraction.simplified + '\\b', 'gi')

      return word.replace(regex, contraction.word)
    })
    .filter(Boolean)
    .join(' ')

  return output
}

module.exports = humanizeContractions
module.exports.contraction = contractions
