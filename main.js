const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
    }

    calcHash()
    {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class chain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        return new Block(0, "21/09/2019", "Genesis Block", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }
}

let abby = new chain();
abby.addBlock(new Block(1, "06/02/2000", {Hobby: "Travelling"}));
abby.addBlock(new Block(2, "08/03/2007",{Hobby: "Drawing"}));
abby.addBlock(new Block(3, "30/08/1994",{Hobby: "Dressup"}));
abby.addBlock(new Block(4, "04/11/1992",{Hobby: "Singing"}));

console.log(JSON.stringify(abby, null, 16));