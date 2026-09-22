const mongoose = require('mongoose');

// Definimos el esquema o la estructura que tendrán los documentos en Mongo DB
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del campo es obligatorio'],
        trim: true
    },
    precio:{
        type: Number,
        required:[true, 'El precio es Obligatorio'],
        min: [0, 'El precio no puede ser un numero negativo'],
    },
    stock:{
        type: Number,
        default: 0
    }
}, {
    // Genera automaticamente los campos de createdAt y updateAt (fechas)
    timestamps: true
});

// Ecportamos el modelo para usarlo en los controladores
module.exports = mongoose.model('Producto', productoSchema);