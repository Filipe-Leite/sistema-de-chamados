import { useState, createContext, useEffect  } from "react";
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

export const AuthContext = createContext<any>({});

function AuthProvider({children}:any){
    const [user, setUser] = useState<object>();
    const [loadingAuth, setLoadingAuth ] = useState(false);
    
    const navigate = useNavigate();

    function signIn(email: any, password: any){
        console.log(email);
        console.log(password);
        alert("LOGADO COM SUCESSO")
    }

    async function signUp(email: any, password: any, name: any){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth,email,password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null
            })
            .then(() => {

                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Seja bem-vindo ao sistema")
                navigate("/dashboard");
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }  

    function storageUser(data: any){
        localStorage.setItem('@ticketsPRO', JSON.stringify(data));
    }

    return(

        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                loadingAuth
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;