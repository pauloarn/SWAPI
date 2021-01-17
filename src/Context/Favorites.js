import React,{ createContext, useState, useContext }from 'react'

const FavContext = createContext([]);

export default function FavoriteProvider({children}){
    const [id,setId] = useState();
    return(
        <FavContext.Provider
            value={{
                id,
                setId
            }}
        >
            {children}
        </FavContext.Provider>
    )
}

export function useFavorite(){
    const context = useContext(FavContext)
    const {id, setId} = context
    return {id, setId}
}