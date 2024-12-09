import React,{createContext, useContext,useEffect,useMemo, useState} from "react";

const authContext = createContext({});

const AuthProvider = ({}) => {
    const[data,setData] = useState(() => {
        const password = localStorage.getItem('@goledger:password');
        const username = localStorage.getItem('@goledger:username');

        if(password && username){
            
        }
    });
}