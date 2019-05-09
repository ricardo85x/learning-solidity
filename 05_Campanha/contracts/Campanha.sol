pragma solidity ^0.5;

contract Campanha {
    
    // Request
    struct Requisicao {
        string descricao;
        uint valor;
        address destinatario;
        bool finalizado;
        uint qtdAprovacoes;
        mapping(address => bool) aprovacoes;
    }
    
    
    Requisicao[] public requisicoes; // requests
    address public gerente;
    uint public contribuicaoMinima;
    
    mapping(address => bool) public aprovadores; // apoiadores
    
    
    modifier restrito() {
        require(msg.sender == gerente);
        _;
    }
    
    constructor  ( uint minimo )  public{
        gerente = msg.sender;
        contribuicaoMinima = minimo;
    }
    
    
    function contribuir() public payable {
        require(msg.value > contribuicaoMinima);
        
        aprovadores[msg.sender] = true;
    }
    
    function criarRequisicao(string memory descricao , uint  valor , address  destinatario ) public restrito {

        Requisicao memory novaRequisicao = Requisicao( {
            descricao: descricao,
            valor: valor,
            destinatario: destinatario,
            finalizado: false,
            qtdAprovacoes: 0
        });
        
        
        requisicoes.push(novaRequisicao);
    }
    
    
    function pedidoDeAprovacao(uint indice) public {
        
        Requisicao storage pedido = requisicoes[indice];
        
        require(aprovadores[msg.sender]);
        require(pedido.aprovacoes[msg.sender] == false);
        
        pedido.aprovacoes[msg.sender] = true;
        pedido.qtdAprovacoes++;
    }
    
    
}

