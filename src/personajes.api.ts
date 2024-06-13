import Axios from "axios";
import { Personajes } from "./personajes.modelo"

export const obtenerPersonajes = async () :Promise<Personajes[]> => {
    try {
        const listadoPersonajes = await Axios.get("http://localhost:3000/personajes")
        return listadoPersonajes.data
    } catch(error) {
        throw new Error("No se ha podido obtener el listado de personajes")
    } 
}

export const filtarPersonajes = async (contenidoInput: string) => {
    const personajesFiltrados:Personajes[] = []
    const personajes:Personajes[] = await obtenerPersonajes()

    personajes.forEach((personaje) => {
        if(personaje.nombre.includes(contenidoInput)) {
            personajesFiltrados.push(personaje)
        }
    })
    return personajesFiltrados
}

