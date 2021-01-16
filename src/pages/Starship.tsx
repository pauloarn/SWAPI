import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import { strict } from 'assert';

interface Starship{
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: number,
    length: number,
    max_atmosphering_speed: number,
    crew: number,
    passengers: number,
    cargo_capacity: number,
    consumables: string,
    hyperdrive_rating: string,
    MGLT: string,
    starship_class: string,
    pilots: string[],
    films: string[],
    url: string
}

interface StarshipParams{
    id: string
}

interface Pilot{
    id: string,
    name: string
}

interface Movie{
    id: string,
    title: string
}

interface Pilot{
    id: string,
    name:string
}

function Starship() {
    const params = useParams<StarshipParams>();
    const [starship, setStarship] = useState<Starship>();
    const [pilots, setPilots] = useState<Pilot[]>();
    const [movies, setMovies] = useState<Movie[]>();
    const history = useHistory()

    useEffect(()=>{
        (async ()=>{
           const response=  await api.get(`starships/${params.id}`)
           const starship = response.data
           setStarship(starship)       
           getPilots(starship)    
           getMovies(starship)
        })()
    },[])

    async function getMovies(starship : Starship){
        const data : any = await Promise.all(starship.films.map((film:string)=>{
            const movie = film.split("/");
            return (api.get(`films/${movie[5]}`))
           }))
           const filmes : Movie[] = []
           data.map((movie:any) =>{
            filmes.push({
                title: movie.data.title,
                id: movie.data.url.split("/")[5]
            })
           })
           setMovies(filmes)
    }

    async function getPilots(starship : Starship){
        const data : any = await Promise.all(starship.pilots.map((film:string)=>{
            const movie = film.split("/");
            return (api.get(`people/${movie[5]}`))
           }))
           const pilots :Pilot[] = []
           data.map((pilot:any) =>{
            pilots.push({
                name: pilot.data.name,
                id: pilot.data.url.split("/")[5]
            })
           })
           setPilots(pilots)
    }

    return (
        <div>
            <button onClick = {()=> history.goBack()}>Voltar</button>
            {starship ? (
                <div>                    
                    <h1>Name: {starship.name}</h1>
                    <h3>Modelo: {starship.model}</h3>
                    <h3>Fabricante: {starship.manufacturer}</h3>
                    <h3>Valor(creditos): {starship.cost_in_credits}</h3>
                    <h3>Capacidade de Tripulantes: {starship.crew}</h3>
                    <h3>Capacidade de Passageiros: {starship.passengers}</h3>
                    <h3>Capacidade de Carga: {starship.cargo_capacity}</h3>
                    <h3>Consumiveis: {starship.consumables}</h3>
                    <h3>Classe de Veículos: {starship.starship_class}</h3>
                   {pilots ? ( <h3>Pilotos: {pilots.map((piloto) =>{
                        return(                        
                            <button onClick = {()=>history.push(`/character/${piloto.id}`)}>{piloto.name}</button>
                        )
                        })}</h3>) : 
                        ( <h3>Carregando Pilotos...</h3>)
                    }
                   {movies ? ( <h3>Filmes: {movies.map((movie) =>{
                        return(                        
                            <button onClick = {()=>history.push(`/film/${movie.id}`)}>{movie.title}</button>
                        )
                        })}</h3>) : 
                        ( <h3>Carregando Filmes...</h3>)
                    }
                </div>

            ):
            (
                <h1>Carregando...</h1>
            )}
            
        </div>
    )
}

export default Starship
