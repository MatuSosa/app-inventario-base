const Producto = require('../models/Producto');

// GET: Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    // Busca y retorna todos los documentos guardados en la colección
    const productos = await Producto.find();
    // Responde con status 200 (OK) y envía el listado completo de productos
    res.status(200).json({ 
      ok: true, 
      datos: productos 
    });
  } catch (error) {
    // Manejo básico de errores enviando status 500 (Internal Server Error)
    res.status(500).json({ ok: false, mensaje: 'Error al obtener los productos desde la base de datos' });
  }
};

// POST: Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    // Extraemos los datos enviados en el cuerpo (Body) de la petición HTTP
    const { nombre, precio, stock } = req.body;

    // VALIDACIÓN: Si falta nombre o precio, respondemos con 400 (Bad Request)
    if (!nombre || !precio) {
      return res.status(400).json({ 
        ok: false, 
        mensaje: 'El nombre y el precio son campos obligatorios' 
      });
    }

    // Instancia el modelo con los datos recibidos
    const nuevoProducto = new Producto({
         nombre,
         precio,
         stock: stock || 0 // Si no se envía stock, se asigna 0 por defecto
    });
   
    // Guardado de forma persistente en la DB
    const productoGuardado = await nuevoProducto.save();

    // Respondemos con status 201 (Created) enviando el objeto creado
    res.status(201).json({ 
      ok: true, 
      mensaje: 'Producto guardado exitosamente en la base de datos', 
      datos: productoGuardado 
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al guardar el producto en la base de datos', error: error.mesagge });
  }
};

// PUT: Actualizar un producto existente por su ID
exports.actualizarProducto = async (req, res) => {
  try {
    // Capturamos el ID enviado desde la URL (Path Parameter)
    const { id } = req.params;
 
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {new: true});

   if(!productoActualizado){
    return res.status(404).json({ok:false, mensaje: 'Prodcuto no encontrado en la base de datos'}); 
   }

   res.status(200).json({
    ok: true,
    mensaje: 'Producto actualizado correctamente en la DB',
    datos: productoActualizado
   });
  }catch (error){
    res.status(500).json({ok: false, mensaje: 'Error al actualizar el producto', error: error.message});
  }
};

// DELETE: Eliminar un producto por su ID
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    //Busca el producto por ID y lo elimina de la DB
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if(!productoEliminado){
      return res.status(404).json({ok: false, mensaje: 'Producto no encontrado'});
    }

    res.status(200).json({ 
      ok: true, 
      mensaje: 'Producto eliminado correctamente de la base de datos' 
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar el producto', error: error.mesagge});
  }
};