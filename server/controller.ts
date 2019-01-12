import * as mongoose from 'mongoose';

//criamos as informações que irão para nosso banco de dados
const CrushSchema = new mongoose.Schema({
    nome : { type: String, required : true },
    apelido : { type: String, required : true},
    whatsapp : { type: String, required : true, unique: true},
    createAt : { type: Date, default: Date.now}
});

const model = mongoose.model('trouxas', CrushSchema);

class Controller{

    constructor(){ 
    }
    //criação de registros
    create(req, res){
        this.createTrouxa(JSON.parse(req).result)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    createTrouxa(data){
        return model.create(data);
    }
    //lendo os registros
    getDados(req, res){
        this.getTrouxas()
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    getTrouxas(){
        return model.find({});
    }

    getDadosOne(req, res){
        const id = { _id: req.params.id }
        this.getTrouxasOne(id)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }
    getTrouxasOne(id){
        return model.find(id);
    }
    //apagando dados
    deleteDado(req, res){
        const id = { _id: req.params.id }

        this.deleteTrouxas(id)
        .then(dados => res.status(200).json({"resultado" : "dados apagados"}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    deleteTrouxas(id){
        return model.deleteOne(id)
    }
    //atualizando dados
    putDado(req,res){
        const id = { _id: req.params.id }
        const dadoTrouxa =req.body;
        this.putTrouxas(id,dadoTrouxa)
        .then(dados => res.status(200).json({"resultado" : "dados apagados"}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    putTrouxas(id,dadoTrouxa){
        return model.findOneAndUpdate(id,dadoTrouxa)
    }

}
//expotamos a classe para permitir o acesso a partir de outras classes
export default Controller;

