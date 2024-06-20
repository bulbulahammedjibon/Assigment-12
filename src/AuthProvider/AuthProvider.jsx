import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/Firebase";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loader,setLoader] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider)
    }

    const createEmailPassword = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logInEmailPassword = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
        })
    }

    const logOut = async () => {
        setLoader(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user',currentUser);
            
            setUser(currentUser);
            setLoader(false);
        })
        return () => {
            unSubscribe()
        }
    }, [])


    const authInfo = { googleLogin,logOut,loader, createEmailPassword, logInEmailPassword, updateUserProfile,user,setUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;