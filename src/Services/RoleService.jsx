import axios from "axios"
import { base_url } from "../Utils/Variables"
import { getToken } from "../Utils/AuthUtils";

const RoleService = {
    
    getRoles: async (namesOnly= false) => {
            const token = getToken();
            const query= namesOnly ? `?names_only=${namesOnly}` : '';

            const response = await axios.get(`${base_url}/roles${query}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});

            return response;
    }, 

    create: async(data)=>{
            const token = getToken();
            const response = await axios.post(`${base_url}/roles`, data,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }});
            return response;
    },

    delete: async(id)=>{
        const token = getToken();
        const response = await axios.delete(`${base_url}/roles/${id}`,  {
            headers: {
                'Authorization': `Bearer ${token}`,
            }});
        return response;
    },

    update: async (id,data)=>{
        const token = getToken();
        const response = await axios.patch(`${base_url}/roles/${id}`, data,  {
            headers: {
                'Authorization': `Bearer ${token}`,
            }});
        return response;
    }

    
}
    
export default RoleService;