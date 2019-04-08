const path = require('path');
const fs = require('fs');
const solc = require('solc');


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');


//abi eh o novo interface

var json_compile = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Inbox': {
        content: source,
      },
    },
    settings: { 
        outputSelection: {
            '*': {
                '*': [ '*' ]
            },
        },
    },
  })



//  module.exports = 
 
const rawcontract = solc.compile(json_compile);
const contrato = JSON.parse(rawcontract);
const bytecode = contrato.contracts.Inbox.Inbox.evm.bytecode.object
const abi = contrato.contracts.Inbox.Inbox.abi

module.exports = contrato.contracts.Inbox.Inbox
//module.exports = bytecode
//module.exports = abi
//module.exports = rawcontract

//console.log(contrato.contracts.Inbox.Inbox.abi);

// console.log(rawcontract)