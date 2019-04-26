import web3 from './web3';

const address = '0x0929c227A061e0033Ae3e774865Ec3db6c6E767E';

const abi = [
    {
        "constant":true,
        "inputs":[

        ],
        "name":"pegaJogadores",
        "outputs":[
            {
                "name":"",
                "type":"address[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[

        ],
        "name":"escolherGanhador",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"abc",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"gerente",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[

        ],
        "name":"enter",
        "outputs":[

        ],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "name":"jogadores",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
];

export default new web3.eth.Contract(abi, address);
