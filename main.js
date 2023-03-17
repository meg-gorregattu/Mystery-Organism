// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// FACTORY FUNCTION FOR P AEQUOR

const pAequorFactory = (specimenNum, dna) => {
  return { 
    specimenNum,
    dna,
    mutate() {
        let randDNABase = Math.floor(Math.random()*15);
        let newDNABase = returnRandBase();
        console.log(randDNABase);
        console.log(this.dna[randDNABase])
        console.log(newDNABase);
        while (this.dna[randDNABase] === newDNABase) {
          newDNABase = returnRandBase();
        }
        this.dna[randDNABase] = newDNABase;
        return this.dna;
  },
  compareDNA(obj) {
    const oneDna = this.dna;
    console.log(oneDna);
    const twoDna = obj.dna;
    console.log(twoDna);
    let count = 0; 
    for (let i = 0; i < oneDna.length; i ++) {
      for (let j = 0; j < twoDna.length; j++) {
        if ((oneDna[i] === twoDna[j]) && (i === j) ) {
          count++;
        }
      }
    }
    let percentSimilarDna = (count/15) * 100
    console.log(`Specimen ${this.specimenNum} and Specimen ${obj.specimenNum} have ${percentSimilarDna}% DNA in common.`);
  },
  willLikelySurvive() {
    let cgCount = 0;
    this.dna.forEach(base => {
      if ((base === 'C') || (base === 'G')) {
        cgCount++;
      }
    })
    return cgCount/15 >= .6;
  }
}
};

// Test Function

const one = pAequorFactory(1, mockUpStrand()); //Should return an object with two properties (specimenNum and dna)
const two = pAequorFactory(2, mockUpStrand());
one.compareDNA(two);//Should print a statement telling us the percentage of similar DNA between two specimens.
console.log(one.willLikelySurvive()); //Should print true if DNA array contains at least 60% C or G bases.
//---------------------------------------------------------------------------------------------------------------------


// SURVIVING SPECIMENS

const survivingSpecimens = [];
let idCounter = 1;


while (survivingSpecimens.length < 30) {
  let newSpec = pAequorFactory(idCounter, mockUpStrand());
  if (newSpec.willLikelySurvive()) {
    survivingSpecimens.push(newSpec);
  }
  idCounter++;
}

console.log(survivingSpecimens) // Should print out an array with 30 specimen objects, all with surviving DNA


