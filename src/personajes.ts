import { filtarPersonajes, obtenerPersonajes } from "./personajes.api";
import { Personajes } from "./personajes.modelo";

const botonFiltrar = document.getElementById("filtrar")

const crearElementoImagen = (foto: string, nombre: string) : HTMLImageElement => {
    const imagen = document.createElement("img");
    imagen.src = foto;
    imagen.alt = nombre;
    return imagen;
};

const crearParrafo = (titulo:string, texto: string) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = `${titulo}: ${texto}`;
    return parrafo;
}

const crearContenedorPersonaje = (personaje : Personajes) => {
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-personaje");

    const imagenURL = `http://localhost:3000/${personaje.imagen}`;
    const imagen = crearElementoImagen(imagenURL, personaje.nombre);
    contenedor.appendChild(imagen);

    const nombre = crearParrafo("Nombre", personaje.nombre);
    contenedor.appendChild(nombre);

    const especialidad = crearParrafo("Especialidad",personaje.especialidad);
    contenedor.appendChild(especialidad);

    const habilidadesString = personaje.habilidades.toString()
    const habilidades = crearParrafo("Habilidades",habilidadesString);
    contenedor.appendChild(habilidades);

    return contenedor
}

const personajesBucle = (personajes:Personajes[], listadoPersonajes:HTMLDivElement) => {
    personajes.forEach((personaje) => {
        const contenedorPersonaje = crearContenedorPersonaje(personaje)
        listadoPersonajes.appendChild(contenedorPersonaje)
    });
}

const pintarPersonajes = async (personajes: Personajes[]) => {
    const listadoPersonajes = document.getElementById("lista-personajes")

    if(listadoPersonajes && listadoPersonajes instanceof HTMLDivElement) {
        listadoPersonajes.innerText = ""
        personajesBucle(personajes, listadoPersonajes)
    } else {
        throw new Error("No se han podido mostrar los personajes");   
    }
}

const sacarDatosInput = () :string => {
    const input = document.getElementById("inputFiltrar")
    if(input && input instanceof HTMLInputElement) {
        return input.value
    } else {
        throw new Error("No se han podido obtener los datos")
    }
}


if(botonFiltrar && botonFiltrar instanceof HTMLButtonElement) {
    botonFiltrar.addEventListener("click", async () => {
        const datosInput = sacarDatosInput()
        const personajesFiltrados = await filtarPersonajes(datosInput)
        pintarPersonajes(personajesFiltrados)
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    const personajes = await obtenerPersonajes()
    pintarPersonajes(personajes)
})