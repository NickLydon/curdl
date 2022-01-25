// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Trie from './trie';

const trie = new Promise<Trie>(async (resolve) => {
  while (true) {
    try {
      const p = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
      const dictionary = await p.text()
      const words = dictionary.split('\n').map(l => l.trim()).filter(l => l.length === 5);
      const trie = new Trie()
      for (const word of words) {
        trie.setWord(word)
      }
      resolve(trie)
      return
    }
    catch (error) {
      console.error(error)
    }
  }
})

export type PartialsResponse = {
  partials: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PartialsResponse>
) {
  const t = await trie;
  const partials: string[] = req.body.partials.flatMap((partial: string[]) => Array.from(t.matchingPartial(partial)))
  const dedupe: {[key: string]: boolean} = {}
  partials.forEach(p => dedupe[p] = true)

  res.status(200).json({ partials: Object.keys(dedupe) })
}
