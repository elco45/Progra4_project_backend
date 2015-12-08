var producto = require('../schemas/producto');/*objetos q se van a volver tablas, ayuda a crud el bd*/
var user = require('../schemas/user')

exports.getProductos = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var productos = producto.find({});
    reply(productos);
  }
}

exports.getUsers = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var users=user.find({});
    reply(users);
  }
}

exports.postProductos = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var v= "",ing="";
    for (var i = 0; i < 10; i++) {
       v += request.payload.fecha_venc[i];
       ing += request.payload.fecha_ingreso[i];
    }
    request.payload.fecha_venc = v;
    request.payload.fecha_ingreso =ing;
    var newProducto = new producto({
    	id: request.payload.id,
    	descripcion: request.payload.descripcion,
    	fecha_ingreso: request.payload.fecha_ingreso,
    	fecha_venc: request.payload.fecha_venc,
    	precio: request.payload.precio,
    	cantidad: request.payload.cantidad
    });
    newProducto.save();
    console.log('producto saved');
    return reply('ok');
  }
}

exports.putProductos ={
  auth: {
    mode:'required',
    strategy:'session',
    scope:['admin']
  },
  handler: function(request, reply){
    var v= "",ing="";
    for (var i = 0; i < 10; i++) {
      v += request.payload.fecha_venc[i];
      ing += request.payload.fecha_ingreso[i];
    }
    request.payload.fecha_venc = v;
    request.payload.fecha_ingreso =ing;
    producto.findOneAndUpdate(
      {id:request.payload.id},
        {descripcion: request.payload.descripcion,
        fecha_ingreso: request.payload.fecha_ingreso,
        fecha_venc: request.payload.fecha_venc,
        precio: request.payload.precio,
        cantidad:request.payload.cantidad
      },
      function(err,productos){
        productos.save(function(err){
          if (err) {
            alert("ERROR");
          }
        });
      }
    );
  }
}

exports.delProductos={
   auth: {
    mode:'required',
    strategy:'session',
    scope:['admin']
  },
  handler: function(request, reply){
    console.log(request.payload)
    producto.find({id:request.payload.id }, function(err, productos) {
      console.log(productos)
      if (err) throw err;

        var queryRemove = producto.findByIdAndRemove(productos._id, function(err) {
        if (err) throw err;

        // we have deleted the user
        console.log('User deleted!');
      });
      // delete him
     
    });
  }
}

exports.delUsers={
   auth: {
    mode:'required',
    strategy:'session',
    scope:['admin']
  },
  handler: function(request, reply){
    user.findOneAndRemove({ username:request.payload.username }, function(err) {
      if (err) {
        throw err;
      }
    });
  }
}