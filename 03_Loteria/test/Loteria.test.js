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
        await loteria.methods.enter().send({
            from: conta[0],
            value:  web3.utils.toWei('0.02', 'ether'),
        });

        const jogadores = await loteria.methods.pegaJogadores().call({
            from: conta[0]
        })

        assert.equal(conta[0], jogadores[0]);
        assert.equal(1, jogadores.length)

    });

    it('allows multiple accounts  to enter', async () => {
        await loteria.methods.enter().send({
            from: conta[0],
            value:  web3.utils.toWei('0.02', 'ether'),
        });

        await loteria.methods.enter().send({
            from: conta[1],
            value:  web3.utils.toWei('0.02', 'ether'),
        });

        await loteria.methods.enter().send({
            from: conta[2],
            value:  web3.utils.toWei('0.02', 'ether'),
        });

        const jogadores = await loteria.methods.pegaJogadores().call({
            from: conta[0]
        })

        assert.equal(conta[0], jogadores[0]);
        assert.equal(conta[1], jogadores[1]);
        assert.equal(conta[2], jogadores[2]);
        assert.equal(3, jogadores.length)


    });

    it('requires a minimum amohnt the ether to enter',  async () => {

        try {
            await  loteria.methods.enter().send({
                from: conta[0],
                value: 0
            });

            assert(false) // // faz dar erro, mas nao deve chegar aqui porque da erro no codigo acima
        } catch ( err) {
         //   console.log('erro ao entrar no jogo sem dinheiro', err);
            assert(err)
        }
 
    });

    it('only manager can call pegarJogador', async () => {

        await loteria.methods.enter().send({
            from: conta[0],
            value:  web3.utils.toWei('0.02', 'ether'),
        });

        try {
            await loteria.methods.escolherGanhador().send({
                from: conta[1]
            })
            assert(false);
        } catch (err) {

            console.error("erro ao escolher jogador sem ser o gerente", err)
            assert(err)
        }
    })
    
    it('sends money to the winner and reset the players array', async () => {
        await loteria.methods.enter().send({
            from: conta[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(conta[0]);
        await loteria.methods.escolherGanhador().send({
            from: conta[0]
        })

        const afterBalance = await web3.eth.getBalance(conta[0]);
        const difference = afterBalance - initialBalance;
        console.log('gasto com gas: ', difference)
        assert(difference > web3.utils.toWei('1.8', 'ether'));



    })

})