import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../Services/AuthService";
import useValidation from './useValidation';
import {storeToken} from "../Utils/AuthUtils";
import { useAuthContext } from '../Context/AuthProvider';
import { jwtDecode } from 'jwt-decode';


export default function useAuth() {

    const navigate = useNavigate();
    const {setUser, setUserRoles, setPermissions} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const {validateRegisterData, validateLoginData}= useValidation();


    const login = async (data) => {
        setLoading(true);
        setErrors(null);

        const validationErrors = validateLoginData(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }
        
        try {
            const loginData = await AuthService.login(data);
            if (!loginData || !loginData.success) {
                const errorMessage= loginData.message ? loginData.message : "Failed to login. Please try again.";
                setErrors({message: errorMessage});
                setLoading(false);
                return;
            }

            setUser(loginData.user);
            setUserRoles(loginData.roles);
            // setPermissions(loginData.permissions);
            // storeToken(loginData.token);
            navigate('/users');

        } catch (error) {
            setErrors(error.response ? error.response.data.message : 'Network error');
        } finally {
            setLoading(false);
        }
    }

    const  register=  async (data)=>{
        setErrors(null);
        setLoading(true);
        try{
            const validationErrors = validateRegisterData(data);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setLoading(false);
                return;
            }
            const registerData= await AuthService.register(data);

            if (!registerData.success) {
                setErrors(registerData?.message ? registerData.message : "Failed to login. Please try again.");
                setLoading(false);
                return;
            }
            setUser(registerData.user);
            storeToken(registerData.token);
            setLoading(false);
            navigate('/users');

        }catch(error){
            throw error;
        }
    }

    return {
        // user,
        loading,
        errors,
        login,
        register
    }
  
}
