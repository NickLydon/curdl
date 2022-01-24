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

    *matchingPartial(partial: string[], match = ''): Iterable<string> {
        if (partial.length === 0) {
            if (this.isWord) yield match
            return
        }

        const head = partial[0]
        const children = head === ''
            ? this.data.map((trie, index) => ({ trie, index }))
            : [{ index: this.getIndex(head), trie: this.getChild(head) }]

        for (const child of children) {            
            if (child?.trie === undefined) continue
            yield* child.trie.matchingPartial(partial.slice(1), match + this.getChar(child.index))
        }
    }
}