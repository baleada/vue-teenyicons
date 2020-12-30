export function toComponentCase (snakeCased) {
  return snakeCased
    .split('-')
    .map(word => capitalize(word))
    .join('')
}

function capitalize (word) {
  if (!word) {
    return word
  }
  
  return `${word[0].toUpperCase()}${word.slice(1)}`
}
