// Obtener elementos del DOM
const nombre = document.getElementById("nombre")
const mes = document.getElementById("selecMes")
const ganancias = document.getElementById("ganancias")
const alquiler = document.getElementById("alquiler")
const insumos = document.getElementById("insumos")
const cuentas = document.getElementById("cuentas")
const sueldoempleados = document.getElementById("sueldoempleados")
const btnCalcular = document.getElementById("btnCalcular")


// Clase constructora
class Mes {
    constructor(nombre, ganancias, alquiler, insumos, cuentas, sueldoempleados, nombreMes) {
        this.nombre = nombre
        this.ingreso = ganancias
        this.egresos = {
            alquiler,
            insumos,
            cuentas,
            sueldoempleados
        };
        this.mes = nombreMes
    }
    
    calcularDiferencia() {
        const gastosTotales = this.calcularGastos();
        return this.ingreso - gastosTotales
    }

    calcularGastos() {
        const { alquiler, insumos, cuentas, sueldoempleados } = this.egresos
        return alquiler + insumos + cuentas + sueldoempleados
    }
}


//Mostrar los resultados en el DOM
function mostrarResultado(nombre, mes, ingresos, egresos, diferencia) {
    const resultadosSection = document.createElement("section")
    resultadosSection.classList.add("resultados")

    const nombreH = document.createElement("h2")
    nombreH.textContent = `Hola ${nombre}`
    
    const mesP = document.createElement("p")
    mesP.textContent = `Veamos el balance del mes de ${mes}`
    
    const ingresosP = document.createElement("p")
    ingresosP.textContent = `Ingresos: $${ingresos}`
    
    const egresosP = document.createElement("p")
    egresosP.textContent = `Egresos: $${egresos}`
    
    const diferenciaP = document.createElement("p")
    diferenciaP.textContent = `La diferencia entre tus ingresos y egresos es de $${diferencia}`

    const datosLocal = document.createElement("h2")
    datosLocal.textContent = ``

    // Añadir elementos al section resultados
    resultadosSection.appendChild(nombreH)
    resultadosSection.appendChild(mesP)
    resultadosSection.appendChild(ingresosP)
    resultadosSection.appendChild(egresosP)
    resultadosSection.appendChild(diferenciaP)
    resultadosSection.appendChild(datosLocal)

    // Insertar el nuevo section debajo del section "contenedorPadre"
    const contenedorPadre = document.querySelector(".contenedorPadre")
    contenedorPadre.parentNode.insertBefore(resultadosSection, contenedorPadre.nextSibling)
}


// Evento click en el boton Calcular
function obtenerValor() {
    // Limpiar datos del section
    const resultadosAnteriores = document.querySelector(".resultados")
    resultadosAnteriores ? resultadosAnteriores.remove() : null
    
    const valorNombre = nombre.value
    const valorMes = mes.value
    const valorGanancias = parseFloat(ganancias.value)
    const valorAlquiler = parseFloat(alquiler.value)
    const valorInsumos = parseFloat(insumos.value)
    const valorCuentas = parseFloat(cuentas.value)
    const valorSueldoempleados = parseFloat(sueldoempleados.value)

    const mesSeleccionado = new Mes(valorNombre, valorGanancias, valorAlquiler, valorInsumos, valorCuentas, valorSueldoempleados, valorMes)

    const ingresosTotales = parseFloat(valorGanancias)
    const egresosTotales = parseFloat(valorAlquiler) + parseFloat(valorInsumos) + parseFloat(valorCuentas) + parseFloat(valorSueldoempleados)
    const diferenciaMes = mesSeleccionado.calcularDiferencia()

    localStorage.setItem(`mesDatos-${valorMes}`, JSON.stringify(mesSeleccionado))

    mostrarResultado(valorNombre, valorMes, ingresosTotales, egresosTotales, diferenciaMes)
}

//Listener al boton Calcular
btnCalcular.addEventListener("click", function (event) {
    event.preventDefault()
    obtenerValor()
})


// Botones para modo Claro-Oscuro del body
let btn1 = document.getElementById("btnActionClaro")
btn1.addEventListener("click", modoClaro)

function modoClaro() {
    const body = document.body
    body.style.backgroundImage = 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)'
    body.style.color = '#000000'
}

let btn2 = document.getElementById("btnActionOscuro")
btn2.addEventListener("click", modoOscuro)

function modoOscuro() {
    const body = document.body
    body.style.backgroundImage = 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'
    body.style.color = '#FFFFFF'
}