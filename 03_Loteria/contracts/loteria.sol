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
    
    
    function escoolherGanhador() public  {
        uint index = random() % jogadores.length;
        jogadores[index].transfer(address(this).balance);
        
    }
    
}