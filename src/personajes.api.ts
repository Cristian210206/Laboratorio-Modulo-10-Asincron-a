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


