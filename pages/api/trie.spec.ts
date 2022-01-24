import Trie from "./trie"

describe(Trie.name, () => {
    const trie = new Trie()
    const words = ['map', 'app', 'cap']
    beforeEach(() => {
        words.forEach(w => trie.setWord(w))
    })
    
    describe('contains', () => {
        words.forEach(w => {
            it(`should contain word '${w}''`, () => {
                expect(trie.contains(w)).toBeTruthy()
            });
        });

        ['', 'orange', 'pineapple'].forEach(w => {
            it(`should not contain word '${w}''`, () => {
                expect(trie.contains(w)).toBeFalsy()
            }); 
        });
    });

    describe('partialMatches', () => {

        [
            {input: ['m', 'a', ''], expected: ['map']},
            {input: ['m', '', 'p'], expected: ['map']},
            {input: ['', 'a', 'p'], expected: ['cap', 'map']},
            {input: ['', 'a', ''], expected: ['cap', 'map']},
            {input: ['', 'p', 'p'], expected: ['app']},
            {input: ['', '', ''], expected: ['app', 'cap', 'map']},
        ].forEach(w => {
            it(`finds partial matches for [${w.input}]`, () => {
                expect(Array.from(trie.matchingPartial(w.input))).toStrictEqual(w.expected)
            });
        });
    })
});