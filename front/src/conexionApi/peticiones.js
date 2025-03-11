import axios from "axios";

const API = "http://localhost:3000/api";

export const conexionRegistro = async (usuario)=>{
    return await axios.post(`${API}/registro`,usuario,{withCredentials:true});
}

export const conexionLogin = async (usuario) => {
    try {
        const respuesta = await axios.post(`${API}/login`, usuario, {
            withCredentials: true,  
        });
        return respuesta;
    } catch (error) {
        console.error("Error al iniciar sesión", error);
        throw error;
    }
};

export const conexionMostrar = async ()=>{
    return await axios.get(`${API}/mostrar`);
}

export const borrarPorId = async (id) => {
    try {
        const respuesta = await axios.delete(`${API}/borrarPorId/${id}`, {
            withCredentials: true,  
        });
        return respuesta;
    } catch (error) {
        console.error("Error al borrar usuario", error);
        throw error;
    }
};


export const actualizarPorId = async (id, datosActualizados) => {
    return await axios.put(`${API}/actualizarPorId/${id}`, datosActualizados);
}

export const conexionBuscarPorId = async (id) => {
    return await axios.get(`${API}/buscarPorId/${id}`);
};

export const conexionSalir = async () => {
    return await axios.get(`${API}/salir`,{withCredentials: true});
}

export const conexionUsuariosLogueados = async () => {
    try {
        const respuesta = await axios.get(`${API}/usuariosLogueados`, {
            withCredentials: true,  
        });
        return respuesta;
    } catch (error) {
        console.error("Error al obtener usuarios logueados", error);
        throw error;
    }
};

export const conexionAdministradores = async () => {
    try {
        const respuesta = await axios.get(`${API}/administradores`, {
            withCredentials: true,  
        });
        return respuesta;
    } catch (error) {
        console.error("Error al obtener administradores", error);
        throw error;
    }
};