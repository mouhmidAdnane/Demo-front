import { createContext, useState , useContext} from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  userRoles: [], 
  setuserRoles: () => {},
  permissions: [],
  setPermissions: () => {},
});



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  // const [roles, setRoles] = useState([]);
  // const [permissions, setPermissions] = useState([]);


  return (
    <AuthContext.Provider value={{ user , setUser, userRoles, setUserRoles, permissions, setPermissions}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuthContext };