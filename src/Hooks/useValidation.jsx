import { useState } from 'react';
import { checkEmail, checkPassword, checkPhone, checkName, checkMissingData, checkPasswordConfirmation } from '../Utils/AuthUtils';

export default function useValidation(){
  const [errors, setErrors] = useState({});

  
  const validateRoleData = (data) => {
    let newErrors= {};
    if (!data.name || data.name.trim().length === 0) {
      errors.name = 'Name is required.';
    } else if (data.name.length > 125) {
      errors.name = 'Name cannot exceed 125 characters.';
    }
  
    // Validate description
    if (data.description.length > 511) {
      errors.description = 'Description cannot exceed 511 characters.';
    }
  
    return errors;
    
  }
  const validateLoginData= (data)=>{
    let newErrors = {};
    const missingFields = checkMissingData(data);
    missingFields.forEach(field => {
      newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });

    if (!newErrors.email) {
      const emailError = checkEmail(data.email);
      if (emailError) newErrors.email = emailError;
    }

    return newErrors;
  }

  const validateRegisterData = (data) => {
    let newErrors = {};

    const missingFields = checkMissingData(data);
    missingFields.forEach(field => {
      newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });

    if (!newErrors.email) {
      const emailError = checkEmail(data.email);
      if (emailError) newErrors.email = emailError;
    }

    if (!newErrors.password) {
      const passwordError = checkPassword(data.password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (!newErrors.phone) {
      const phoneError = checkPhone(data.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (!newErrors.first_name) {
      const firstNameError = checkName(data.first_name);
      if (firstNameError) newErrors.first_name = firstNameError;
    }

    if (!newErrors.last_name) {
      const lastNameError = checkName(data.last_name);
      if (lastNameError) newErrors.last_name = lastNameError;
    }
    if (!newErrors.c_Password) {
      const cPasswordError = checkPasswordConfirmation(data.password, data.c_password);
      if (cPasswordError) newErrors.c_password = cPasswordError;
    }

    return newErrors;
  };


  const validateUpdateData = (data) => {
    let newErrors = {};

    if (data.email &&!newErrors.email) {
      const emailError = checkEmail(data.email);
      if (emailError) newErrors.email = emailError;
    }

    if (data.password && !newErrors.password) {
      const passwordError = checkPassword(data.password);
      if (passwordError) newErrors.password = passwordError;

      if (data.c_password && !newErrors.c_Password) {
        const cPasswordError = checkPasswordConfirmation(data.password, data.c_password);
        if (cPasswordError) newErrors.c_password = cPasswordError;
      }
    }

    if (data.phone && !newErrors.phone) {
      const phoneError = checkPhone(data.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (data.first_name && !newErrors.first_name) {
      const firstNameError = checkName(data.first_name);
      if (firstNameError) newErrors.first_name = firstNameError;
    }

    if (data.last_name && !newErrors.last_name) {
      const lastNameError = checkName(data.last_name);
      if (lastNameError) newErrors.last_name = lastNameError;
    }
    

    return newErrors;
  };

  const validateAuthor= (data) => {
    let newErrors = {};

    const missingFields = checkMissingData(data);
    if (missingFields.includes('first_name') || missingFields.includes('last_name')){
      missingFields.forEach(field => {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      });
    }

    if (data.first_name && !newErrors.first_name) {
      const firstNameError = checkName(data.first_name);
      if (firstNameError) newErrors.first_name = firstNameError;
    }

    if (data.last_name && !newErrors.last_name) {
      const lastNameError = checkName(data.last_name);
      if (lastNameError) newErrors.last_name = lastNameError;
    }

    return newErrors;


  }




  return {
    errors,
    validateRegisterData, 
    validateLoginData,
    validateRoleData,
    validateUpdateData, 
    validateAuthor
  };
};
