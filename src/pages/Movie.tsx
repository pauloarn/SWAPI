import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import {Movies, MovieParams} from '../types/Movie'
import {CharacterMin} from '../types/Character'
import {VehicleMin} from '../types/Vehicle'
import {StarshipMin} from '../types/Starship'

function Movie() {

    const params = useParams<MovieParams>()
    const [movies, setMovies] = useState<Movies>();
    const [character, setCharacter] = useState<CharacterMin[]>();
    const [vehicles, setVehicle] = useState<VehicleMin[]>();
    const [starship, setStarship] = useState<StarshipMin[]>();
    const history = useHistory();

    useEffect(()=>{
        (async ()=>{
           const response=  await api.get(`films/${params.id}`)
            const movie = response.data
           setMovies(movie)
           getCharacters(movie)
           getStarship(movie)
           getVehicle(movie)
        })()
    },[params.id])

    async function getStarship(movie : Movies){
        const data : any = await Promise.all(movie.starships.map((starship:string)=>{
            const nave = starship.split("/");
            return (api.get(`starships/${nave[5]}`))
           }))
           const naves :StarshipMin[] = []
           console.log(data[0])
           data.map((nave:any) =>{
            naves.push({
                name: nave.data.name,
                id: nave.data.url.split("/")[5]
            })
           })
           setStarship(naves)
    }
    async function getVehicle(movie : Movies){
        const data : any = await Promise.all(movie.vehicles.map((vehicle:string)=>{
            const veiculo = vehicle.split("/");
            return (api.get(`vehicles/${veiculo[5]}`))
           }))
           const veiculos : VehicleMin[] = []
           console.log(data[0])
           data.map((veiculo:any) =>{
            veiculos.push({
                name: veiculo.data.name,
                id: veiculo.data.url.split("/")[5]
            })
           })
           setVehicle(veiculos)
    }

    async function getCharacters(movie : Movies){
        const data : any = await Promise.all(movie.characters.map((character:string)=>{
            const persoangem = character.split("/");
            return (api.get(`people/${persoangem[5]}`))
           }))
           const character :CharacterMin[] = []
           data.map((pilot:any) =>{
            character.push({
                name: pilot.data.name,
                id: pilot.data.url.split("/")[5]
            })
           })
           setCharacter(character)
    }    


    return (
        <div>
            <button onClick = {()=> history.goBack()}>Voltar</button>
            {movies ? (
                <div>
                    <h1>Título: {movies.title}</h1>
                    <h3>Numero do Episódio: {movies.episode_id}</h3>
                    <h3>Sequecia de Abertura: {movies.opening_crawl}</h3>
                    <h3>Diretor: {movies.director} </h3>
                    <h3>Produtor: {movies.producer} </h3>
                    <h3>Data de Lançamento: {movies.release_date} </h3>
                   {character ? ( <h3>Personagens: {character.map((character) =>{
                        return(                        
                            <button onClick = {()=>history.push(`/character/${character.id}`)}>{character.name}</button>
                        )
                        })}</h3>) : 
                        ( <h3>Carregando Personagens...</h3>)
                    }
                    {starship ? (
                    <h3>Naves Espaciais: {starship.map(starship=>{
                        return(
                            <button onClick = {()=>history.push(`/starship/${starship.id}`)}>{starship.name}</button>
                        )
                    })}</h3>) : (<h3>Carregando Naves...</h3>)}
                    {vehicles? (
                    <h3>Veículos: {vehicles.map(vehicle =>{
                                    return(
                                        <button onClick = {()=>history.push(`/vehicle/${vehicle.id}`)}>{vehicle.name}</button>
                                    )
                                })}</h3>

                    ) : (<h3>Carregando Veiculos...</h3>)
                    }
                    </div>
                ):
                (
                    <h1>Carregando Filme...</h1>
                )
                }
        </div>
    )
}

export default Movie
