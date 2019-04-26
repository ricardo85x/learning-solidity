import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider);

let web3;

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};


const loadWeb3 =  async loadWeb3 => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum, null, OPTIONS);
        try {
            await window.ethereum.enable();
            //var accounts=
            await web3.eth.getAccounts();

        } catch (error) {
            console.log('usuairo nao esta coperando', error)
        }
    }
    // Legacy dapp browsers... blalbla
    else if (window.web3) {
        console.log("morre diabo 2")
        web3 = new Web3(window.web3.currentProvider, null, OPTIONS);

        try {
            await window.web3.currentProvider.enable();

            //var accounts=
            await web3.eth.getAccounts();

         //   console.log("conta 0", accounts)


        } catch( error) {
            console.log("tha hell? ", error)
        }



    }
    // Non-dapp browsers... blablabla
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

loadWeb3()
    .then( () =>  {
        console.log("acabouuuu", web3);
    });


export default web3;

