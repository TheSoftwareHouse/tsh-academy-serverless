export function findOccurrences(text: string, word: string) {
  return text.split(word).length - 1;
}

export async function calculateScore(text: string, words: string[]) {
  return words.reduce((score: number, word: string) => {
    const occurrences = findOccurrences(text.toLowerCase(), word);
    score += occurrences * 5;
    return score;
  }, 0);
}
