//Recibir Datos
document.getElementById("formTareas").addEventListener("submit",guardarTarea);

//Obtenemos el textarea y le ejecutamos una function - Funcion Click Enter
document.getElementById("descripcion-tarea").addEventListener("keypress", function(event){
    if(event.which === 13) { 
        guardarTarea(event);
    }
});

//Función
function guardarTarea(event){
    event.preventDefault();
    //alert("Tarea Agregada");
    let titulo = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion-tarea").value;
    let datepicker = $('#datepicker').val();
    let id = localStorage.getItem("contador") ? localStorage.getItem("contador"):1;

    //Validamos que los campos no se encuentra vacios
    if (titulo.trim() != '' && descripcion.trim() != '' && datepicker.trim() != '') {
        //Datos a Objetos
        const tarea = {
            id: id++,
            titulo,
            descripcion,
            datepicker
        };

        //Almacenar Datos
        if (localStorage.getItem("tareas") === null) {
            let tareas = [];
            tareas.push (tarea);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            localStorage.setItem("contador", 1);
        } else {
            let tareas = JSON.parse(localStorage.getItem("tareas"));
            tareas.push(tarea);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            localStorage.setItem("contador", id);
        }

        //Animaciones
        document.getElementById("formTareas").reset();
        $("#tareas").append(`<div class="card display-none" id="tarjeta${id}">
            <div class="card-body">
                    <p>${titulo}</p>
                    <p>${descripcion}</p>
                    <p>Fecha: ${datepicker}</p>
                    <a class="btn btn-success" onclick="borrarTarea('${id}')">Completada</a>
                </div>
            </div>`);
            
        $("#tarjeta"+id).fadeIn(700);
    } else {
        alert("Algunos campos se encuentran vacios");
    }
}

//Funcion
function recibirTarea(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    let vistaTareas = document.getElementById("tareas");
    
    vistaTareas.innerHTML = "";

    //Agregar Tareas en HTML
    for(let i =0; i < tareas.length; i++) {
        let titulo = tareas[i].titulo;
        let descripcion = tareas[i].descripcion;
        let datepicker = tareas[i].datepicker;
        let id = tareas[i].id;

        vistaTareas.innerHTML += `<div class="card" id="tarjeta${id}">
            <div class="card-body">
                <p>${titulo}</p>
                <p>${descripcion}</p>
                <p>Fecha: ${datepicker}</p>
                <a class="btn btn-success" onclick="borrarTarea('${id}')">Completada</a>
            </div>
        </div>`
    }
}

//Funcion Borrar
function borrarTarea(id){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    //Recorrer cada tarea
    for(let i =0; i< tareas.length; i++) {
        if (tareas[i].id == id) {
            tareas.splice(i, 1);
        }
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
    $("#tarjeta"+id).fadeOut(1000);
}

//Funcion Calendario - JQuery
$(function () {
    $("#datepicker").datepicker();
    $("#formContainer, #tareas").fadeIn(1000);
    recibirTarea();
});

//DarkMode
const cambioColor = document.getElementById("btn-darkmode");
cambioColor.addEventListener('click', checkMode);

function checkMode(){
    console.log('f')
    if(cambioColor.checked){
        darkmodeON();
    }
    else{
        darkmodeOff();
    }
}

function darkmodeON(){
    document.body.classList.add("dark-mode")
}

function darkmodeOff(){
    document.body.classList.remove("dark-mode")
}


