import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../services/api'
import {MovieMin} from '../types/Movie'
import {VehicleMin} from '../types/Vehicle'
import {StarshipMin} from '../types/Starship'
import {Characters, CharacterParams} from '../types/Character'
import { Grid, ButtonBase, Typography, Button} from '@material-ui/core'
import {StarBorderRounded, Star, HomeOutlined} from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify';
import styles from '../styles/pages/Details'
import DetailItem from '../components/DetailItem'
import BackButton from '../components/BackButton'
import logo from '../images/starwars.png'

function Character() {
    const params = useParams<CharacterParams>()
    const [character, setCharacter] = useState<Characters>();
    const [movies, setMovies] = useState<MovieMin[]>();
    const [starship, setStarship] = useState<StarshipMin[]>();
    const [vehicles, setVehicle] = useState<VehicleMin[]>();
    const [isFavorite, setIsFavorite] = useState(false);
    const history = useHistory();
    
    useEffect(()=>{        
        (async ()=>{
           const response=  await api.get(`people/${params.id}`)
            const character = response.data
           setCharacter(character)
           getMovies(character)
           if(character.starships.length > 0){               
                getStarship(character)
           }
           if(character.vehicles.length > 0){
                getVehicle(character)   
           }
        })()
    },[])

    useEffect(()=>{                      
        var listaFavoritos = JSON.parse(localStorage.getItem("@swapi/favorites")|| '[]')
        if(character){
            if(listaFavoritos.indexOf(`${character.url.split("/")[5]}`)>=0){
                setIsFavorite(true)
            }
        }
    }, [character])

    async function getMovies(character : Characters){
        const data : any = await Promise.all(character.films.map((film:string)=>{
            const movie = film.split("/");
            return (api.get(`films/${movie[5]}`))
           }))
           const filmes :MovieMin[] = []
           data.map((movie:any) =>{
            filmes.push({
                title: movie.data.title,
                id: movie.data.url.split("/")[5]
            })
           })
           setMovies(filmes)
    }
    async function getStarship(character : Characters){
        const data : any = await Promise.all(character.starships.map((starship:string)=>{
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
    async function getVehicle(character : Characters){
        const data : any = await Promise.all(character.vehicles.map((vehicle:string)=>{
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

    function adicionaFavorito(character: Characters){
        var listaFavoritos = JSON.parse(localStorage.getItem("@swapi/favorites")|| '[]')
        if(isFavorite){
            var index = listaFavoritos.indexOf(`${character.url.split("/")[5]}`)
            listaFavoritos.splice(index, 1)
            localStorage.setItem("@swapi/favorites", JSON.stringify(listaFavoritos))            
            toast("Removido dos Favoritos")
            setIsFavorite(false)
        } else{
            listaFavoritos.push(`${character.url.split("/")[5]}`)
            localStorage.setItem("@swapi/favorites", JSON.stringify(listaFavoritos))            
            toast("Adicionado aos Favoritos")
            setIsFavorite(true)
        }
    }

    return (
        <Grid container style={styles.principal}>
            <Grid item xs = {4} >
                <img onClick = {()=>{history.push("/")}} src={logo} style = {{...styles.image, objectFit:"contain"}}/>
            </Grid>
            {character ? (
            <Grid container item xs={12} sm={6} style={{width: '100%'}} alignItems="center" direction = "column" justify = "center">
                <Button  onClick= {()=>history.push("/")} endIcon = {<HomeOutlined fontSize = "large" color = "secondary"/>}/>
                <Grid container item style ={{justifyContent: 'space-between'}}>
                    <BackButton/>
                    <Typography style={styles.title}>{character.name}</Typography>
                    <Button onClick = {()=>{adicionaFavorito(character)}} style = {{backgroundColor: 'black'}} endIcon = {isFavorite ? (<Star color= "primary" fontSize= "large"/>) : (<StarBorderRounded color="secondary" fontSize= "large"/>)}/>
                </Grid>
                <Grid container item style={styles.detailsContainer} direction = "column">                    
                  <DetailItem field = "Altura: " value = {` ${character.height.toString()} cm`}/>      
                  <DetailItem field = "Massa: " value = {` ${character.mass}`}/>      
                  <DetailItem field = "Cor de Cabelo: " value = {` ${character.hair_color}`}/>      
                  <DetailItem field = "Cor de Pele: " value = {` ${character.skin_color}`}/>      
                  <DetailItem field = "Cor dos Olhos: " value = {` ${character.eye_color}`}/>                        
                  <DetailItem field = "Gênero: " value = {` ${character.gender}`}/>
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
                            <Typography style={styles.detailsTxt}>Não possui Naves</Typography>
                        )}
                    </Grid>
                    <Typography style={styles.detailsTxt}>Veículos: </Typography>
                    <Grid container item style={styles.buttonsContainer}>
                        {vehicles ? (<div>
                            {vehicles.map((vehicle)=>{
                                return(
                                    <ButtonBase onClick= {()=>history.push(`/vehicle/${vehicle.id}`)} style ={styles.buttonMore}>{vehicle.name}</ButtonBase>
                                )
                            })}
                        </div>
                        ) : (
                            <Typography style={styles.detailsTxt}>Não possui Veículos </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            ): (                 
                <Grid container item xs={12} sm={6} style={{width: '100%'}} alignItems="center" direction = "column" justify = "center">
                    <Typography style={styles.title}>Carregando . . .</Typography>
                </Grid>
            )}
            
        <ToastContainer hideProgressBar={true}  limit = {1} autoClose = {2000} position = "top-left"/>
        </Grid>
    )
}

export default Character
