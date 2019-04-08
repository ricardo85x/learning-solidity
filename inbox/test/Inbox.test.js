const assert = require('assert');
const ganache = require('ganache-cli');
const  Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let inbox; 

beforeEach( async () => {

    // console.log("D1", evm.bytecode.object)
    // console.log("D2", abi)
    // Get a list of all accounts
    
    accounts =  await web3.eth.getAccounts()
    // use one of these accounts to deloy the ccontract

    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: '0x' + evm.bytecode.object, arguments: ['ola mundo']})
        .send({ from: accounts[0],   
            gas: 1500000,
            gasPrice: '30000000000000'
        })
        .on('error', (error) => { 
            console.log("Erro", error)
         })
        .on('transactionHash', (transactionHash) => { 
            console.log("Transacao", transactionHash)
         })
        .on('receipt', (receipt) => {
           console.log("receipt", receipt.contractAddress) // contains the new contract address
        })
        .on('confirmation', (confirmationNumber, receipt) => { 
            console.log("confirmacao", confirmationNumber)
        })
        // .end((newContractInstance) => {
        //     console.log("newContractInstance", newContractInstance.options.address) // instance with the new contract address
        // })

    console.log(inbox)

});

console.log("ma oia", inbox)

describe('Le Inbox', () => {
    it('deploy a contract', () => {

        console.log("D3")

            //console.log(accounts)
      //      console.log("abi", abi);
       //     console.log("bytecode", evm.bytecode.object)
      //      console.log('contrato: ', inbox)
    })
})