import {mergeCorrectAndIncorrectPositions} from './permutations'

describe('permutations', () => {
    it('merges correct and incorrect positions', () => {
        expect(
            mergeCorrectAndIncorrectPositions(
                [{ letter: 'd', index: 1 }],
                ['a', 'b', 'c'])
        ).toStrictEqual(
            [
                ['a','d','b','c'],
                ['a','d','c','b'],
                ['b','d','a','c'],
                ['b','d','c','a'],
                ['c','d','a','b'],
                ['c','d','b','a'],
            ]
        )
    });

    it('merges 1 correct and 1 incorrect position', () => {
        expect(
            mergeCorrectAndIncorrectPositions(
                [{ letter: 'd', index: 1 }],
                ['a'])
        ).toStrictEqual(
            [
                ['a','d'],
            ]
        )
    });
    
    it('returns empty if incorrect positions empty', () => {
        expect(
            mergeCorrectAndIncorrectPositions(
                [{ letter: 'd', index: 1 }],
                [])
        ).toStrictEqual([])
    });
});