import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import loteria from './loteria';





class App extends Component {


    constructor (props) {

        super(props)

        this.state = { gerente: ' '}

    }

    // methodo que roda depois do render
    async componentDidMount() {

      //  const gerente = await loteria.methods.gerente().call();
        const gerente = "popey";



        const conta = await web3.eth.getAccounts()

        loteria.methods.gerente().call({from: conta[0]}, (error, result) => {
            console.log("eeee", error)
            console.log('re', result)
        });

        // console.log('abc', abc);

        // const jogadores =  loteria.methods.gerente()
        //     .on('error', function(erro) {
        //         console.log("erro gerente:", erro)
        //     }) .then(saida => {
        //         console.log("toma e nao reclama:", saida)
        //     });
        //

        console.log("metodos = ", conta)

        console.log(web3)

        this.setState( { gerente })
    }


    render(){



        return (
            <div>
                <h2>Contrato da loteria</h2>
                <p>Este contrato eh gerenciado por { this.state.gerente } </p>
            </div>
        );
    }

}

export default App;
