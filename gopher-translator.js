module.exports.translateEnglishToGopher = (word) => {
  if (word.match(/^[aeiou]/)) {
    return 'g' + word;
  } else if (word.match(/^xr/)) {
    return 'ge' + word;
  } else if (word.match(/^[b-df-hj-np-tv-z]+qu/)) {
    const wordPrefix = word.match(/^[b-df-hj-np-tv-z]+qu/)[0];

    return word.replace(wordPrefix, '') + wordPrefix + 'ogo';
  } else if (word.match(/^[b-df-hj-np-tv-z]+/)) {
    const consonantPrefix = word.match(/^[b-df-hj-np-tv-z]+/)[0];

    return word.replace(consonantPrefix, '') + consonantPrefix + 'ogo';
  }
}
