const permutations = function<T>(xs: T[]): (T[])[] {
    if (xs.length === 0) return [];
    if (xs.length === 1) return [xs];

    return new Array(xs.length).fill(0)
        .flatMap((_, currentIndex) => 
        permutations(xs.filter((_, i) => i !== currentIndex))
            .map(ys => [xs[currentIndex], ...ys])
        )
}
  
export const mergeCorrectAndIncorrectPositions = (correctPositions: {letter: string, index: number}[], incorrectPositions: string[]): string[][] => {
    const perms = permutations(incorrectPositions);
    return perms.map(p =>
        correctPositions.reduce((a, b) => [...a.slice(0, b.index), b.letter, ...a.slice(b.index)], p)
    )
}
  