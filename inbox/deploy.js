const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { abi, bytecode } = require("./compile");


const provider = new HDWalletProvider(
    'flame slam actor barely choice dash moon whale sign diesel solve barely',
    'http://127.0.0.1:8545'
    );

const web3 = new Web3(provider);

console.log(web3)