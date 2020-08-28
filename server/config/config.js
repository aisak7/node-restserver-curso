



//==============================
// Puerto
//==============================

process.env.PORT = process.env.PORT || 3000;



//==============================
// Entorno ( Produccion )
//==============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==============================
// Base de Datos
//==============================

let urlDB;

if(process.env.NODE_ENV === 'dev'){

    urlDB = 'mongodb://localhost:27017/cafe';
}else{

    urlDB = 'mongodb+srv://strider:KsUbBOvjYzDSt2gW@cluster0.ul9ez.mongodb.net/cafe'
}

process.env.URLDB = urlDB;


