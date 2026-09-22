import { useEffect, useState } from "react";

function App(){
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');


  const cargarProductos = () => {
    fetch('http://localhost:3000/api/productos')
    .then(resp => resp.json())
    .then(data =>{
      if(data.ok){
        setProductos(data.datos);
      }
    })
    .catch(err => console.error('Error al consultar prodcutos: ', err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio: Number(precio),
      stock: Number(stock) || 0
    };

    fetch('http://localhost:3000/api/productos',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    })
.then(res => res.json())
.then(data => {
  if(data.ok){
    cargarProductos();

  setNombre('');
  setPrecio('');
  setStock('');
  }else{
    alert('Error: ' + data.mensaje);
  }
})
.catch(err => console.error('Error al gurdar el prodcuto', err));
}


  return (
    <div>
      <h1>Panel de Gestion de Productos</h1>

      <form onSubmit={handleSubmit}
      >
      <h3>Formulario de Carga de Productos</h3>

      <input type="text" 
      placeholder="Nombre del Producto"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      required/>

      <input type="number"
      placeholder="Precio del Producto" 
      value={precio}
      onChange={(e) => setPrecio(e.target.value)}
      required
      />
      <input type="number" 
      placeholder="Stock del Prodcuto"
      value={stock}
      onChange={(e) => setStock(e.target.value)}/>
      
      <button type="submit">Guardar Producto </button>

      </form>

      <h3>Catálogo de Productos</h3>

      {productos.length === 0 ? (
        <p>No se encontraron productos en la base de datos</p>
      ) : (
        <ul>
          {productos.map(prod => (
        <li key = {prod._id}>
          <span><strong> {prod.nombre}</strong></span>
          <span> {prod.precio} | Stock: {prod.stock}</span>
        </li>
      ))}
    </ul>
      )}
    </div>
  );
}

export default App;