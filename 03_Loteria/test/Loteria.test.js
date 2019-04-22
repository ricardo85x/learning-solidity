const assert = require('assert');
const ganache= require('ganache-cli');
const Web3 = require('web3')

let provider_ganache;

const  loteria_xpto = require('../compile');

let loteria;
let conta;

//console.log("IBA 2", loteria_xpto)



const bytecode = loteria_xpto.Loteria.evm.bytecode.object;
const abi = loteria_xpto.Loteria.abi;




const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};

provider_ganache = ganache.provider()

const web3 = new Web3(provider_ganache, null, OPTIONS);

const deploy_send = async () => {



    conta = await web3.eth.getAccounts()

    loteria= await new web3.eth.Contract(abi)
    .deploy( { data:  '0x' + bytecode})
    .send( { from: conta[0], gas: '1000000' })
    .on('error', (error) => { 
        console.log("Erro", error)
     })

    // .on('transactionHash', (transactionHash) => { 
    //     console.log("Transacao", transactionHash)
    //  })
    // .on('receipt', (receipt) => {
    //    console.log("receipt", receipt.contractAddress) // contains the new contract address
    // })
    // .on('confirmation', (confirmationNumber, receipt) => { 
    //     console.log("confirmacao", confirmationNumber)
    // })

    return loteria;

}

beforeEach( async () => {
    const enviando_contrato = await  deploy_send()
    .then(contrato => {

        //provider_ganache.engine.stop()
    //    console.log("endereco do contrato: ", contrato.options.address )

    });

})

describe('Contrato da Loteria', () => {
    it('deploy a contract', () => {
        assert.ok(loteria.options.address)
    })
    
    it('allows one account to enter', async () => {

   //      console.log("endereco", loteria.methods)
  await loteria.methods.enter().send({
    //await loteria.enter().send({
        from: conta[0],
            value:  web3.utils.toWei('0.02', 'ether'),
        });

        const jogadores = await loteria.methods.pegaJogadores().call({
            from: conta[0]
        })

        assert.equal(conta[0], jogadores[0]);

        assert.equal(1, jogadores.length)


    })
    

})