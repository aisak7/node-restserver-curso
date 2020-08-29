
const jwt = require('jsonwebtoken');

//==========================
// Verificar Token
//==========================

let verificaToken = ( req, res, next ) =>{ // aqui vamos a leer el token que le pasamos por postman

    let token = req.get('token');

    jwt.verify( token, process.env.SEED, (err,decoded) =>{

        if(err){

            return res.status(401).json({
                ok: false,
                err:{

                    message: 'Token no valido'

                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

//==========================
// Verifica Admin Role
//==========================


let verificaAdmin_role = ( req, res, next ) =>{

    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){

        next();

    }else{
        res.json({
    
            ok:false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdmin_role
}