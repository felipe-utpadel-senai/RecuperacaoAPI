const express = require('express');
const { ClientRequest } = require('http');
const app = express();

app.use(express.json());

let clientes = [];
let carros = [];
let servicos = [];
let agendamentos = [];

function validaNome(nome){
    return nome.lenght > 3 && nome.lenght < 100; 
}

function validaTelefone(telefone){
    return telefone.lenght == 11 && Number.telefone; 
}
function validaCodigo(codigo){
    return codigo > 0;
}

function validaMarca(marca){
    return marca.lenght > 3 && marca.lenght < 50; 
}

function validaModelo(modelo){
    return modelo.lenght > 2 && modelo.lenght < 50;
}

function validaTamanho(tamanho){
    return tamanho =="HATCH" || tamanho == "SEDAN" || tamanho =="SUV" || tamanho == "PICAPE";
}

function validaDescricao(descricao){
    return descricao.lenght > 5 && descricao.lenght < 100;
}

function validaData(data_hora){
    return Date.data_hora;
}
app.get('/clientes', (req, res) =>{
    res.json(clientes);
});

app.post('/clientes', (req, res) => {
    const {nome} = req.body;
    const {telefone} = req.body;
    const {id} = req.body;
     
    if(validaNome(nome)){
        res.status(400).json({message: 'nome deve conter no mínimo 3 caracteres e no máximo 100'})
    };
    if(validaTelefone(telefone)){
        res.status(400).json({message: 'telefone deve conter exatamente 11 dígitos e apenas números'})
    }
    clientes.forEach(clientes => {
        if(clientes.id > id){
            id = clientes.id;
        };
    });

    clientes.push({id: id + 1, nome});
    res.status(201).json({message: 'cliente criado com sucesso'});
});

app.get('/clientes/:id', (req, res) =>{
    const id = Number.parseInt(req.params.id);
    res.status(200).json(clientes.find(clientes => clientes.id === id));
});

app.put('/clientes/:id', (req, res) => {
    const {id} = req.params;
    const {nome} = req.body;

    const clientes = clientes.find(c => c.id === parseInt(id));

    if(validaCodigo){
        res.status(400).json({message:'codigo deve ser maior que 0'})
    };
    if(validaNome(nome)){
        res.status(400).json({message: 'nome deve conter no mínimo 3 caracteres e no máximo 100'})
    };
    if(!validaTelefone(telefone)){
        res.status(400).json({message: 'telefone deve conter exatamente 11 dígitos e apenas números'})
    };
    
    if(clientes){
        clientes.nome = nome;
        res.status(201).json({message: 'Cliente atualizado com sucesso'});
    } else{
        res.status(400).json({message: 'Cliente não encontrado'});
    };
});

app.delete('clientes/:id', (req,res) =>{
    const {id} = req.params;
    const index = clientes.findIndex(c => c.id === Number.parseInt(id));

    if(index !== -1){
        clientes.splice(index, 1);
        res.status(200).json({message: "cliente removido com sucesso"});
    } else {
        res.status(400).json({message:'cliente não encontrado'});
    }
});


//carros
app.get('/carros', (req, res) =>{
    res.json(carros);
});

app.post('/carros', (req, res) => {
    const {marca} = req.body;
    const {modelo} = req.body;
    const {tamanho} = req.body;
    const {codigo} = req.body;

    const id_clientes = clientes.find(c => c.id === parseInt(id));
    
    if(validaCodigo(codigo)){
        res.status(400).json({message: 'Código deve ser maior que 0'});
    }
    if(validaMarca(marca)){
        res.status(400).json({message: 'Marca deve conter no mínimo 3 caracteres e no máximo 50'})
    };
    if(validaModelo(modelo)){
        res.status(400).json({message: 'modelo deve conter no mínimo 2 caracteres e no máximo 50'})
    };
    if(validaTamanho(tamanho)){
        res.status(400).json({message:  "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"})
    }
    if(!id_clientes){
        res.status(400).json({message: "'id_cliente' não corresponde a um cliente cadastrado"})
    }
    carros.push({codigo: codigo + 1, marca, modelo, tamanho});
    res.status(201).json({message: 'carro criado com sucesso'});
});
app.get('/carros/:codigo', (req, res) =>{
    const codigo = Number.parseInt(req.params.codigo);
    res.status(200).json(codigo.find(carro => carros.codigo === codigo));
});

app.put('/carros/:codigo', (req, res) => {
    const {codigo} = req.params;
    const {nome} = req.body;

    const carros = carros.find(c => c.codigo === parseInt(codigo));

    if(validaCodigo){
        res.status(400).json({message:'codigo deve ser maior que 0'})
    };
    if(validaMarca(marca)){
        res.status(400).json({message: 'Marca deve conter no mínimo 3 caracteres e no máximo 50'})
    };
    if(validaModelo(modelo)){
        res.status(400).json({message: 'modelo deve conter no mínimo 2 caracteres e no máximo 50'})
    };
    if(validaTamanho(tamanho)){
        res.status(400).json({message:  "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"})
    };
    
    if(carros){
        carros.marca = marca;
        res.status(201).json({message: 'Carro atualizado com sucesso'});
    } else{
        res.status(400).json({message: 'Carro não encontrado'});
    };
});

app.delete('carros/:codigo', (req,res) =>{
    const {codigo} = req.params;
    const index = codigo.findIndex(c => c.codigo === Number.parseInt(codigo));

    if(index !== -1){
        carros.splice(index, 1);
        res.status(200).json({message: "carro removido com sucesso"});
    } else {
        res.status(400).json({message:'carro não encontrado'});
    }
});


//serviços
app.get('/servicos', (req, res) =>{
    res.json(servicos);
});

app.post('/servicos', (req, res) => {
    const {descricao} = req.body;
    const {valores} = (tamanho, valor)
    const {tamanho} = req.body;
    const {valor} = req.body;
    const {codigo} = req.body;

    const id_clientes = clientes.find(c => c.id === parseInt(id));

    if(validaDescricao(marca)){
        res.status(400).json({message: 'Descricao deve conter no mínimo 5 caracteres e no máximo 100'})
    };
    
    if(validaTamanho(tamanho)){
        res.status(400).json({message:  "'O valor para 'HATCH' deve ser igual ou maior que 0"})
    }
    
    servicos.push({codigo: codigo + 1, descricao, valores});
    res.status(201).json({message: 'carro criado com sucesso'});
});

app.get('/servicos/:codigo', (req, res) =>{
    const codigo = Number.parseInt(req.params.codigo);
    res.status(200).json(codigo.find(servicos => servicos.codigo === codigo));
});

app.put('/servicos/:codigo', (req, res) => {
    const {descricao} = req.body;
    const {valores} = (tamanho, valor)
    const {tamanho} = req.body;
    const {valor} = req.body;
    const {codigo} = req.body;

    const servicos = servicos.find(s => s.codigo === parseInt(codigo));

    if(validaDescricao(marca)){
        res.status(400).json({message: 'Descricao deve conter no mínimo 5 caracteres e no máximo 100'})
    };
    
    if(validaTamanho(tamanho)){
        res.status(400).json({message:  "'O valor para 'HATCH' deve ser igual ou maior que 0"})
    }
    
    if(servicos){
        servicos.codigo = codigo;
        servicos.descricao = descricao;
        servicos.valores = valores;
        servicos.tamanho = tamanho;
        res.status(201).json({message: 'serviço atualizado com sucesso'});
    } else{
        res.status(400).json({message: 'serviço não encontrado'});
    };
});

app.delete('servicos/:codigo', (req,res) =>{
    const {codigo} = req.params;
    const index = codigo.findIndex(s => s.codigo === Number.parseInt(codigo));

    if(index !== -1){
        carros.splice(index, 1);
        res.status(200).json({message: "serviço removido com sucesso"});
    } else {
        res.status(400).json({message:'serviço não encontrado'});
    }
});

app.get('/agendamentos', (req, res) =>{
    res.json(agendamentos);
});

app.post('/agendamentos', (req, res) => {
    const data_hora = req.body;

    const id_carro = carros.find(c => c.codigo === parseInt(codigo));
    const id_servico = servicos.find(s => s.codigo === parseInt(codigo));
    
    if(!id_carro){
        res.status(400).json({message:'id_carro não corresponde a um carro cadastrado'});
    }
    if(!id_servico){
        res.status(400).json({message:'id_servico não corresponde a um serviço cadastrado'});
    }
    if(validaData(data_hora)){
        res.status(400).json({message:'data_hora deve ser informado'});
    }
    agendamentos.push({codigo: codigo + 1, marca, modelo, tamanho});
    res.status(201).json({message: 'carro criado com sucesso'});
});


app.listen(3000, () =>{
    console.log('Rodando na porta 3000');
});
