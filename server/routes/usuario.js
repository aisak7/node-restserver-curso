const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express()

app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado:true}, 'nombre email role estado google img') // Aquí realizamos las exclusiones con las cuales queremos filtrar nuestra busqueda.
            .skip(desde) // le indicamos desde donde queremeos empezar a buscar.
            .limit(limite) // le pones un limite del numero de registros que queremos que nos muestre.
            .exec((err, usuarios) => {

                if(err){
                    return res.status(400).json({

                        ok:false,
                        err

                    })
                }

                Usuario.count({estado:true}, (err,conteo)=>{
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos : conteo
                    });

                })

            })

  });
  
  app.post('/usuario', function (req, res) {
  
        let body = req.body;

        let usuario = new Usuario({

            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role

        });


        usuario.save((err,usuarioDB)=>{

            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }

            res.json({

                ok:true,
                usuario: usuarioDB

            });

        })
  
  });
  
  app.put('/usuario/:id', function (req, res) {

        let id = req.params.id;
        let body = _.pick(req.body,['nombre','email','img','role','estado'] ) ;

            
        Usuario.findByIdAndUpdate(id, body,{new: true, runValidators: true}, (err,usuarioDB) => {
            
            if( err ){
                return res.status(400).json({
                        ok:false,
                        err
                }); 
            };

            res.json({
    
                ok: true,
                usuario : usuarioDB
    
            });
        })

  });
  
  app.delete('/usuario/:id', function (req, res) {


      
    let id = req.params.id;
    let cambiaEstado ={
        estado:false
    }
    //Usuario.findByIdAndRemove(id, (err,usuarioBorrado)=>{
    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true}, (err,usuarioBorrado)=>{// aquí le pasamos una variable cambiaEstado, que le cambia el estado a false a el registro que le pasemos.

        if( err ){
            return res.status(400).json({
                    ok:false,
                    err
            }); 
        };

        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                   
                    message: 'Usuario no encontrado.'
                    
                }
            }); 

        }

        res.json({
            ok:true,
            usuario: usuarioBorrado
        })

    })




  });

  module.exports = app;