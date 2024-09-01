import { useState} from 'react';
import RoleService from '../Services/RoleService';
import useValidation from './useValidation';

const useUser = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors]= useState(null)
  const {validateRoleData} = useValidation();


    async function getRoles (namesOnly = false) {
        setLoading(true);
        setErrors(null);

        namesOnly= namesOnly === true ? true : false;
        
        try {

            const response = await RoleService.getRoles(namesOnly);
            const data= response.data;
            if (!data.success) {
                setError(data.message)
                setLoading(false)
                return
            }
          setRoles(data.data);
        } catch (err) {
            
          setError(err);
        } finally {
            
          setLoading(false);
         }
    }

    async function createRole(data) {
        setErrors(null);
        const validationErrors = validateRoleData(data);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { success: false };
        }
    
        try {
            const response = await RoleService.create(data);
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

    async function deleteRole(id) {
        try{
            const response = await RoleService.delete(id);
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

    async function updateRole(data){
        try{
            const response = await RoleService.update(id);
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

    // async function deleteUser(id) {
    //     try{
    //         const response = await UserService.delete(id);
    //         if (!response.data.success) {
    //             setError(response.data.message)
    //             return {
    //                 success: false
    //             }
    //         }

    //     }catch(error){
    //         setError(error);
    //     }
    // }

    // async function createUser(data) {
    //     setErrors(null);
    
    //     const validationErrors = validateRegisterData(data);
    
    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return { success: false };
    //     }
    
    //     try {
    //         const response = await UserService.create(data);
    //         if (!response.data.success) {
    //             setError(response.data.message);
    //             return { success: false };
    //         }
    //         return { success: true };
    //     } catch (error) {
    //         setError(error);
    //         return { success: false };
    //     }
    // }
  
  
  
    return {getRoles, updateRole , deleteRole , roles, setRoles , createRole,loading, error, setErrors, errors };
        
}
export default useUser;
