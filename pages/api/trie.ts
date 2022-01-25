export default class Trie {
    constructor(
        private isWord: boolean = false,
        private readonly data: Trie[] = [],
    ) {
    }

    private getIndex(char: string) {
        return char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)
    }

    private getChar(index: number) {
        return String.fromCharCode(index + 'a'.charCodeAt(0))
    }

    getChild(char: string): Trie | undefined {
        return this.data[this.getIndex(char)]
    }

    contains(word: string): boolean {
        if (word === '') return this.isWord;
        const head = word[0]
        const child = this.getChild(head)
        if (!child) return false;
        return child.contains(word.substring(1));
    }

    setWord(word: string) {
        if (word === '') {
            this.isWord = true
            return
        }
        const head = word[0]
        const child = this.getChild(head) || new Trie()
        this.data[this.getIndex(head)] = child
        child.setWord(word.substring(1))
    }

    *matchingPartial(partial: {letter: string, inPosition: boolean}[], index = 0, match = ''): Iterable<string> {
        if (index >= partial.length) {
            if (this.isWord && partial.every(({letter}) => match.includes(letter))) yield match
            return
        }

        const {letter, inPosition} = partial[index]
        const children = letter === '' || !inPosition
            ? this.data.map((trie, index) => ({ trie, index }))
            : [{ index: this.getIndex(letter), trie: this.getChild(letter) }]

        for (const child of children) {            
            if (child?.trie === undefined) continue
            yield* child.trie.matchingPartial(partial, index + 1, match + this.getChar(child.index))
        }
    }
}