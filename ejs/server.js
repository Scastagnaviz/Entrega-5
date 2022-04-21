const express = require ('express');
const  PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const fs = require('fs');  

app.set('view engine','ejs');


class contenedor{
    constructor(archivo){
        this.cont = 0 ;
        this.arr= [];
        this.archivo = archivo;
    }
    save(obj){
        try{
       this.cont ++ ;
       obj.id = this.cont;
       this.arr.push(obj);
       fs.writeFileSync(this.archivo,JSON.stringify(this.arr))
        }
         catch{
             console.log('error al leer el archivo')
         }
            
    }
    getAll(){
        return this.arr;
    }
    getByiD(id){
        try {
         return  this.arr.find(producto => id == producto.id);
        } catch (error) {
            console.log(error);
            return null;
        }
}
deleteById(id){
    let i  =this.arr.indexOf(this.getByiD(id));
     this.arr.splice(i,1);
       fs.writeFileSync(this.archivo,JSON.stringify(this.arr))
       }
       
editById(id,obj){
           
        try {
        obj.id=id;
       let  indice= this.arr.findIndex(obj=>obj.id==id);
          this.arr[indice]=obj;
           fs.writeFileSync(this.archivo,JSON.stringify(this.arr))
           } catch (error) {
               console.log(error);
               return null;
           }   
    }
}

let conten = new contenedor('./productos.json');
conten.save({"nombre": 'heladera' ,"precio": 123 ,"url": 'url1'});
conten.save({"nombre": 'Microondas' ,"precio": 443 ,"url": 'url2'});
conten.save({"nombre": 'Cafetera' ,"precio": 1616 ,"url": 'url3'});
conten.save({"nombre": 'Arrocera' ,"precio": 2204 ,"url": 'url4'});


app.get('/productos',function(req,res){
    let productos = conten.getAll();

    res.render('pages/index',{
        productos : productos,

    });
})

app.get('/form',function(req,res){
    res.render('pages/form');
})

const server  = app.listen(PORT, () =>  {
    console.log( `Servidor Http escuchando  en el puerto ${PORT}`);
     }) ;
    
     server.on("error", error => console.log(`error en el servidor ${error}`));