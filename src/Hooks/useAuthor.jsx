import { useState} from 'react';
import AuthorService from '../Services/AuthorService';
import useValidation from './useValidation';

const useAuthor= ()=> {
    
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errors, setErrors]= useState(null)
    const {validateAuthor} = useValidation();
  
    
      async function getAuthors (namesOnly = false) {
          setLoading(true);
          setErrors(null);
          
          try {
  
              const response = await AuthorService.getAuthors();
              const data= response.data;
              if (!data.success) {
                  setError(data.message)
                  setLoading(false)
                  return
              }
            setAuthors(data.data);
          } catch (err) {
              
            setError(err);
          } finally {
              
            setLoading(false);
           }
      }
  
      async function createAuthor(data) {
          setErrors(null);
          const validationErrors = validateAuthor(data);
      
          if (Object.keys(validationErrors).length > 0) {
              setErrors(validationErrors);
              return { success: false };
          }
      
          try {
              const response = await AuthorService.create(data);
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
  
      async function deleteAuthor(id) {
          try{
              const response = await AuthorService.delete(id);
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
  
      async function updateAuthor(data){
          try{
              const response = await AuthorService.update(id);
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

    
}