const SEPARATORS = [' ', '-', '/', '\\.']
const MAX_COUNT_BLOCKS = 12

export const getPhrases = (data: string) => {
  const newArray = data.split(new RegExp(SEPARATORS.join('|')))
  if (newArray.length !== MAX_COUNT_BLOCKS) {
    return {
      phrases: newArray.slice(0, 12),
      rawValue: data,
      error: 'Wrong number of phrases',
    }
  }
  if (newArray.filter((phrase) => !phrase)?.length) {
    return {
      phrases: newArray,
      rawValue: data,
      error: `Phrase is unvalid`,
    }
  }

  return {
    rawValue: data,
    phrases: newArray,
  }
}
