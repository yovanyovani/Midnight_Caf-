/* ==========================
   VARIABLES GLOBALES
========================== */

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];

/* ==========================
   CONTADOR CARRITO
========================== */

function actualizarContador() {

    const contador =
    document.getElementById(
    "contadorCarrito"
    );

    if(contador){

        contador.textContent =
        carrito.length;

    }

}

/* ==========================
   AGREGAR PRODUCTO
========================== */

function agregarCarrito(
nombre,
precio
){

    carrito.push({

        nombre,
        precio

    });

    localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
    );

    actualizarContador();

    mostrarToast(
    nombre + " agregado al carrito"
    );

}

/* ==========================
   MOSTRAR TOAST
========================== */

function mostrarToast(mensaje){

    const toastHTML =

    `
    <div class="toast-container position-fixed top-0 end-0 p-3">

        <div class="toast show">

            <div class="toast-header">

                <strong class="me-auto">
                Sakura Coffee
                </strong>

                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast">
                </button>

            </div>

            <div class="toast-body">

                ${mensaje}

            </div>

        </div>

    </div>
    `;

    document.body.insertAdjacentHTML(
    "beforeend",
    toastHTML
    );

    setTimeout(()=>{

        const toast =
        document.querySelector(
        ".toast-container"
        );

        if(toast){

            toast.remove();

        }

    },3000);

}

/* ==========================
   MOSTRAR CARRITO
========================== */

function cargarCarrito(){

    const contenedor =
    document.getElementById(
    "listaCarrito"
    );

    if(!contenedor) return;

    contenedor.innerHTML = "";

    let subtotal = 0;

    carrito.forEach((item,index)=>{

        subtotal += item.precio;

        contenedor.innerHTML +=

        `
        <div class="cart-item">

            <h5>${item.nombre}</h5>

            <p>
            $${item.precio.toFixed(2)}
            </p>

            <button
            class="btn btn-danger"
            onclick="eliminarProducto(${index})">

            Eliminar

            </button>

        </div>
        `;

    });

    calcularTotales(subtotal);

}

/* ==========================
   ELIMINAR PRODUCTO
========================== */

function eliminarProducto(index){

    carrito.splice(index,1);

    localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
    );

    cargarCarrito();

    actualizarContador();

}

/* ==========================
   VACIAR CARRITO
========================== */

function vaciarCarrito(){

    carrito = [];

    localStorage.removeItem(
    "carrito"
    );

    cargarCarrito();

    actualizarContador();

}

/* ==========================
   CALCULAR TOTALES
========================== */

function calcularTotales(subtotal){

    const iva =
    subtotal * 0.15;

    const total =
    subtotal + iva;

    const subtotalHTML =
    document.getElementById(
    "subtotal"
    );

    const ivaHTML =
    document.getElementById(
    "iva"
    );

    const totalHTML =
    document.getElementById(
    "total"
    );

    if(subtotalHTML){

        subtotalHTML.textContent =
        "$" +
        subtotal.toFixed(2);

    }

    if(ivaHTML){

        ivaHTML.textContent =
        "$" +
        iva.toFixed(2);

    }

    if(totalHTML){

        totalHTML.textContent =
        "$" +
        total.toFixed(2);

    }

}

/* ==========================
   BUSCADOR
========================== */

const buscador =
document.getElementById(
"buscador"
);

if(buscador){

    buscador.addEventListener(
    "keyup",
    function(){

        let filtro =
        this.value.toLowerCase();

        let productos =
        document.querySelectorAll(
        ".producto"
        );

        productos.forEach(producto=>{

            let texto =
            producto.textContent
            .toLowerCase();

            producto.style.display =

            texto.includes(filtro)
            ? "block"
            : "none";

        });

    }
    );

}

/* ==========================
   LOGIN
========================== */

function validarLogin(){

    const correo =
    document.getElementById(
    "correo"
    ).value;

    const password =
    document.getElementById(
    "password"
    ).value;

    if(
        correo === "" ||
        password === ""
    ){

        alert(
        "Complete todos los campos"
        );

        return false;

    }

    alert(
    "Inicio de sesión exitoso"
    );

    return true;

}

/* ==========================
   REGISTRO
========================== */

function validarRegistro(){

    const nombre =
    document.getElementById(
    "nombre"
    ).value;

    const correo =
    document.getElementById(
    "correo"
    ).value;

    const password =
    document.getElementById(
    "password"
    ).value;

    if(

        nombre === "" ||
        correo === "" ||
        password === ""

    ){

        alert(
        "Todos los campos son obligatorios"
        );

        return false;

    }

    if(password.length < 6){

        alert(
        "La contraseña debe tener al menos 6 caracteres"
        );

        return false;

    }

    alert(
    "Registro exitoso"
    );

    return true;

}

/* ==========================
   CONTACTO
========================== */

function enviarContacto(){

    const nombre =
    document.getElementById(
    "nombreContacto"
    ).value;

    const correo =
    document.getElementById(
    "correoContacto"
    ).value;

    const mensaje =
    document.getElementById(
    "mensajeContacto"
    ).value;

    if(
        nombre === "" ||
        correo === "" ||
        mensaje === ""
    ){

        alert(
        "Complete todos los campos"
        );

        return false;

    }

    alert(
    "Mensaje enviado correctamente"
    );

    return true;

}

/* ==========================
   CONFIRMAR COMPRA
========================== */

function confirmarCompra(){

    if(carrito.length === 0){

        alert(
        "El carrito está vacío"
        );

        return;

    }

    alert(
    "Gracias por su compra"
    );

    carrito = [];

    localStorage.removeItem(
    "carrito"
    );

    actualizarContador();

    window.location.href =
    "index.html";

}

/* ==========================
   PERFIL
========================== */

function guardarPerfil(){

    const usuario =
    document.getElementById(
    "usuario"
    ).value;

    localStorage.setItem(
    "usuario",
    usuario
    );

    alert(
    "Perfil actualizado"
    );

}

/* ==========================
   CARGAR PERFIL
========================== */

function cargarPerfil(){

    const usuario =
    localStorage.getItem(
    "usuario"
    );

    const campo =
    document.getElementById(
    "usuario"
    );

    if(
        usuario &&
        campo
    ){

        campo.value =
        usuario;

    }

}

/* ==========================
   INICIALIZACIÓN
========================== */

document.addEventListener(
"DOMContentLoaded",
function(){

    actualizarContador();

    cargarCarrito();

    cargarPerfil();

});