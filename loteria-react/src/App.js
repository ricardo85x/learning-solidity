import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import loteria from './loteria';





class App extends Component {
    state = {
        gerente: '',
        jogadores: [],
        balanco: '',
        value: '',
        mensagem: ''
    };



    // methodo que roda depois do render
    async componentDidMount() {
        const gerente = await loteria.methods.gerente().call();

        const jogadores = await loteria.methods.pegaJogadores().call();

        const balanco = await web3.eth.getBalance(loteria.options.address);


        this.setState( { gerente, jogadores, balanco })
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const contas = await web3.eth.getAccounts();

        this.setState({ mensagem: 'Esperando a transaction finalizar...'})

        await loteria.methods.enter().send({
            from: contas[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        })

        this.setState({ mensagem: 'Vc entrou na loteriiiiiaaaaaaa!'})

    };

    onClick = async () => {
        const contas = await web3.eth.getAccounts();

        this.setState({ mensagem: 'escolhendo aleatoriamente um ganhador sortudo, espere por favor!' })
        await loteria.methods.escolherGanhador().send({
            from: contas[0]
        })

        this.setState({ mensagem: 'um ganhador foi escolhido! '})

    }


    render(){



        return (
            <div>
                <h2>Contrato da loteria</h2>
                <p>Este contrato eh gerenciado por { this.state.gerente } </p>
                <p>N de jogadores { this.state.jogadores.length } </p>
                <p>Balanço total: { web3.utils.fromWei(this.state.balanco, 'ether') } ether </p>

                <hr/>


                <form onSubmit={this.onSubmit}>
                    <h4>Quer tentar a sorte?</h4>
                    <div>

                        <label>Numero de ether para entrar</label>
                        <input
                            value={this.state.value}
                            onChange={event => this.setState( { value: event.target.value})}
                        />

                    </div>
                    <button>Enter</button>
                </form>

                <hr />

                <h4>Pronto para escolher o ganhador</h4>
                <button onClick={this.onClick}>Ecolha o ganhador!</button>
                <hr />


                <h1>{this.state.mensagem} </h1>
            </div>
        );
    }

}

export default App;
