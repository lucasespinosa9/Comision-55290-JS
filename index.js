function presupuestoMensual() {
    //Ingresos
    let sueldo = parseInt(prompt("Ingrese sus ganacias del mes"))
    //Egresos
    let alquiler = parseInt(prompt("Ingrese cuanto abona de alquiler"))
    let comida = parseInt(prompt("Ingrese cuanto abona en en mercaderia"))
    let cuentas = parseInt(prompt("Ingrese cuanto abona en cuentas"))
    let empleados = parseInt(prompt("Ingrese cuanto destina a mano de obra(empleados)"))


    let sumaGastos = alquiler + comida + cuentas + empleados

    if (sueldo == sumaGastos) {
        console.log("Este mes no tenes ganancias ni perdidas")
    } else if (sueldo < sumaGastos) {
        console.log("Tenes perdidas este mes")
    } else if (sueldo > sumaGastos) {
        console.log("Tenes ganancias este mes")
    }
    let diferencia = sueldo - sumaGastos
    console.log(`La diferencia entre tu ganacia y tus gastos es de: ${diferencia}ARS`)
    return diferencia

}

//Bucle para indicar el mes sobre el cual hacemos el balance
for (i = 1; i <= 12; i++) {
    let mes = i
    switch (mes) {
        case i = 1:
            console.log(`Presupuesto del mes de Enero`)
            break
        case i = 2:
            console.log(`Presupuesto del mes de Febrero`)
            break
        case i = 3:
            console.log(`Presupuesto del mes de Marzo`)
            break
        case i = 4:
            console.log(`Presupuesto del mes de Abril`)
            break
        case i = 5:
            console.log(`Presupuesto del mes de Mayo`)
            break
        case i = 6:
            console.log(`Presupuesto del mes de Junio`)
            break
        case i = 7:
            console.log(`Presupuesto del mes de Julio`)
            break
        case i = 8:
            console.log(`Presupuesto del mes de Agosto`)
            break
        case i = 9:
            console.log(`Presupuesto del mes de Septiembre`)
            break
        case i = 10:
            console.log(`Presupuesto del mes de Octubre`)
            break
        case i = 11:
            console.log(`Presupuesto del mes de Noviembre`)
            break
        case i = 12:
            console.log(`Presupuesto del mes de Diciembre`)
            break
        }
            presupuestoMensual()
    }