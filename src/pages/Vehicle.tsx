import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import {MovieMin} from '../types/Movie'
import {Vehicles, VehicleParams} from '../types/Vehicle'
import { Grid, ButtonBase, Typography} from '@material-ui/core'
import {CharacterMin} from '../types/Character'
import styles from '../styles/pages/Details'
import DetailItem from '../components/DetailItem'
import BackButton from '../components/BackButton'

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
        <Grid container style={styles.principal}>
            <Grid item xs = {4} >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/640px-Star_Wars_Logo.svg.png" style = {{...styles.image, objectFit:'contain'}}/>
            </Grid>
            {vehicle ? (
            <Grid container item xs={12} sm={6} style={{width: '100%'}} alignItems="center" direction = "column" justify = "center">
            <Grid item container style ={{justifyContent: 'space-between'}}>                
                <BackButton/>
                <Typography style={styles.title}>{vehicle.name}</Typography>
                <div/>
            </Grid>
                <Grid container item style={styles.detailsContainer} direction = "column">   
									<DetailItem field = "Modelo: " value = {` ${vehicle.model}`}/>
									<DetailItem field = "Fabricante: " value = {` ${vehicle.manufacturer}`}/>
									<DetailItem field = "Valor: " value = {` ${vehicle.cost_in_credits} Créditos`}/>
									<DetailItem field = "Comprimento: " value = {` ${vehicle.length} Metros`}/>
									<DetailItem field = "Velocidade Máxima (Na Atmosfera):" value = {` ${vehicle.max_atmosphering_speed}`}/>
									<DetailItem field = "Capacidade de Tripulantes: " value = {` ${vehicle.crew}`}/>
									<DetailItem field = "Capacidade de Passageiros: " value = {` ${vehicle.passengers}`}/>
									<DetailItem field = "Capacidade de Carga: " value = {` ${vehicle.cargo_capacity}`}/>
									<DetailItem field = "Consumiveis: " value = {` ${vehicle.consumables}`}/>
									<DetailItem field = "Classe de Veículo: " value = {` ${vehicle.vehicle_class}`}/>
									<Typography style={styles.detailsTxt}>Filmes: </Typography>
										<Grid container item style={styles.buttonsContainer}>
												{movies ? (<div>
														{movies.map((movie)=>{
																return(
																		<ButtonBase onClick= {()=>history.push(`/movie/${movie.id}`)} style ={styles.buttonMore}>{movie.title}</ButtonBase>
																)
														})}
												</div>
												) : (
														<Typography style={styles.detailsTxt}>Carregando Filmes . . .</Typography>
												)}
										</Grid>
										<Typography style={styles.detailsTxt}>Pilotos: </Typography>
										<Grid container item style={styles.buttonsContainer}>
												{pilots ? (<div>
														{pilots.map((pilot)=>{
																return(
																		<ButtonBase onClick= {()=>history.push(`/starship/${pilot.id}`)} style ={styles.buttonMore}>{pilot.name}</ButtonBase>
																	)
															})}
												</div>
												) : (
														<Typography style={styles.detailsTxt}>Carregando Pilotos . . . </Typography>
												)}
                  </Grid>
                </Grid>
            </Grid>
            ): ( <Typography style={styles.title}>Carregando . . .</Typography>) }
        </Grid>
    )
}

export default Vehicle
