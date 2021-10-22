import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//i split them up because the code was getting long. 
// since we are not fetching at the beginning it will be false 
const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

// here im creating a wrapper for my context
// allows me to dispatch without having to callback later KEKW 
export const AuthContextProvider = ({ children }) => {
  // the children in this case is in index.js i wrapped my whole App in the AuthContext
  // so essentially how this is going to work now is that 
  // 1. user login 2. reducer (update state) 3. the new state will turn the isFetching to true which then fetches the current user
  // 2. if the userlogin is wrong then the state will instead return the error 
  // 3. the order of this is in auth actions 
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
