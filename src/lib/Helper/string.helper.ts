export const removeSpecialCharacters = (word: string) => {
  return word.replace( /^[a-zA-Z0-9_-]/gi, '');
} 