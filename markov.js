/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map()
    
    for (let i = 0; i < words.length; i++) {
      let firstWord = this.words[i]
      let secondWord = this.words[i + 1] || null

      if (chains.has(firstWord)) chains.get(firstWord).push(secondWord)
      else chains.set(firstWord, [secondWord])
    }
    this.chains = chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
     // pick a random key to begin
     let keys = Array.from(this.chains.keys());
     let key = MarkovMachine.choice(keys);
     let out = [];
 
     // produce markov chain until reaching termination word
     while (out.length < numWords && key !== null) {
       out.push(key);
       key = MarkovMachine.choice(this.chains.get(key));
     }
 
     return out.join(" ");
   }
  }
}
