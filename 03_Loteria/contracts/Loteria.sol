pragma solidity ^0.5;

contract Loteria {
    
    address public gerente;
    
    address payable[] public jogadores;
    
    constructor () public {
        gerente = msg.sender;
        
    }
    
    function enter() public payable {
        require(msg.value > .0001 ether);
        jogadores.push(msg.sender);
    }
    
    
    function random() private view returns (uint ) {
        
        return uint( keccak256(abi.encodePacked(  block.difficulty, now, jogadores))  );
    }
    
    
    function escolherGanhador() public apenasGerente  {
        // require(jogadores.length > 0);
        uint index = random() % jogadores.length;
        jogadores[index].transfer(address(this).balance);
        jogadores = new address payable[](0);
        
    }

    function abc() public view {
        
    }
    
    
    
    modifier apenasGerente() {
        require(msg.sender == gerente);
        _;
    }
    
    function pegaJogadores() public view returns (address payable[] memory){
        return jogadores;
    }
    
    
    
    
}