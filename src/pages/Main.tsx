import React, {  useState, FormEvent, ChangeEvent, useEffect} from 'react'
import api from '../services/api'
import {Characters} from '../types/Character'
import {Button, Grid, Input, Typography} from '@material-ui/core'
import {SearchRounded, ArrowForwardRounded} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'
import styles from '../styles/pages/Main'

interface FavoriteMin{
    id:string,
    name:string
}

function Main() {
    const [characters, setCharacters] = useState<Characters[]>();
        
    const [input, setInput] = useState<string>('');
    const [favorites, setFavorites ] = useState<FavoriteMin[]>()
    const history = useHistory()

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        await api.get(`people/?search=${input}`).then(response =>{
            setCharacters(response.data.results)
        })
    }

    useEffect(()=>{
        var listaFavoritos = JSON.parse(localStorage.getItem("@swapi/favorites")|| '[]')
        getFavorites(listaFavoritos)
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
                <Grid item xs = {6} >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/640px-Star_Wars_Logo.svg.png" style = {{...styles.image, objectFit:"contain"}}/>
                </Grid>
                <Grid container item style = {styles.body} xs ={12} sm={6}>
                        <Grid item direction="row" xs={12} style={styles.searchContainer}> 
                            <Input placeholder ="Procure o Personagem Aqui"  style= {styles.input} onChange ={handleChange} disableUnderline/>
                            <Button onClick={handleSubmit} style= {{backgroundColor: "black"}} endIcon = {<SearchRounded color="secondary" fontSize= "large"/>}></Button>
                        </Grid>    
                </Grid>
                <div style ={{height: 20}}/>
                <Grid container style = {{...styles.body, paddingLeft: '13%'}} xs ={6}>
                    { characters ? (
                        characters.map(character =>{
                            return (
                            <Grid item direction = "row" style={{...styles.searchContainer, marginTop: 5}}>
                                <Input value={character.name} disabled style= {{...styles.input, width: '60%'}} disableUnderline/>
                                <Button onClick={()=>history.push(`character/${character.url.split("/")[5]}`)}style = {{backgroundColor: 'black'}} endIcon = {<ArrowForwardRounded color="secondary" fontSize= "large"/>}/>
                            </Grid>
                            )
                        })
                    ) : (
                        favorites ? (
                            <div style ={{width: '100%'}}>
                                <Typography style = {styles.favoriteText}> Favoritos </Typography>
                                {favorites.map(favorite=>{
                                    return(
                                        <Grid item direction = "row" style={{...styles.searchContainer, marginTop: 5}}>
                                            <Input value={favorite.name} disabled style= {{...styles.input, width: '60%'}} disableUnderline/>
                                            <Button onClick={()=>history.push(`character/${favorite.id}`)}style = {{backgroundColor: 'black'}} endIcon = {<ArrowForwardRounded color="secondary" fontSize= "large"/>}/>
                                        </Grid>
                                    )
                                })}
                            </div>
                        ) : (
                            <div/>
                        )
                    )
                    }
                </Grid>
            </Grid>            
    )
}

export default Main
