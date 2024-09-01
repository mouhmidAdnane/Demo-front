import axios from "axios"
import { base_url } from "../Utils/Variables"


// axios.defaults.withCredentials = true;
const AuthService = {
    login: async (data) => {
        // try{
            const response= await axios.post(`${base_url}/login`,data, {
                withCredentials: true,
                // credentials: 'include'
            })

            return response.data;
        // }catch(error){
        //     throw error;
        // }
    },
    register: async ( data) => {
        // try{
            const response= await axios.post(`${base_url}/register`, data) 
            return response.data;
        // }catch(error){
        //     throw error;
        // }
    },
    logout: async () => {
        // try{
            const logoutStatus= await axios.post(`${base_url}/logout`)
            return response;
        // }catch(error){
        //     throw error;
        // }
        

    }
    
}
    
export default AuthService;