const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mysql = require('mysql')
const path = require('path');

app.listen("3000", ()=>{
    console.log('servirdor rodando')
})

//body parser
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + 'public'));


//conexão

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'doce estelar'
});


db.connect(function(err){
    if(err){
        console.log("não foi posivel conectar");
    }
})

app.get('/clientes',function(req,res){
    let query = db.query("SELECT * FROM clientes",function (err,results) { 
        res.render('clientes',{lista:results})
        })
    })
    

app.get('/',function(req,res){

    res.render('index',{});
    
})

app.post('/',function (req,res) { 
    console.log("tudo certo");
     let nome =req.body.nome;
     let Email =req.body.Email;
     let Telefone =req.body.Telefone;
     let pedido =req.body.pedido;
     db.query("INSERT INTO clientes (nome,Email,Telefone,pedido) VALUES (?,?,?,?)",[nome,Email,Telefone,pedido],function(err,results){})
     res.render('index',{});
 })
