var fs = require('fs');

var rawdata = fs.readFileSync(__dirname + "/../data/productos.json");
let listaProductos = JSON.parse(rawdata);

const productController = {
    productos: (req, res, next) =>{
        res.render('productos', {listaProductos:listaProductos});
    },
    agregar: (req, res, next) => {
        res.render('agregar', {
            listaProductos:listaProductos
        });
    },
    agregarProducto: (req,res,next) =>{
        
        let resultadoABM = "productoAgregado";

        let productoArgegado = {};
        productoArgegado.id = req.body.id;
        productoArgegado.nombre = req.body.nombre;
        productoArgegado.precio = req.body.precio;
        productoArgegado.descripcion = req.body.descripcion;
        productoArgegado.marca = req.body.marca;
        productoArgegado.stock = req.body.stock;

        listaProductos.push(productoArgegado);

        let listaProductosString = JSON.stringify(listaProductos);
        fs.writeFileSync(__dirname + "/../data/productos.json", listaProductosString);

        res.render('ABMresult', {
            listaProductos:listaProductos,
            resultadoABM
        });
    },
    editar: (req, res, next) => {
        let resultadoABM = "productoNOEditado";
        let productoID = req.params.id;
        let productoSeleccionado = [];
        
        for( let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productoID){
                productoSeleccionado = listaProductos[i];
            }
        }

        res.render('editar', {
            productoSeleccionado,
            resultadoABM
        });
    },
    editarProducto: (req, res, next) => {
        let productoID = req.params.id;
        let resultadoABM = "productoNOEditado";
        let productoAEditar = [];
        let productoSeleccionado = []; // editado

        for( let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productoID){
                productoAEditar = listaProductos[i];
                listaProductos[i] = req.body;
                resultadoABM = "productoEditado";
                productoSeleccionado = listaProductos[i];
            }
        }

        let listaProductosString = JSON.stringify(listaProductos);
        fs.writeFileSync(__dirname + "/../data/productos.json", listaProductosString);

        res.render('editar', {
            productoSeleccionado,
            productoAEditar,
            resultadoABM
        });
    },
    borrar: (req, res, next) => {
        let productoID = req.params.id;

        let productoSeleccionado = [];
        for( let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productoID){
                productoSeleccionado = listaProductos[i];
            }
        }

        res.render('borrar', {
            productoSeleccionado
        });
    },
    borrarProducto: (req, res, next) => {
        let productoID = req.params.id;
        let productoBorrado = [];
        let resultadoABM = "productoNOBorrado";

        for ( let i=0; i<listaProductos.length; i++ ){
            if(listaProductos[i].id == productoID){
                productoBorrado = listaProductos[i];
                listaProductos.splice(i, 1);
                resultadoABM = "productoBorrado";
            }
        }

        if ( resultadoABM == "productoBorrado" ){
            if ( listaProductos.length>0 ){
                for ( let i=0; i<listaProductos.length; i++ ){
                    let newID = i+1;
                    listaProductos[i].id = newID.toString();
                }
            } else {
                listaProductos = []
            }
            let listaProductosString = JSON.stringify(listaProductos);
            fs.writeFileSync(__dirname + "/../data/productos.json", listaProductosString);
        } 
        
        res.render('ABMresult', {
            listaProductos,
            productoBorrado,
            resultadoABM
        });

    },
}

module.exports = productController;