const ganache = require('ganache-cli');
const Web3 = require('web3');
const fs = require("fs");
const { abi, evm } = require('./compile');


async function deploy() {
    const provider = ganache.provider();
    provider.setMaxListeners(15);       // Suppress MaxListenersExceededWarning warning
    const web3 = new Web3(provider);
    this.accounts = await web3.eth.getAccounts();


     // console.log("D1", evm.bytecode.object)
    // console.log("D2", abi)



    // Read in the compiled contract code and fetch ABI description and the bytecode as objects
    // const compiled = JSON.parse(fs.readFileSync("output/contracts.json"));
    // const abi = compiled.contracts["ContractName.sol"]["ContractName"].abi;
    const bytecode = evm.bytecode.object;

    console.log("le abi", abi)
    console.log("bytecode", bytecode)
    console.log("conta 1", this.accounts[0])

    // Deploy the contract and send it gas to run.
    this.contract = await new web3.eth.Contract(abi)
        .deploy({data:'0x'+ bytecode, arguments: ['ola']})
        .send({from: this.accounts[0], gas:'5000000'});

    return this;
}

deploy().then(useContract);

function useContract(result) {
    // Use result.accounts and result.contract here to do what you like.
    console.log('Contract deployed to: ' + result.contract.options.address);
    console.log('Owner address is:     ' + result.accounts[0]);
}