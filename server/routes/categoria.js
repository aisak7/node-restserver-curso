const express = require('express');

let {verificaToken, verificaAdmin_role} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');
const { modelNames } = require('mongoose');
const usuario = require('../models/usuario');


// ===========================
// Mostrar todas la categorias
// ===========================
app.get('/categoria',verificaToken,(req,res)=>{

    Categoria.find({})
            .sort('descripcion') // aquí indicamos como queremos ordenar dichos elemtnos, en este caso por la descripcion
            .populate('usuario', 'nombre email') // aqui indicamos los elementos que queremos mostar dentro de usuario: nombre y email.
            .exec((err,categorias)=>{

                if ( err ){
                    return res.status(500).json({
        
                        ok:false,
                        err
        
                    });
                }

                res.json({

                    ok: true,
                    categorias

                });
            })




});


// ============================
// Mostrar una categoria por ID
// ============================

app.get('/categoria/:id',verificaToken,(req,res)=>{

//categoria.findById(....)

    let id = req.params.id;

    Categoria.findById(id, (err,categoriaDB)=>{

        if ( err ){
            return res.status(500).json({

                ok:false,
                err

            });
        }

        if ( !categoriaDB ){
            return res.status(500).json({

                ok:false,
                err:{
                    
                    message: 'El id no es correcto'
                }

            });
        }

        res.json({

            ok:true,
            categoria: categoriaDB

        })

    });


});

// ============================
// Crear nueva categoria
// ============================

app.post('/categoria',verificaToken,(req,res)=>{

    //regresa la nueva categoria
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({

        descripcion: body.descripcion,
        usuario: req.usuario._id

    });

    categoria.save((err,categoriaDB) =>{

        if ( err ){
            return res.status(500).json({

                ok:false,
                err

            });
        }

        if ( !categoriaDB ){
            return res.status(400).json({

                ok:false,
                err

            });
        }

        res.json({

            ok:true,
            categoria : categoriaDB

        })


    })
    
    
});

// ============================
// Crear nueva categoria
// ============================

app.put('/categoria/:id',verificaToken,(req,res)=>{

    let id = req.params.id;
    let body = req.body;

    let descCategoria ={
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria,{new : true, runValidators: true}, (err,categoriaDB)=>{

        if ( err ){
            return res.status(500).json({

                ok:false,
                err

            });
        }

        if ( !categoriaDB ){
            return res.status(400).json({

                ok:false,
                err

            });
        }

        res.json({

            ok:true,
            categoria : categoriaDB

        })

    });
    
    
    
});

// ============================
// Crear nueva categoria
// ============================
    
app.delete('/categoria/:id',[verificaToken,verificaAdmin_role],(req,res)=>{

    //solo un administrador puede borrar las categorias
    //Categoria.findByAndRemove

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB)=>{

        if ( err ){
            return res.status(500).json({

                ok:false,
                err

            });
        }

        if ( !categoriaDB ){
            return res.status(400).json({

                ok:false,
                err:{
                    message: 'El id no existe'
                }

            });
        }

        res.json({
            ok:true,
            message: 'Categoria Borrada'

        })
    });
    
    
});

    


module.exports = app;