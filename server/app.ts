import * as express from 'express';
//importamo o express que é responsável pelas rotas do nosso projeto
import * as request from 'request';
//importamos a request que é responsável por nossas reqisições http
import * as bodyParser from 'body-parser'
//converte a requisição para json

//importamos nossas classes, quando se faz a importação de arquivosmcolocamos a sua localização
import database from './config/database';
import controller from './controller';
//criamos a classe app
class App{

    public app: express.Application;
    public database : database;
    public controller : controller;

    constructor(){
        this.app = express();
        this.routes();
        this.middleware();
        this.database = new database();
        this.database.createConnection();
        this.controller= new controller();
    
    }
    //configuramos nosso middlware, que faz o intermédio entre as aplicações
    middleware(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
      }
    routes(){
        //configuramos nossas rotas
        this.app.route('/').get((req, res) => res.status(200).json({ "hello" : "world" }));
        this.app.route('/api/refresh').get(this.getEndPoint.bind(this));
        this.app.route('/api/dados').get((req,res) => this.controller.getDados(req, res));
        this.app.route('/api/dados/:id').get((req,res) => this.controller.getDadosOne(req, res));
        this.app.route('/api/dados/:id').delete((req, res) => this.controller.deleteDado(req,res));
        this.app.route('/api/dados/:id').put((req, res) => this.controller.putDado(req,res));

    }

    getEndPoint(req, res){
        //pegamos o end point da nossa aplicação
        request('https://crush-management.herokuapp.com/api/crushs', (error, response, body) => this.controller.create(body, res));
    }
}
//exportamos noss classe
export default new App();