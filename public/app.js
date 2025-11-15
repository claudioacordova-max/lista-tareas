//llamadas api

async function getTareas() {
  const response = await fetch("https://lista-tareas-42fh.onrender.com/tareas");
  const data = await response.json();
  return data;
}

async function postTarea(tarea) {
  const response = await fetch("https://lista-tareas-42fh.onrender.com/tarea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarea),
  });
  const data = response.json();
  return data;
}

async function putTarea(id, color) {
  const response = await fetch(
    `https://lista-tareas-42fh.onrender.com/tarea/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    }
  );
  const data = response.json();
  return data;
}

async function deleteTarea(id) {
  const response = await fetch(
    `https://lista-tareas-42fh.onrender.com/tarea/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = response.json();
  return data;
}

//crear elementos del DOM

function mostrarTarea(data) {
  const contenedor = document.getElementById("to-do-container"); //llamar al contenedor

  //crear elementos
  const nuevaTarea = document.createElement("article");
  const contenedorTexto = document.createElement("div");
  const contenedorBoton = document.createElement("div");
  const titulo = document.createElement("h2");
  const texto = document.createElement("p");
  const boton = document.createElement("button");

  //Darle  el contenido a los elementos
  titulo.textContent = data["nombre"];
  texto.textContent = data["descripcion"];
  boton.textContent = "Borrar";

  nuevaTarea.classList.add(data["color"]); //darler como clase el color de db

  //darle intertaccion al boton borrar, event.stopPropagation() permite no activar el cambio de color
  boton.addEventListener("click", async function (event) {
    event.stopPropagation();
    await deleteTarea(data["id"]);
    nuevaTarea.remove();
    alert("Tarea borrada con exito.");
  });

  //cambiar de color la tarea al hacer click
  nuevaTarea.addEventListener("click", async function (event) {
    await cambiaColor(event, data["id"]);
    alert("La tarea tiene un nuevo color.");
  });

  //agregar los elementos al DOM
  contenedorTexto.appendChild(titulo);
  contenedorTexto.appendChild(texto);
  contenedorBoton.appendChild(boton);
  nuevaTarea.appendChild(contenedorTexto);
  nuevaTarea.appendChild(contenedorBoton);
  contenedor.appendChild(nuevaTarea);
}

//funciones de los botones

async function cambiaColor(event, id) {
  const elemento = event.currentTarget;
  if (elemento.classList.contains("color1")) {
    await putTarea(id, "color2");
    elemento.classList.replace("color1", "color2");
  } else if (elemento.classList.contains("color2")) {
    await putTarea(id, "color3");
    elemento.classList.replace("color2", "color3");
  } else if (elemento.classList.contains("color3")) {
    await putTarea(id, "color4");
    elemento.classList.replace("color3", "color4");
  } else {
    await putTarea(id, "color1");
    elemento.classList.replace("color4", "color1");
  }
}

//boton crear

function botonCrear() {
  const datosFormulario = {
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    color: "color1",
  };
  if (tarea.nombre && tarea.descripcion) {
    limpiar();
    postTarea(datosFormulario).then((tareas) => {
      for (tarea of tareas) {
        mostrarTarea(tarea);
      }
    });
    alert("Nueva tarea creada con exito.");
  } else {
    alert("Ingrasa un nombre y una descripcion");
  }
}

function limpiar() {
  const contenedor = document.getElementById("to-do-container");
  contenedor.innerHTML = "";
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
}
document.getElementById("crear").addEventListener("click", botonCrear);

//mostar todas las tareas de la DB en la web
getTareas().then((tareas) => {
  for (tarea of tareas) {
    mostrarTarea(tarea);
  }
});
