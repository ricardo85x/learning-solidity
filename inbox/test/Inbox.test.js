const assert = require('assert');
const ganache = require('ganache-cli');
const  Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let inbox; 


// soh funciona com o web 1 beta 48
//  npm install web3@1.0.0-beta.48


const msg_inicial = "Ola mundo"
beforeEach( async () => {

    // console.log("D1", evm.bytecode.object)
    // console.log("D2", abi)
    // Get a list of all accounts
    
    accounts =  await web3.eth.getAccounts()
    // use one of these accounts to deloy the ccontract

    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: '0x' + evm.bytecode.object, arguments: [msg_inicial]})
        .send({ from: accounts[0],   
            gas: 1500000       
        })


});

describe('Le Inbox', () => {
    it('deploy a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
         const message = await inbox.methods.message().call()
        assert.equal(message, msg_inicial)
         console.log(message)
    });

    it('can change the message', async () => {
        
        const nova_msg = "vai kgar"
        await inbox.methods.setMessage(nova_msg).send({
            from: accounts[0],
            gas: 1000000,
            gasPrice: 20000
        })

        const message = await inbox.methods.message().call();

        assert.equal(message, nova_msg)

    })


})