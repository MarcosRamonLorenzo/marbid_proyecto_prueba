import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  getUserDB,
  createUser,
} from "@/functions/authFunc";
import LoadingMarbidLoad from "@/components/shared-componentes/Loadings/LoadingMarbidLoad";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const userDefaultValue = null;
  const loginDefaultValue = false;

  const [currentUser, setCurrentUser] = useState(userDefaultValue);
  const [isLogin, setIsLogin] = useState(loginDefaultValue);
  const [loading, setLoading] = useState(true);

  const formObject = {
    email: "",
    password: "",
  };

  const [formUser, setFormUser] = useState(formObject);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const handleSubmitUser = async (e, action) => {
    e.preventDefault();
    try {
      if (action === "login") {
        await doSignInWithEmailAndPassword(formUser.email, formUser.password);
      } else {
        await doCreateUserWithEmailAndPassword(
          formUser.email,
          formUser.password
        );
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuthConnectionUser = async (user) => {
    const userDB = await getUserDB(user.uid);

    if (!userDB) {
      const newUserDB = await createUser({
        id: user.uid,
        email: user.email,
        name: user?.displayName || null,
        avatar_img: user?.photoURL || null,
      });
      setCurrentUser(user ,newUserDB); 
    } else {
      setCurrentUser({ ...user, userDB }); 
    }
    //navigate("/"); fix/make redirect to home only in login or register 
  };

  /* User State Controller*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user) => {
    setLoading(true);
    <LoadingMarbidLoad />
    if (user) {
      setLoading(false);
      setCurrentUser(user);
      setIsLogin(true);
      handleAuthConnectionUser(user);

    } else {
      setCurrentUser(userDefaultValue);
      setIsLogin(loginDefaultValue);
    }
    setLoading(false);
    console.log(currentUser);
  };

  const provideValues = {
    currentUser,
    isLogin,
    loading,
    handleFormChange,
    handleSubmitUser,
  };

  return (
    <authContext.Provider value={provideValues}>
       {loading ? <LoadingMarbidLoad /> : children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export { authContext };
