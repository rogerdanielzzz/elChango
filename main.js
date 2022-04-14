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
// Array donde se filtra con los objetos con mayor precio cuando encuentran una coincidencia de nombre
let filtrado = [];
// Arrays para guardar guardar los productos con precio mas alto por supermercado
let higherCarrefour = [];
let higherCoto = [];
let saverCarrefour = [];
let saverCoto = [];


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
let weatherCard = document.getElementById('weatherCard')
let divAhorroCoto = document.getElementById("divAhorroCoto")
let divAhorroCarrefour = document.getElementById("divAhorroCarrefour")
let totalSavercoto = document.getElementById("totalSavercoto");
let totalSaverCarrefour = document.getElementById("totalSaverCarrefour");
let totalAhorro = document.getElementById('totalAhorro')






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
        <p class="text-center fw-bold" > El total de tu lista Coto es $ ${SUMACOTO}</p>`
        botonEliminarCoto.innerHTML += `
        <button id="botonProductos" class="btn btn-danger text-center">Eliminar Lista</button>`

    } else {
        divListaCoto.innerHTML = "No se agrego ningun producto de Coto"
    }


})

// Se procede a las mismos eventos y funciones del array de coto
botonProductos.addEventListener('click', () => {




    // Se agregan bucles con condiciones en el cual crea una carda con cada objeto del Array 

    if (listaCarrefour.length !== 0) {
        divListaCarrefour.innerHTML = ``
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
        <p class="text-center fw-bold" > El total de tu lista Carrefour es $ ${SUMACARREFOUR}</p>`

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

// Array que copian a las listas originales para despues ser modificados


// boton que muestra las 2 listas con los productos mas economicos de cada market.
botonAhorro.addEventListener('click', () => {

    // Se boora este array cada vez que se actualiza el boton para no duplicar datos
    filtrado.splice(0, filtrado.length)
    


    // Se aplica un bucle para poder comparar los 2 arrays y tener como resultado otro array con los precios mas altos
    for (var i = 0; i < listaCoto.length; i++) {

        for (var j = 0; j < listaCarrefour.length; j++) {
            if (listaCoto[i]['nombre'] == listaCarrefour[j]['nombre']) {


                // Operador Ternario if else 
                listaCoto[i]["precio"] < listaCarrefour[j]["precio"] ? filtrado.push(listaCarrefour[j]) : filtrado.push(listaCoto[i]);

            }


        }

    }

    // Se filtran los precios mas altos por supermercados.
    higherCoto = filtrado.filter((producto) => {
        if (producto.supermercado == "Coto") {
            return producto
        }
    });

    higherCarrefour = filtrado.filter((producto) => {
        if (producto.supermercado == "Carrefour") {
            return producto
        }
    });

    const resultCarrefour = listaCarrefour.filter(({
        nombre: id1
    }) => !higherCarrefour.some(({
        nombre: id2
    }) => id2 === id1));
    saverCarrefour = resultCarrefour

    const resultCoto = listaCoto.filter(({
        nombre: id1
    }) => !higherCoto.some(({
        nombre: id2
    }) => id2 === id1));
    saverCoto = resultCoto
    const SUMASAVERCOTO = saverCoto.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);
    const SUMASAVERCARREFOUR = saverCarrefour.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);


    // Se crea condiciones de que si el array no tiene una cantidad leght 0 se procede a crear el codigo html de las cards
    if (saverCoto.length !== 0) {
        divAhorroCoto.innerHTML = ``
        totalAhorro.innerHTML = ``



        saverCoto.forEach((productos, index) => {
            divAhorroCoto.innerHTML += `
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

        totalSaverCoto.innerHTML += `
    <p class="text-center fw-bold" > El total de tu lista Coto es $ ${SUMASAVERCOTO}</p>`


    } else {
        divAhorroCoto.innerHTML = "No se agrego ningun producto de Coto"
    }




    // Se procede a las mismos eventos y funciones del array de coto





    // Se agregan bucles con condiciones en el cual crea una carda con cada objeto del Array 

    if (saverCarrefour.length !== 0) {
        divAhorroCarrefour.innerHTML = ``
        totalSaverCarrefour.innerHTML = ``




        saverCarrefour.forEach((productos, index) => {
            divAhorroCarrefour.innerHTML += `
            <div class="card mx-auto my-5 text-dark bg-warning" id="producto${index}" style="width: 18rem;"> 
                <div class="card-body px-1">
                    <h5 class="card-title"> ${productos.nombre}</h5>
                    <p class="card-text">Categoria: ${productos.categoria}</p>
                    <p class="card-text">Precio: $${productos.precio}</p>
                </div>
             </div>
            
            `
        })

        totalSaverCarrefour.innerHTML += `
    <p class="text-center fw-bold" > El total de tu lista Carrefour es $ ${SUMASAVERCARREFOUR}</p>`





    } else {
        divAhorroCarrefour.innerHTML = "No se agrego ningun producto de Carrefour"
    }

    
    totalAhorro.innerHTML = `<p class="text-center fw-bold display-3" > El total de tus compras ahorradoras es de $ ${SUMASAVERCARREFOUR+SUMASAVERCOTO} </p>
    `

});






//Api del clima para el desafio


let myKey = "dad50ee0a666f8874b4e75882a8ff873"


fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ciudad Autónoma de Buenos Aires&appid=${myKey}&units=metric&lang=es`)

    .then((res) => res.json())
    .then(data => {

        let cityName = data['name'];
        let tempValue = data['main']['temp'];
        let tempMax = data['main']['temp_max'];
        let tempMin = data['main']['temp_min'];
        let humedad = data['main']['humidity'];
        let descriptionValue = data['weather'][0]['description'];




        weatherCard.innerHTML += ` 
<div class=" card bg-warning  mx-auto" style="width: 18rem;">
    <div class="card-body ">
    <h5 class="card-title ">${cityName}</h5>
    <p class="card-text">${descriptionValue}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class=" bg-warning  list-group-item display-3"> ${tempValue}°</li>
    <li class=" bg-warning list-group-item"> Max= ${tempMax}°</li>
    <li class=" bg-warning list-group-item"> Min = ${tempMin}°</li>
    <li class="  bg-warning list-group-item"> 💧 =  ${humedad}%</li>
  </ul>

</div>

`
    })