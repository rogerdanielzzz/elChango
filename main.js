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
//Arrays el cual verifican con un IF si hay datos en Local Storage en caso de haber clonan el array de ls con Spread
let datosCoto = JSON.parse(localStorage.getItem('productosCoto'))
let datosCarrefour = JSON.parse(localStorage.getItem('productosCarrefour'))
let listaCoto = [];
if (datosCoto) {
    listaCoto = [...datosCoto]
}
let listaCarrefour = []
if (datosCarrefour) {
    listaCarrefour = [...datosCarrefour]
}
// Array donde se filtra con los objetos con menor precio cuando encuentran una coincidencia de nombre
let filtrado = [];


//Variables  para poder modificar dom
let divListaCoto = document.getElementById("divListaCoto")
let divListaCarrefour = document.getElementById("divListaCarrefour")
let totalCoto = document.getElementById("totalCoto")
let totalCarrefour = document.getElementById("totalCarrefour")
let formProducto = document.getElementById('formProducto')
let botonProductos = document.getElementById('botonProductos')
let botonEliminarCoto = document.getElementById('botonEliminarCoto')
let botonEliminarCarrefour = document.getElementById('botonEliminarCarrefour')
let supermercado = document.getElementById('supermercado')
let comunidad = document.getElementById('comunidad')



// Evento de submit 
formProducto.addEventListener('submit', (e) => {
    e.preventDefault()

    let nombre = document.getElementById('nombre').value
    let categoria = document.getElementById('categoria').value
    supermercado = document.getElementById('supermercado').value
    let precio = document.getElementById('precio').value
    // se parsea el valor de entrada ya que a pesar que es input type number JS lo detecta como string
    precio = parseInt(precio)
    comunidad = document.getElementById('comunidad').value

    // Se crea el objeto con los valores de los inputs
    let producto = new Productos(nombre, categoria, supermercado, precio, comunidad)

    // se Aplica 3 condicionales para saber en que array agregar el objeto y si en caso de ser de coto le corresponde el descuento comunidad a ese producto
    if ((supermercado == "Coto") && (comunidad == "No")) {
        producto.comunidad = false;

        listaCoto.push(producto);
        localStorage.setItem('productosCoto', JSON.stringify(listaCoto))

    } else if ((supermercado == "Coto") && (comunidad == "Si")) {
        producto.comunidad = true;
        producto.descuentoComunidad()
        listaCoto.push(producto);
        localStorage.setItem('productosCoto', JSON.stringify(listaCoto))

    } else if (supermercado == "Carrefour") {
        producto.comunidad = false;
        listaCarrefour.push(producto);
        localStorage.setItem('productosCarrefour', JSON.stringify(listaCarrefour))

    }

    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        className: "toastNotify",
        style: {
            color: "#000000",
            background: "#ffc107",

        },

        offset: {
            y: 55
        },

    }).showToast();

    // Se borra los input al terminar el evento asi facilitando el proceso de agregar mas objetos
    formProducto.reset()
})

supermercado.addEventListener('input', (e) => {
    comunidad.disable = true;
})



// Siguiente evento de click al boton de actualizar lista el cual agrega codigo html  y crea cards de bt para cada objeto creado
botonProductos.addEventListener('click', () => {

    // Se crea condiciones de que si el array no tiene una cantidad leght 0 se procede a crear el codigo html de las cards
    if (listaCoto.length !== 0) {
        divListaCoto.innerHTML = ""
        totalCoto.innerHTML = ``
        botonEliminarCoto.innerHTML = ``


        listaCoto.forEach((productos, index) => {
            divListaCoto.innerHTML += `
                <div class="card mx-auto my-5 text-dark bg-warning" id="producto${index}" style="width: 18rem;"> 
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

        totalCoto.innerHTML += `
        <p class="text-md-center fw-bold" > El total de tu lista Coto es $ ${SUMACOTO}</p>`
        botonEliminarCoto.innerHTML += `
        <button id="botonProductos" class="btn btn-danger text-center">Eliminar Lista</button>`

    } else {
        divListaCoto.innerHTML = "No se agrego ningun producto de Coto"
    }


})

// Se procede a las mismos eventos y funciones del array de coto
botonProductos.addEventListener('click', () => {

    // Se aplica un bucle para poder comparar los 2 arrays y tener como resultado otro array con los precios mas bajos
    for (var i = 0; i < listaCoto.length; i++) {

        for (var j = 0; j < listaCarrefour.length; j++) {
            if (listaCoto[i]['nombre'] == listaCarrefour[j]['nombre']) {


                // Operador Ternario if else 
                listaCoto[i]["precio"] > listaCarrefour[j]["precio"] ? filtrado.push(listaCarrefour[j]) : filtrado.push(listaCoto[i]);

            }
        }

    }


    console.log(filtrado)


    // Se agregan bucles con condiciones en el cual crea una carda con cada objeto del Array 

    if (listaCarrefour.length !== 0) {
        divListaCarrefour.innerHTML = ""
        totalCarrefour.innerHTML = ``
        botonEliminarCarrefour.innerHTML = ``



        listaCarrefour.forEach((productos, index) => {
            divListaCarrefour.innerHTML += `
                <div class="card mx-auto my-5 text-dark bg-warning" id="producto${index}" style="width: 18rem;"> 
                    <div class="card-body px-1">
                        <h5 class="card-title"> ${productos.nombre}</h5>
                        <p class="card-text">Categoria: ${productos.categoria}</p>
                        <p class="card-text">Precio: $${productos.precio}</p>
                    </div>
                 </div>
                
                `
        })
        const SUMACARREFOUR = listaCarrefour.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);

        totalCarrefour.innerHTML += `
        <p class="text-md-center fw-bold" > El total de tu lista Carrefour es $ ${SUMACARREFOUR}</p>`

        botonEliminarCarrefour.innerHTML += `
        <button id="botonProductos" class="btn btn-danger text-center">Eliminar Lista</button>`



    } else {
        divListaCarrefour.innerHTML = "No se agrego ningun producto de Carrefour"
    }

})


botonEliminarCoto.addEventListener('click', () => {

    divListaCoto.innerHTML = "No se agrego ningun producto de Coto"
    totalCoto.innerHTML = ``
    botonEliminarCoto.innerHTML = ``

    listaCoto.splice(0, listaCoto.length)
    localStorage.removeItem('productosCoto')

})


botonEliminarCarrefour.addEventListener('click', () => {

    divListaCarrefour.innerHTML = "No se agrego ningun producto de Carrefour"
    totalCarrefour.innerHTML = ``
    botonEliminarCarrefour.innerHTML = ``

    listaCarrefour.splice(0, listaCarrefour.length)
    localStorage.removeItem('productosCarrefour')
})