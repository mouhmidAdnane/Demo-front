import {useState} from 'react';
import UserService from '../Services/UserService';
import { defaultRessourcesPerPage } from '../Utils/Variables';
import useValidation from './useValidation';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [errors, setErrors]= useState(null)
  const {validateRegisterData, validateUpdateData} = useValidation();


    async function getUsers (page=1, perPage= defaultRessourcesPerPage) {
        setLoading(true);
        setErrors(null);
        try {

            const response = await UserService.getUsersPage(page, perPage);
            const data= response.data;
            const headers = response.headers;

            if (!data.success) {
                setError(data.message)
                setLoading(false)
                return
            }

            setUsers(data.data);
            
            setMetadata({
                total: headers['x-total-count'],
                currentPage:headers['x-current-page'],
                lastPage:headers['x-last-page'],
                perPage:headers['x-per-page'],
                from: headers['x-from'],
                to: headers['x-to'],
            });
          
        } catch (err) {

          setError(err);
        } finally {
            
          setLoading(false);
         }
    }

    async function deleteUser(id) {
        try{
            const response = await UserService.delete(id);
            if (!response.data.success) {
                setError(response.data.message)
                return {
                    success: false
                }
            }

        }catch(error){
            setError(error);
        }
    }

    async function createUser(data) {
        setErrors(null);
    
        const validationErrors = validateRegisterData(data);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { success: false };
        }
    
        try {
            const response = await UserService.create(data);
            if (!response.data.success) {
                setError(response.data.message);
                return { success: false };
            }
            return { success: true };
        } catch (error) {
            setError(error);
            return { success: false };
        }
    }

    async function updateUser(id, data) {

        setErrors(null);

        for(const [key, value] of Object.entries(data)) {
            if(value === '') {
                delete data[key];
            }
        }
    
        const validationErrors = validateUpdateData(data);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { success: false };
        }
    
        try {
            const response = await UserService.update(id,data);
            if (!response.data.success) {
                setError(response.data.message);
                return { success: false };
            }
            return { success: true };
        } catch (error) {
            setError(error);
            return { success: false };
        }
    }
  
  
  
    return {getUsers,deleteUser, createUser , updateUser,  users, setUsers ,loading, error,errors, metadata };
        
}
export default useUser;
