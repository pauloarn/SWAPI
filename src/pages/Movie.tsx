import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import {Movies, MovieParams} from '../types/Movie'
import {CharacterMin} from '../types/Character'
import {VehicleMin} from '../types/Vehicle'
import {StarshipMin} from '../types/Starship'
import { Grid, ButtonBase, Typography, Button} from '@material-ui/core'
import {HomeOutlined} from '@material-ui/icons'
import styles from '../styles/pages/Details'
import DetailItem from '../components/DetailItem'
import BackButton from '../components/BackButton'
import logo from '../images/starwars.png'

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
        <>
            <Grid container style={styles.principal}>
            <Grid item xs = {4} >
                <img onClick = {()=>{history.push("/")}} src={logo} style = {{...styles.image, objectFit:"contain"}}/>
            </Grid>
            {movies ? (
            <Grid container item xs={12} sm={6} style={{width: '100%'}} alignItems="center" direction = "column" justify = "center">                
                <Button  onClick= {()=>history.push("/")} endIcon = {<HomeOutlined fontSize = "large" color = "secondary"/>}/>
                <Grid item container style ={{justifyContent: 'space-between'}}>
                    <BackButton/>
                    <Typography style={styles.title}>{movies.title}</Typography>
                    <div/>
                </Grid>
                <Grid container item style={styles.detailsContainer} direction = "column">      
                  <DetailItem field = "Episódio: " value = {` ${movies.episode_id}`}/>   
                  <DetailItem field = "Sequencia de Abertura: " value = {` ${movies.opening_crawl}`}/>   
                  <DetailItem field = "Diretor: " value = {` ${movies.director}`}/>   
                  <DetailItem field = "Lançamento: " value = {` ${movies.release_date}`}/>   
                    <Typography style={styles.detailsTxt}>Personagens: </Typography>
                    <Grid container item style={styles.buttonsContainer}>
                        {character ? (<div>
                            {character.map((character)=>{
                                return(
                                    <ButtonBase onClick= {()=>history.push(`/character/${character.id}`)} style ={styles.buttonMore}>{character.name}</ButtonBase>
                                )
                            })}
                        </div>
                        ) : (
                            <Typography style={styles.detailsTxt}>Carregando Personagens . . .</Typography>
                        )}
                    </Grid>
                    <Typography style={styles.detailsTxt}>Starships: </Typography>
                    <Grid container item style={styles.buttonsContainer}>
                        {starship ? (<div>
                            {starship.map((starship)=>{
                                return(
                                    <ButtonBase onClick= {()=>history.push(`/starship/${starship.id}`)} style ={styles.buttonMore}>{starship.name}</ButtonBase>
                                )
                            })}
                        </div>
                        ) : (
                            <Typography style={styles.detailsTxt}>Carregando Naves . . . </Typography>
                        )}
                    </Grid>
                    <Typography style={styles.detailsTxt}>Veículos: </Typography>
                    <Grid container item style={styles.buttonsContainer}>
                        {vehicles ? (<div>
                            {vehicles.map((vehicle)=>{
                                return(
                                    <ButtonBase onClick= {()=>history.push(`/vehicle/${vehicle.id}`)} style ={{...styles.buttonMore, width: 200}}>{vehicle.name}</ButtonBase>
                                )
                            })}
                        </div>
                        ) : (
                            <Typography style={styles.detailsTxt}>Carregando Espaçonaves . . .</Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            ): ( <Typography style={styles.title}>Carregando . . .</Typography>) }
        </Grid>        
        <div style={{height: 10, backgroundColor:'black'}}/>
    </>
    )
}

export default Movie
