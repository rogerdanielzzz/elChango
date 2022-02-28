
// Funcion constructora
class Productos {
    constructor(nombre, categoria, supermercado, precio, comunidad) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.supermercado = supermercado
        this.precio = precio;
        this.comunidad = comunidad;
    }

    // Se agrega un metodo para que aplique el descuento de 15% de la comunidad coto en los producto participantes indicados por el usuario
    descuentoComunidad() {
        if (this.comunidad = true) {
            this.precio = this.precio * 0.85
        } else {
            this.precio = this.precio * 1
        }

    }

}
//Arrays
let listaCarrefour = [];
let listaCoto = [];

//Variables 
let divListaCoto = document.getElementById("divListaCoto")
let divListaCarrefour = document.getElementById("divListaCarrefour")
let totalCoto = document.getElementById("totalCoto")
let totalCarrefour = document.getElementById("totalCarrefour")
let formProducto = document.getElementById('formProducto')
let botonProductos = document.getElementById('botonProductos')


// Evento de submit 
formProducto.addEventListener('submit', (e) => {
    e.preventDefault()

    let nombre = document.getElementById('nombre').value
    let categoria = document.getElementById('categoria').value
    let supermercado = document.getElementById('supermercado').value
    let precio = document.getElementById('precio').value
    // se parsea el valor de entrada ya que a pesar que es input type number JS lo detecta como string
    precio= parseInt(precio)
    let comunidad = document.getElementById('comunidad').value

   // Se crea el objeto con los valores de los inputs
    let producto = new Productos(nombre, categoria, supermercado, precio, comunidad)
    
    // se Aplica 3 condicionales para saber en que array agregar el objeto y si en caso de ser de coto le corresponde el descuento comunidad a ese producto
    if ((supermercado == "Coto") && (comunidad == "No")) {
        comunidad = false;
        listaCoto.push(producto);

    } else if ((supermercado == "Coto") && (comunidad == "Si")) {
        comunidad = true;
        producto.descuentoComunidad()
        listaCoto.push(producto);

    } else if (supermercado == "Carrefour") {
        comunidad = false;
        listaCarrefour.push(producto);

    }


// Se borra los input al terminar el evento asi facilitando el proceso de agregar mas objetos
    formProducto.reset()
})


// Siguiente evento de click al boton de actualizar lista el cual agrega codigo html  y crea cards de bt para cada objeto creado
botonProductos.addEventListener('click', () => {
    
    // Se crea condiciones de que si el array no tiene una cantidad leght 0 se procede a crear el codigo html de las cards
    if (listaCoto.length !== 0) {
        listaCoto.forEach((productos, index) => {
            divListaCoto.innerHTML += `
                <div class="card my-5 text-dark bg-warning" id="producto${index}" style="width: 18rem;"> 
                    <div class="card-body px-2">
                        <h5 class="card-title"> ${productos.nombre}</h5>
                        <p class="card-text">Categoria: ${productos.categoria}</p>
                        <p class="card-text">Precio: $${productos.precio}</p>
                    </div>
                 </div>
                
                `
        })
        // se crea una funcion para buscar el atributo precio en el array y sumar para calcular el total de la compra
        const SUMACOTO = listaCoto.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);

        totalCoto.innerHTML +=`
        <p class="text-md-center fw-bold" > El total de tu lista Coto es $ ${SUMACOTO}</p>`

    } else {
        divListaCoto.innerHTML = "No se agrego ningun producto de Coto"
    }


})

// Se procede a las mismos eventos y funciones del array de coto
botonProductos.addEventListener('click', () => {
    if (listaCarrefour.length !== 0) {
        listaCarrefour.forEach((productos, index) => {
            divListaCarrefour.innerHTML += `
                <div class="card my-5 text-dark bg-warning" id="producto${index}" style="width: 18rem;"> 
                    <div class="card-body px-1">
                        <h5 class="card-title"> ${productos.nombre}</h5>
                        <p class="card-text">Categoria: ${productos.categoria}</p>
                        <p class="card-text">Precio: $${productos.precio}</p>
                    </div>
                 </div>
                
                `
        })
        const SUMACARREFOUR = listaCarrefour.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);

        totalCarrefour.innerHTML +=`
        <p class="text-md-center fw-bold" > El total de tu lista Carrefour es $ ${SUMACARREFOUR}</p>`
    
    
    } else {
        divListaCarrefour.innerHTML = "No se agrego ningun producto de Carrefour"
    }

})