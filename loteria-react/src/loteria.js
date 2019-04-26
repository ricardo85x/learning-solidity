import web3 from './web3';

const address = '0x0929c227A061e0033Ae3e774865Ec3db6c6E767E';

const abi = [

    {
        constant:true,
        inputs:[],
        name:'pegaJogadores',
        outputs:[
            [
                Object
            ]
        ],
        payable:false,
        stateMutability:'view',
        type:'function',
        funcName:'pegaJogadores()',
        signature:'0x4ef295d8'
    },
    {
        constant:false,
        inputs:[

        ],
        name:'escolherGanhador',
        outputs:[

        ],
        payable:false,
        stateMutability:'nonpayable',
        type:'function',
        funcName:'escolherGanhador()',
        signature:'0x66694f0e'
    },
    {
        constant:true,
        inputs:[

        ],
        name:'abc',
        outputs:[

        ],
        payable:false,
        stateMutability:'view',
        type:'function',
        funcName:'abc()',
        signature:'0x92277933'
    },
    {
        constant:true,
        inputs:[

        ],
        name:'gerente',
        outputs:[
            [
                Object
            ]
        ],
        payable:false,
        stateMutability:'view',
        type:'function',
        funcName:'gerente()',
        signature:'0x9e18d087'
    },
    {
        constant:false,
        inputs:[

        ],
        name:'enter',
        outputs:[

        ],
        payable:true,
        stateMutability:'payable',
        type:'function',
        funcName:'enter()',
        signature:'0xe97dcb62'
    },
    {
        constant:true,
        inputs:[
            [
                Object
            ]
        ],
        name:'jogadores',
        outputs:[
            [
                Object
            ]
        ],
        payable:false,
        stateMutability:'view',
        type:'function',
        funcName:'jogadores(uint256)',
        signature:'0xfdcd0731'
    },
    {
        inputs:[

        ],
        payable:false,
        stateMutability:'nonpayable',
        type:'constructor',
        constant:undefined,
        signature:'constructor'
    }
];

export default new web3.eth.Contract(abi, address);
