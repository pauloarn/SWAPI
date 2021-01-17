import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import {MovieMin} from '../types/Movie'
import {Vehicles, VehicleParams} from '../types/Vehicle'
import {CharacterMin} from '../types/Character'

function Vehicle() {

    const params = useParams<VehicleParams>();
    const [vehicle, setVehicle] = useState<Vehicles>();    
    const [pilots, setPilots] = useState<CharacterMin[]>();
    const [movies, setMovies] = useState<MovieMin[]>();
    const history = useHistory()

    useEffect(()=>{
        (async ()=>{
           const response=  await api.get(`vehicles/${params.id}`)
           const vehicle = response.data
           setVehicle(vehicle)       
           getPilots(vehicle)    
           getMovies(vehicle)
        })()
    },[])

    async function getMovies(vehicle : Vehicles){
        const data : any = await Promise.all(vehicle.films.map((film:string)=>{
            const movie = film.split("/");
            return (api.get(`films/${movie[5]}`))
           }))
           const filmes : MovieMin[] = []
           data.map((movie:any) =>{
            filmes.push({
                title: movie.data.title,
                id: movie.data.url.split("/")[5]
            })
           })
           setMovies(filmes)
    }

    async function getPilots(vehicle : Vehicles){
        const data : any = await Promise.all(vehicle.pilots.map((film:string)=>{
            const movie = film.split("/");
            return (api.get(`people/${movie[5]}`))
           }))
           const pilots :CharacterMin[] = []
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
            {vehicle ? (
                <div>
                    <h1>Veiculo: {vehicle.name}</h1>
                    <h3>Modelo : {vehicle.model}</h3>
                    <h3>Fabricante: {vehicle.manufacturer} </h3>
                    <h3>Valor(Créditos: {vehicle.cost_in_credits}</h3>
                    <h3>Comprimento: {vehicle.length} </h3>
                    <h3>Velocidade Máxima na Atmosfera: {vehicle.max_atmosphering_speed} </h3>
                    <h3>Capacidade de Tripulantes: {vehicle.crew} </h3>
                    <h3>Capacidade de Passageiros: {vehicle.passengers} </h3>
                    <h3>Capacidade de Carga: {vehicle.cargo_capacity} </h3>
                    <h3>Consumiveis: {vehicle.consumables} </h3>
                    <h3>Classe de Veículo: {vehicle.vehicle_class} </h3>
                   {pilots ? ( <h3>Pilotos: {pilots.map((piloto) =>{
                        return(                        
                            <button onClick = {()=>history.push(`/character/${piloto.id}`)}>{piloto.name}</button>
                        )
                        })}</h3>) : 
                        ( <h3>Carregando Pilotos...</h3>)
                    }
                    {movies ? ( <h3>Filmes: {movies.map((movie) =>{
                         return(                        
                             <button onClick = {()=>history.push(`/movie/${movie.id}`)}>{movie.title}</button>
                         )
                         })}</h3>) : 
                         ( <h3>Carregando Filmes...</h3>)
                     }
                </div>
            ) : (<h1>Carregando...</h1>)}
        </div>
    )
}

export default Vehicle
