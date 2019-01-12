import * as mongoose from 'mongoose'
//importamos o mongoose que faz a ligaçao entre o node e o banco de dados
class database{
    //ur e que o banco será criado
    private url='mongodb://127.0.0.1/madrugadanerdzao';
    //criamos a connection
    private connection = mongoose.connection;
    //construtor
    constructor(){

    }
    //informações da url
    createConnection(){
        mongoose.connect(this.url);
        this.connection.on('connected',()=>console.log('mongose foi conectado'));


    }
    //fechamos a conexão
    closeConnection(){
        this.connection.close(()=>console.log('mongose foi desconectado'));
    }
}
//exportamos a classe para permitir que ela seja acessada a partir de outra classe
export default database;