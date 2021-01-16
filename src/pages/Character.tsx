import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

interface Character{
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    gender: string,
    films: string[],
    vehicles: string[],
    starships: string[],
    url: string
}

interface CharacterParams{
    id:string
}

function Character() {
    const params = useParams<CharacterParams>()
    const [character, setCharacter] = useState<Character>();

    useEffect(()=>{
        api.get(`people/${params.id}`).then(response=>{
            setCharacter(response.data)
        })
    })
    return (
        <div>
            <h1>Personagem: {character?.name}</h1>
            <h3>Altura: {character?.height} cm</h3>
            <h3>Massa: {character?.mass}</h3>
            <h3>Veículos: {character?.vehicles.map(vehicles =>{
                            return(
                                <h5>{vehicles}</h5>
                            )
                        })}</h3>
        </div>
    )
}

export default Character
