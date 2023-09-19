const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnBotellas = document.querySelector('.botellas');
const btnLatas = document.querySelector('.latas');
const btnVasos = document.querySelector('.vasos');
const btnGrowlers = document.querySelector('.growlers');
const contenedorCervezas = document.querySelector('.cervezas');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    cervezas();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');


    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{

    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const cervezas = () =>{
    let cervezasArreglo = [];
    const cervezas = document.querySelectorAll('.cervezas');

    cervezas.forEach(cervezas=> cervezasArreglo = [...cervezasArreglo,cervezas]);

    const botellas = cervezasArreglo.filter(botellas=> botellas.getAttribute('data-cervezas') === 'botellas');
    const latas = cervezasArreglo.filter(latas => latas.getAttribute('data-cervezas') === 'latas');
    const vasos = cervezasArreglo.filter(vasos => vasos.getAttribute('data-cervezas') === 'vasos');
    const growlers = cervezasArreglo.filter(growlers=> growlers.getAttribute('data-cervezas') === 'growlers');

    mostrarCervezas(botellas, latas, vasos, growlers, cervezasArreglo);

}

const mostrarCervezas = (botellas, latas, vasos, growlers, ) =>{
    btnBotellas.addEventListener('click', ()=>{
        limpiarHtml(contenedorCervezas);
        botellas.forEach(botellas=> contenedorCervezas.appendChild(botellas));
    });

    btnLatas.addEventListener('click', ()=>{
        limpiarHtml(contenedorCervezas);
        latas.forEach(latas=> contenedorCervezas.appendChild(latas));
    });

    btnVasos.addEventListener('click', ()=>{
        limpiarHtml(contenedorCervezas);
    vasos.forEach(vasos=> contenedorCervezas.appendChild(vasos));
    });
    btnGrowlers.addEventListener('click', ()=>{
        limpiarHtml(contenedorCervezas);
        growlers.forEach(growlers=> contenedorCervezas.appendChild(growlers));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorCervezas);
        todos.forEach(todos=> contenedorCervezas.appendChild(todos));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}