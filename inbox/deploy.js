const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require("./compile");


// geth --rinkeby  --rpc 



const provider = new HDWalletProvider(
    'flame slam actor barely choice dash moon whale sign diesel solve barely',
    //'http://localhost:8546',
    'https://rinkeby.infura.io/v3/d60ab8d387f54bd2991addf1b0d2d18f'
);

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);

let  inbox;

var msg_inicial = "Ola mundo cruel"
const deploy = async () => {

    const accounts = await web3.eth.getAccounts()

    console.log('attempting to deploy from account', accounts[0])


    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: '0x' + evm.bytecode.object, arguments: [msg_inicial]})
        .send({ from: accounts[0],   
            // gas: '10000000',
            // gasPrice: web3.utils.toHex(20000000000),
            gasPrice: web3.utils.toHex(20000000000),
            gas: web3.utils.toHex(1000000)
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

    console.log("enviando o contrato!: ", inbox.options.address)

    return inbox;

};

deploy()
    .then(contrato => {
            provider.engine.stop()
            console.log("ehh TREEEETAAAAA!")
            console.log(contrato.options.address)
    });