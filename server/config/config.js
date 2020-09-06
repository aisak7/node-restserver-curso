



//==============================
// Puerto
//==============================

process.env.PORT = process.env.PORT || 3000;



//==============================
// Entorno ( Produccion )
//==============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==============================
// Vencimiento del Token
//==============================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = '48h';


//==============================
// SEED de autentucación
//==============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-del-desarrollo';


//==============================
// Base de Datos
//==============================

let urlDB;

if(process.env.NODE_ENV === 'dev'){

    urlDB = 'mongodb://localhost:27017/cafe';
}else{

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/* 
Variables de entorno para heroku

heroku config:set MONGO_URI="xxxxxx" //aqui indicariamos en el lugar de las x la url donde nos queremos conectar
heroku config:get nombre  //nos devuelve el valor de la variable
heroku config:unset nombre //aquí eliminamos una varible, en este caso nombre
heroku config:set nombre="Isaac" */ // aquí cremos una nueva variable nombre con el valor Isaac.



//==============================
// Google Client ID
//==============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '870151640950-njga0g0lts6ha5hoi36dvurpd24uv32b.apps.googleusercontent.com';

