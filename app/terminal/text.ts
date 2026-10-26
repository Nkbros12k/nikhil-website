export const kebab = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const commonPrefix = (words: string[]) => {
  if (words.length === 0) return "";
  return words.reduce((prefix, word) => {
    let i = 0;
    while (i < prefix.length && i < word.length && prefix[i] === word[i]) i++;
    return prefix.slice(0, i);
  });
};
