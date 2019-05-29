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
    uint aprovadoresCount;
    
    
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
        aprovadoresCount++;
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
    
    function finalizarPedido(uint indice) public restrito {
    
        Requisicao storage pedido = requisicoes[indice];
        require(pedido.finalizado == false);
        require(pedido.qtdAprovacoes >= (aprovadoresCount / 2));
        
        pedido.destinatario.transfer(pedido.value);
        
        aprovadoresCount = 0;
        
        pedido.finalizado = true;
        
        
    }
    
    
}

