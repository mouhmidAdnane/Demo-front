export function storeToken(token) {
    localStorage.setItem('token', token)
}

export function getToken(){
    return localStorage.getItem('token');
}


export const checkMissingData= (data) => {
    const missingProps =Object.keys(data).filter(key => data[key]?.length === 0);
    return missingProps;
}


export function checkPhone(phone) {
    if(!/^\d{10,15}$/.test(phone))
        return 'Invalid phone format'      
}


export function checkEmail(email){
    if(!/\S+@\S+\.\S+/.test(email))
        return 'Invalid email format'      
}

export function checkPassword(password){

    if (password.length < 8) 
        return 'Password must be at least 8 characters'
      
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password))
        return 'Password must include uppercase, lowercase, number, and special character'
       

}

export function checkName(name){
    if(name.length>50)
        return 'Name must be less than 50 characters'
}


export function checkPasswordConfirmation(password, c_password){
    if(password!==c_password)
        return 'Passwords do not match'
} 
// export function validateLogin(email, password) {
//     let errors = {};
//     errors.email= checkEmail(email);
//     // if(!errors.email)
//     //     errors.password= checkPassword(password);
//     return errors;
// }

export default { storeToken };