import React, {  useState, FormEvent, ChangeEvent, useEffect} from 'react'
import api from '../services/api'
import {Characters} from '../types/Character'
import { Grid, ButtonBase, Input, Typography} from '@material-ui/core'
import {SearchRounded, ArrowForwardRounded} from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'
import styles from '../styles/pages/Main'
import logo from '../images/starwars.png'

interface FavoriteMin{
    id:string,
    name:string
}

function Main() {
    
    const [characters, setCharacters] = useState<Characters[]>();        
    const [input, setInput] = useState<string>('');
    const [favorites, setFavorites ] = useState<FavoriteMin[]>()
    const history = useHistory()
    const [haveCharacter, setHaveCharacter] = useState<boolean>(false)

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const response = await api.get(`people/?search=${input}`)
        if(response.data.results.length > 0){
            setCharacters(response.data.results)
        } else{
            toast("Nenhum personagem encontrado")
        }
    }
    useEffect(()=>{
        var listaFavoritos = JSON.parse(localStorage.getItem("@swapi/favorites")|| '[]')
        if(listaFavoritos.length !== 0){
            getFavorites(listaFavoritos)
        } 
    },[])

    async function getFavorites(favorites: string[]){
        const data : any = await Promise.all(favorites.map((favorite: string)=>{
            return (api.get(`people/${favorite}`))
        }))
        const fav: FavoriteMin[] = []
        data.map((favo:any)=>{
            fav.push({
                id: favo.data.url.split("/")[5],
                name: favo.data.name
            })
        })
        setFavorites(fav)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setInput(e.target.value);
    }

    return (
            <Grid container direction = 'column' style = {styles.principal}>
                <Grid item xs = {6}>
                    <img src={logo} style = {{...styles.image, objectFit:"contain"}}/>
                </Grid>
                <Grid container item style = {styles.body} xs ={12} sm={6}>
                    <form style = {{width: '100%'}} onSubmit = {handleSubmit}>
                        <Grid item direction="row" xs={12} style={styles.searchContainer}>                      
                            <Input value = {input} placeholder ="Procure o Personagem Aqui"  style= {styles.input} onChange ={handleChange} disableUnderline/>
                            <ButtonBase onClick={handleSubmit} ><SearchRounded fontSize= "large"/></ButtonBase>
                        </Grid> 
                    </form>   
                </Grid>
                <div style ={{height: 20}}/>
                <Grid container style = {{...styles.body}} xs ={6}>
                { characters ? (
                            characters.map(character =>{
                                return (
                                <Grid item direction = "row" style={{...styles.searchContainer, marginTop: 5}}>
                                    <ButtonBase style = {styles.resultBtn} onClick ={()=>history.push(`character/${character.url.split("/")[5]}`)}> {character.name} <ArrowForwardRounded/> </ButtonBase>
                                </Grid>
                                )
                            })               
                    ) : (
                        favorites ? (
                            <div style ={{width: '100%'}}>
                                <Typography style = {styles.favoriteText}> Favoritos </Typography>
                                {favorites.map(favorite=>{
                                    return(
                                        <Grid item direction = "row" style={{marginTop: 5}}>
                                            <ButtonBase style = {styles.resultBtn} onClick ={()=>history.push(`character/${favorite.id}`)}> {favorite.name} <ArrowForwardRounded/> </ButtonBase>
                                        </Grid>                                        
                                    )
                                })}
                            </div>
                        ) : (
                            <div style ={{width: '100%'}}>
                                <Typography style = {styles.noFavText}>Para adicionar Favoritos, entre na página de detalhes dos personagens</Typography>
                            </div>
                        )
                    )
                    }                    
                <ToastContainer hideProgressBar={true}  limit = {1} autoClose = {2000}/>
                </Grid>
            </Grid>            
    )
}
export default Main
