const formulario = document.getElementById('formulario-calculadora'); 
formulario.addEventListener('submit', (event) =>{
    event.preventDefault();
    aparecerResultado();
    const nombreCompleto = document.getElementById('nombre').value;
    const tipoDoc = document.getElementById('document');
    const documentoSeleccionado = tipoDoc.options[tipoDoc.selectedIndex];
    const valorDocumento = documentoSeleccionado.value;
    const numDoc = document.getElementById('numDoc').value;
    const edad = document.getElementById('edad').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const selectActividad = document.getElementById('actividad');
    const opcionSeleccionada = selectActividad.selectedOptions[0];
    const valorSeleccionado = opcionSeleccionada.value;
    const radiosGenero = document.getElementsByName('genero');
    let generoSeleccionado = "";
    for (const radio of radiosGenero) {
      if (radio.checked) {
        generoSeleccionado = radio.value;
        break;
      }
    }
    if(!(edad&&peso&&altura)){
        mostrarMensajeDeError('Por favor completar todos los campos')
        return
    }
    let poblacion = "";
    if(edad >= 15 && edad <= 29){
        poblacion = "jovenes";
    }else if(edad >= 30 && edad <= 59){
        poblacion = "adultos"
    }else if(edad >= 60){
        poblacion = "adultos mayores"
    }
    console.log(nombreCompleto);
    console.log(valorDocumento);
    console.log(numDoc);
    console.log(edad);
    console.log(peso);
    console.log(altura);
    console.log(valorSeleccionado);
    console.log(generoSeleccionado);
    let calFin = calcularCalorias(edad, peso, altura, valorSeleccionado, generoSeleccionado);
    console.log(calFin);
    resultado.innerHTML = `
    <div class="card-body flex-colum align-items-center h-100" style="margin-top:50%" id="calculo">
    <div class="card-title">
        <h4 class="text-center">Calorías requeridas</h4>
    </div>    
        <div class="card-text" style="margin-top: 1rem; width: 100%; height: auto;">
            <p class="form-control text-center" style="font-size: 1rem "> El paciente ${nombreCompleto} identificado con ${valorDocumento}
            No. ${numDoc},perteneciente al grupo poblacional de los ${poblacion}, requiere un total de ${Math.floor(calFin)} Kcal
            para el sostenimiento de su TBM
        </p>
        </div>
    </div>
    `
});

function calcularCalorias(edad, peso, altura, actividad, genero) {
    let indice = null;
    if(genero == 'M'){
        indice = actividad * ((10 * peso) + (6.25 * altura) - (5 * edad)) + 5;
    }else if(genero == 'F'){
        indice = actividad * ((10 * peso) + (6.25 * altura) - (5 * edad)) - 161;
    }else{
        return "es rar@";
    }
    return indice;
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
