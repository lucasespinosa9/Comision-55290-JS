//Selección los elementos del DOM
const contenedor = document.querySelector(".contenedor")
const busqueda = document.querySelector(".cuadroBusqueda button")
const cuadroClima = document.querySelector(".cuadroClima")
const detallesClima = document.querySelector(".detallesClima")
const err404 = document.querySelector(".notFound")

//Varible para la tostada anterior
let tostadaPrevia = null;

//Objeto para las tostadas
const tostadaEnComun = {
    duration: 3500,
    destination: "https://openweathermap.org/",
    newWindow: true,
    className: "toastifyClase",
    stopOnFocus: true,
    style: {
        position: "fixed",
        bottom: "0",
        left: "50%",
        color: "#ffff",
        fontFamily: "sans-serif",
        fontSize: "1.5rem",
        background: "#4C4D33",
        fontWeight: "500",
        padding: "1rem",
        borderRadius: "16px",
        margin: "2rem",
        top: "51rem",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
    },
    onClick: function () { },
};

//Traducción de las descripciones del clima.
const descripcionEspañol = {
    "Clear": "Despejado",
    "Rain": "Lluvia",
    "Snow": "Nieve",
    "Clouds": "Nublado",
    "Haze": "Neblina",
    "Mist": "Neblina",
    "Thunderstorm": "Tormenta eléctrica",
    "Smoke": "Smog"
};

//Evento click al botón de búsqueda
busqueda.addEventListener("click", () => {
    const APIKey = "302f5c28f14f615bc8c8928d9b7dcbf8"
    const ciudad = document.querySelector(".cuadroBusqueda input").value

    if (ciudad === "")
        return

//Ocultar la tostada previa.
    if (tostadaPrevia) {
        tostadaPrevia.hideToast();
    }

//API del clima.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKey}`)
        .then(response => response.json()).then(json => {

//Manejo de errores.
            if (json.cod === "404") {
                contenedor.style.height = "560px";
                cuadroClima.style.display = "none";
                detallesClima.style.display = "none";
                err404.style.display = "block";
                err404.classList.add("fadeIn");
                tostadaPrevia = Toastify({
                    text: "¡Intenta otra vez!",
                    ...tostadaEnComun,
                }).showToast();
                return;
            }

            err404.style.display = "none"
            err404.classList.remove("fadeIn")

            const img = document.querySelector(".cuadroClima img")
            const temperatura = document.querySelector(".cuadroClima .temperatura")
            const descripcion = document.querySelector(".cuadroClima .descripcion")
            const humedad = document.querySelector(".detallesClima .humedad span")
            const viento = document.querySelector(".detallesClima .viento span")

//API de zona horaria.
            fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=DORTG5OB4IMR&format=json&by=position&lat=${json.coord.lat}&lng=${json.coord.lon}`)
                .then(response => response.json())
                .then(timezoneData => {
                    const horaCiudad = new Date(timezoneData.formatted).getHours();
                    const noche = horaCiudad >= 20 || horaCiudad <= 6;

//Cambiar imagen según el clima y la hora.
                    switch (json.weather[0].main) {
                        case "Clear":
                            if (noche) {
                                img.src = "img/moon.png";
                            } else {
                                img.src = "img/clear.png";
                            }
                            break;

                        case "Rain":
                            img.src = "img/rain.png";
                            break;

                        case "Thunderstorm":
                            img.src = "img/thunderstorm.png";
                            break;

                        case "Smoke":
                            img.src = "img/smog.png";
                            break;
                            
                        case "Snow":
                            img.src = "img/snow.png";
                            break;

                        case "Clouds":
                            if (noche) {
                                img.src = "img/moonWclouds.png";
                            } else {
                                img.src = "img/clouds.png";
                            }
                            break;

                        case "Haze":
                            img.src = "img/hazehazeMist.png";
                            break;
                        
                        case "Mist":
                            img.src = "img/hazeMist.png";
                            break;

                        default:
                            img.src = "";
                    }
                })
                .catch(error => {
                    console.error("Error al obtener la zona horaria:", error);
                });

//Mostrar clima en DOM
            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            const descripcionIngles = json.weather[0].main;
            const descripcionTraducida = descripcionEspañol[descripcionIngles] || descripcionIngles;

            descripcion.innerHTML = descripcionTraducida;
            humedad.innerHTML = `${json.main.humidity}%`
            viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`

            cuadroClima.style.display = ""
            detallesClima.style.display = ""
            cuadroClima.classList.add("fadeIn")
            detallesClima.classList.add("fadeIn")
            contenedor.style.height = "650px"

//Mensaje para la tostada
            let textoToast
            if (parseInt(json.main.temp) <= 20) {
                textoToast = "La temperatura es baja. ¡Abrígate!";
            } else {
                if (json.weather[0].main === "Rain") {
                    textoToast = "Está lloviendo. ¡Lleva un paraguas!";
                } else if (json.weather[0].main === "Thunderstorm") {
                    textoToast = "Hay tormenta. ¡Tené cuidado!";
                } else if(json.weather[0].main === "Smoke") {
                    textoToast = "Hay contaminación en el aire, usa barbijo.";
                } 
                else {
                    textoToast = "La temperatura es agradable. ¡Disfruta!";
                }
            }

            tostadaPrevia = Toastify({
                text: textoToast,
                ...tostadaEnComun,
            }).showToast();
        })
})