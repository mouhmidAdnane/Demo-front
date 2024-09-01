import axios from "axios"
import { base_url } from "../Utils/Variables"
import { getToken } from "../Utils/AuthUtils";

const AuthorService = {
    
    getAuthors: async (namesOnly= false) => {
            const token = getToken();

            const response = await axios.get(`${base_url}/authors`,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});

            return response;
    }, 

    create: async(data)=>{
            const token = getToken();
            const response = await axios.post(`${base_url}/authors`, data,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});
            return response;
    },

    delete: async(id)=>{
        const token = getToken();
        const response = await axios.delete(`${base_url}/authors/${id}`,  {
            headers: {
                'Authorization': `Bearer ${token}`,
            }});
        return response;
    },

    update: async (id,data)=>{
        const token = getToken();
        const response = await axios.patch(`${base_url}/authors/${id}`, data,  {
            headers: {
                'Authorization': `Bearer ${token}`,
            }});
        return response;
    }

    
}
    
export default AuthorService;