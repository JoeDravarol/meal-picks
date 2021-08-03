export const truncateString = (str, limit = 165) => {
  const strWithSpaceRemoved = str.replace(/ /g, '');

  if (strWithSpaceRemoved.length < limit) return str;

  let newStr = [];

  str.split(' ').reduce((totalLength, curWord) => {
    if (totalLength + curWord.length <= limit) {
      newStr = newStr.concat(curWord);
    }
    return totalLength + curWord.length;
  }, 0);

  return `${newStr.join(' ')} ...`;
};
