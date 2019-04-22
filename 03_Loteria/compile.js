const path = require('path');
const fs = require('fs');
const solc = require('solc');


const loteriaPath = path.resolve(__dirname, 'contracts', 'Loteria.sol');
const source = fs.readFileSync(loteriaPath, 'utf8');


//abi eh o novo interface

var json_compile = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Loteria': {
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
const bytecode = contrato.contracts.Loteria.Loteria.evm.bytecode.object

const abi = contrato.contracts.Loteria.Loteria.abi

module.exports = contrato.contracts.Loteria





//module.exports = bytecode
//module.exports = abi
//module.exports = rawcontract

//console.log(contrato.contracts.Inbox.Inbox.abi);

// console.log(rawcontract)