import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import {Starships, StarshipParams} from '../types/Starship'
import {MovieMin} from '../types/Movie'
import {CharacterMin} from '../types/Character'
import { Grid, ButtonBase, Typography, Button} from '@material-ui/core'
import {HomeOutlined} from '@material-ui/icons'
import styles from '../styles/pages/Details'
import DetailItem from '../components/DetailItem'
import BackButton from '../components/BackButton'
import logo from '../images/starwars.png'

function Starship() {
    const params = useParams<StarshipParams>();
    const [starship, setStarship] = useState<Starships>();
    const [pilots, setPilots] = useState<CharacterMin[]>();
    const [movies, setMovies] = useState<MovieMin[]>();
    const history = useHistory()

    useEffect(()=>{
        (async ()=>{
           const response=  await api.get(`starships/${params.id}`)
           const starship = response.data
           setStarship(starship)                  
           if(starship.pilots.length > 0){
            getPilots(starship)    
           }
           getMovies(starship)
        })()
    },[])

    async function getMovies(starship : Starships){
        const data : any = await Promise.all(starship.films.map((film:string)=>{
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

    async function getPilots(starship : Starships){
        const data : any = await Promise.all(starship.pilots.map((film:string)=>{
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
                <img onClick = {()=>{history.push("/")}} src={logo} style = {{...styles.image, objectFit:"contain"}}/>
            </Grid>
            {starship ? (
            <Grid container item xs={12} sm={6} style={{width: '100%'}} alignItems="center" direction = "column" justify = "center">
                <Button  onClick= {()=>history.push("/")} endIcon = {<HomeOutlined fontSize = "large" color = "secondary"/>}/>
                <Grid item container style ={{justifyContent: 'space-between'}}>
                    <BackButton/>
                    <Typography style={styles.title}>{starship.name}</Typography>
                    <div/>
                </Grid>
                <Grid container item style={styles.detailsContainer} direction = "column">   
                  <DetailItem field = "Modelo: " value = {` ${starship.model}`}/>
                  <DetailItem field = "Fabricante: " value = {` ${starship.manufacturer}`}/>
                  <DetailItem field = "Valor: " value = {` ${starship.cost_in_credits} Créditos`}/>
                  <DetailItem field = "Comprimento: " value = {` ${starship.length} Metros`}/>
                  <DetailItem field = "Velocidade Máxima (Na Atmosfera):" value = {` ${starship.max_atmosphering_speed}`}/>
                  <DetailItem field = "Capacidade de Tripulantes: " value = {` ${starship.crew}`}/>
                  <DetailItem field = "Capacidade de Passageiros: " value = {` ${starship.passengers}`}/>
                  <DetailItem field = "Capacidade de Carga: " value = {` ${starship.cargo_capacity}`}/>
                  <DetailItem field = "Consumiveis: " value = {` ${starship.consumables}`}/>
                  <DetailItem field = "Avaliação Hyperdrive: " value = {` ${starship.hyperdrive_rating}`}/>
                  <DetailItem field = "Classe de Nave: " value = {` ${starship.starship_class}`}/>
                  <DetailItem field = "MGLT: " value = {` ${starship.MGLT}`}/>
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
                            <Typography style={styles.detailsTxt}>Nenhum Piloto </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            ): ( <Typography style={styles.title}>Carregando . . .</Typography>) }
        </Grid>
    )
}

export default Starship
