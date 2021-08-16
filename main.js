import SHA256 from 'crypto-js';

class Block{
    constructor(index, timestamp, data, previousHash = ' '){
        //index >> where the block stands on the chain
        this.index = index;
        //time stamp>> when it was created
        this.timestamp = timestamp;
        //data >> like details>> money transferred
        this.data = data;
        //string that contains hash of the block before this one..insures the integrity of the blockchain 
        this.previousHash = previousHash;

        //hash of OUR block
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    } 
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block(0, '08/09/2021','Genesis block', "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];

    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let coin = new Blockchain();
coin.addBlock(new Block(1,"08/09/2021", { amount: 5}));
coin.addBlock(new Block(2,"10/09/2021", { amount: 10}));


console.log(JSON.stringify(coin, null, 4));