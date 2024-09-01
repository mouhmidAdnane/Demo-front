import axios from "axios"
import { base_url, defaultRessourcesPerPage } from "../Utils/Variables"
import { getToken } from "../Utils/AuthUtils";

// axios.defaults.withCredentials = true;
const UserService = {


    getUsersPage: async (page = 1, per_page = defaultRessourcesPerPage) => {
        try {
            // const token = getToken();
            const response = await axios.get(`${base_url}/users?page=${page}&per_page=${per_page}`,  {
                // headers: {
                //     'Authorization': `Bearer ${token}`,
                //     'Accept': 'application/json'
                // },
                withCredentials: true,
                // credentials: 'include'
            });
            return response;
        } catch (error) {
            throw error;
        }
    }, 

    delete: async (id)=>{
        try {
            const token = getToken();
            const response = await axios.delete(`${base_url}/users/${id}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});
            return response;
        } catch (error) {
            throw error;
        }
    },

    create: async(data)=>{
        try {
            const token = getToken();
            const response = await axios.post(`${base_url}/users`, data,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});
            return response;
        } catch (error) {
            throw error;
        }
    },
    update: async(id,data)=>{
        try {
            const token = getToken();
            const response = await axios.patch(`${base_url}/users/${id}`, data,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});
                debugger
            return response;
        } catch (error) {
            debugger
            throw error;
        }
    }


        
   
    
}
    
export default UserService;