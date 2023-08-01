//Ingreso de los datos a sus variables
function obtenerDatos(mensaje) {
    let valor;
    while (isNaN(valor)) {
        valor = parseInt(prompt(mensaje));
    }
    return valor;
}

let sueldoPrimerCuatrimestre = obtenerDatos(`Ingrese sus ganacias para el primer cuatrimestre del año`);
let alquilerPrimeraMitad = obtenerDatos(`Ingrese cuanto abona de alquiler en la primera mitad del año`);
let comidaPrimeraMitad = obtenerDatos(`Ingrese cuanto abona de insumos en la primera mitad del año`);
let cuentas = obtenerDatos(`Ingrese cuanto abona en cuentas mensualmente`);
let gastosVariables = obtenerDatos(`Ingrese cuanto destina en empleados`);
let sueldoSegundoCuatrimestre = obtenerDatos(`Ingrese sus ganancias para el segundo cuatrimestre del año`);
let alquilerSegundaMitad = obtenerDatos(`Ingrese cuanto abona de alquiler en la segunda mitad del año`);
let comidaSegundaMitad = obtenerDatos(`Ingrese cuanto abona de insumos en la segunda mitad del año`);
let sueldoTercerCuatrimestre = obtenerDatos(`Ingrese sus ganancias para el tercer cuatrimestre del año`);
let sueldoCuartoCuatrimestre = obtenerDatos(`Ingrese sus ganancias para el cuarto cuatrimestre del año`);

//Clase constructora
class Mes {
    constructor(sueldo, alquiler, comida, cuentas, empleados, nombreMes) {
        this.ingreso = sueldo;
        this.egresos = {
            alquiler,
            comida,
            cuentas,
            empleados
        };
        this.mes = nombreMes;
    }
    calcularDiferencia() {
        return this.ingreso - calcularGastos(this);
    }
}

//Array donde se almacenan los meses
const meses = [];

//Funcion para almacenar los datos en sus respectivos meses de los cuatrimestres
function crearMeses() {
    // Primer cuatrimestre
    meses.push(
        new Mes(sueldoPrimerCuatrimestre, alquilerPrimeraMitad, comidaPrimeraMitad, cuentas, empleados, "enero"),
        new Mes(sueldoPrimerCuatrimestre, alquilerPrimeraMitad, comidaPrimeraMitad, cuentas, empleados, "febrero"),
        new Mes(sueldoPrimerCuatrimestre, alquilerPrimeraMitad, comidaPrimeraMitad, cuentas, empleados, "marzo"),

    );

    // Segundo cuatrimestre
    meses.push(
        new Mes(sueldoSegundoCuatrimestre, alquilerPrimeraMitad, comidaPrimeraMitad, cuentas, empleados, "abril"),
        new Mes(sueldoSegundoCuatrimestre, alquilerPrimeraMitad, comidaPrimeraMitad, cuentas, empleados, "mayo"),
        new Mes(sueldoSegundoCuatrimestre, alquilerPrimeraMitad, comidaPrimeraMitad, cuentas, empleados, "junio"),

    );

    // Tercer cuatrimestre
    meses.push(
        new Mes(sueldoTercerCuatrimestre, alquilerSegundaMitad, comidaSegundaMitad, cuentas, empleados, "julio"),
        new Mes(sueldoTercerCuatrimestre, alquilerSegundaMitad, comidaSegundaMitad, cuentas, empleados, "agosto"),
        new Mes(sueldoTercerCuatrimestre, alquilerSegundaMitad, comidaSegundaMitad, cuentas, empleados, "septiembre"),

    );

    // Cuarto cuatrimestre
    meses.push(
        new Mes(sueldoCuartoCuatrimestre, alquilerSegundaMitad, comidaSegundaMitad, cuentas, gastosVariables, "octubre"),
        new Mes(sueldoCuartoCuatrimestre, alquilerSegundaMitad, comidaSegundaMitad, cuentas, gastosVariables, "noviembre"),
        new Mes(sueldoCuartoCuatrimestre, alquilerSegundaMitad, comidaSegundaMitad, cuentas, gastosVariables, "diciembre"),
    );
}

// Buscar meses segun el sueldo
function buscarMeses(ganancia, valor) {
    return meses.filter(mes => mes.ingreso >= valor);
}

// Calcular los gastos totales de un mes
function calcularGastos(mes) {
    const { alquiler, comida, cuentas, empleados } = mes.egresos;
    return alquiler + comida + cuentas + empleados;
}

// Llamar a la funcion para crear los meses
crearMeses();

// Ejemplo de buscarMeses
const mesesSueldo200000 = buscarMeses("ganancia", 1210000);
console.log("Meses con ganancia de 1200000 o más:", mesesganacias1200000);

// Ejemplo de calcularGastos para un mes especifico, en este caso enero
const gastosEnero = calcularGastos(meses[0]);
console.log("Gastos totales de enero:", gastosEnero);

function diferenciaCuatrimestre(mesesCuatrimestre) {
    let ingresosTotal = mesesCuatrimestre.reduce((total, mes) => total + mes.ingreso, 0);
    let egresosTotal = mesesCuatrimestre.reduce((total, mes) => total + calcularGastos(mes), 0);
    return ingresosTotal - egresosTotal;
}

// Diferencia de los cuatrimestres
const primerCuatrimestre = meses.slice(0, 3);
const diferenciaPrimerCuatrimestre = diferenciaCuatrimestre(primerCuatrimestre);
console.log("Diferencia del primer cuatrimestre:", diferenciaPrimerCuatrimestre);

const segundoCuatrimestre = meses.slice(3, 6);
const diferenciaSegundoCuatrimestre = diferenciaCuatrimestre(segundoCuatrimestre);
console.log("Diferencia del segundo cuatrimestre:", diferenciaSegundoCuatrimestre);

const tercerCuatrimestre = meses.slice(6, 9);
const diferenciaTercerCuatrimestre = diferenciaCuatrimestre(tercerCuatrimestre);
console.log("Diferencia del tercer cuatrimestre:", diferenciaTercerCuatrimestre);

const cuartoCuatrimestre = meses.slice(9, 12);
const diferenciaCuartoCuatrimestre = diferenciaCuatrimestre(cuartoCuatrimestre);
console.log("Diferencia del cuarto cuatrimestre:", diferenciaCuartoCuatrimestre);

// Diferencia de cada mes
meses.forEach(mes => {
    const diferenciaMes = mes.calcularDiferencia();
    console.log(`Diferencia de ${mes.mes}:`, diferenciaMes);
});