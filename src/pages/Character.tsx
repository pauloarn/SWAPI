import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory, Link} from 'react-router-dom'

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

interface Movie{
    id: string,
    title: string
}

interface Starship{
    name: string,
    id: string
}
 interface  Vehicles{
    name: string,
    id: string
 }
function Character() {
    const params = useParams<CharacterParams>()
    const [character, setCharacter] = useState<Character>();
    const [movies, setMovies] = useState<Movie[]>();
    const [starship, setStarship] = useState<Starship[]>();
    const [vehicles, setVehicle] = useState<Vehicles[]>();
    const history = useHistory();

    useEffect(()=>{
        (async ()=>{
           const response=  await api.get(`people/${params.id}`)
            const character = response.data
           setCharacter(character)
           getMovies(character)
           getVehicle(character)
           getStarship(character)
        })()
    },[])

    async function getMovies(character : Character){
        const data : any = await Promise.all(character.films.map((film:string)=>{
            const movie = film.split("/");
            return (api.get(`films/${movie[5]}`))
           }))
           const filmes :Movie[] = []
           data.map((movie:any) =>{
            filmes.push({
                title: movie.data.title,
                id: movie.data.url.split("/")[5]
            })
           })
           setMovies(filmes)
    }
    async function getStarship(character : Character){
        const data : any = await Promise.all(character.starships.map((starship:string)=>{
            const nave = starship.split("/");
            return (api.get(`starships/${nave[5]}`))
           }))
           const naves :Starship[] = []
           console.log(data[0])
           data.map((nave:any) =>{
            naves.push({
                name: nave.data.name,
                id: nave.data.url.split("/")[5]
            })
           })
           setStarship(naves)
    }
    async function getVehicle(character : Character){
        const data : any = await Promise.all(character.vehicles.map((vehicle:string)=>{
            const veiculo = vehicle.split("/");
            return (api.get(`vehicles/${veiculo[5]}`))
           }))
           const veiculos : Vehicles[] = []
           console.log(data[0])
           data.map((veiculo:any) =>{
            veiculos.push({
                name: veiculo.data.name,
                id: veiculo.data.url.split("/")[5]
            })
           })
           setVehicle(veiculos)
    }

    return (
        <div>
            <button onClick = {()=> history.goBack()}>Voltar</button>
            {character?                 
            (
            <div>
                <h1>Personagem: {character.name}</h1>
                <h3>Altura: {character.height} cm</h3>
                <h3>Massa: {character.mass}</h3>
                <h3>Cor do Cabelo: {character.hair_color}</h3>
                <h3>Cor da Pele: {character.skin_color}</h3>
                <h3>Cor do Olho: {character.eye_color}</h3>
                <h3>Gênero: {character.gender}</h3>
                {movies ? ( <h3>Filmes: {movies.map((film) =>{
                    return(                        
                        <button onClick = {()=>history.push(`/film/${film.id}`)}>{film.title}</button>
                    )
                })}</h3>) : ( <h3>Carregando Filmes...</h3>)}
                {vehicles? (
                <h3>Veículos: {vehicles.map(vehicle =>{
                                return(
                                    <button onClick = {()=>history.push(`/vehicle/${vehicle.id}`)}>{vehicle.name}</button>
                                )
                            })}</h3>

                ) : (
                    <h3>Carregando Veiculos...</h3>
                )

                }
                {starship ? (
                <h3>Naves Espaciais: {starship.map(starship=>{
                    return(
                        <button onClick = {()=>history.push(`/starship/${starship.id}`)}>{starship.name}</button>
                    )
                })}</h3>) : (<h3>Carregando Naves...</h3>)}
                
                </div>
                ) : 
                (<h4>Carregando...</h4>)                
            }
        </div>
    )
}

export default Character
