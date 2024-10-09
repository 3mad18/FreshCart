import { json } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";
export let UserContext = createContext(null);

export function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  const [userId, setUserId] = useState(null);

  function decodeToken() {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const data = jwtDecode(token);
        setUserId(data.id);
        console.log("Decoded data => ", data);
        return data;
      } catch (error) {
        console.error("Error decoding token", error);
        return null;
      }
    }
    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserLogin(token); 
      const decoded = decodeToken(); 
      if (decoded) {
        setUserId(decoded.id);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, decodeToken, userId }}>
      {props.children}
    </UserContext.Provider>
  );
}
