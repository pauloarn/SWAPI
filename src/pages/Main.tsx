import React, {  useState, FormEvent, ChangeEvent, useEffect} from 'react'
import api from '../services/api'
import {Link} from 'react-router-dom'
import {Characters} from '../types/Character'
import {Button, Grid, Input} from '@material-ui/core'
import {SearchRounded, ArrowForwardRounded} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'
import styles from '../styles/pages/Main'

function Main() {
    const [characters, setCharacters] = useState<Characters[]>([]);
        
    const [input, setInput] = useState<string>('');
    const [nextPage, setNextPage] = useState<string>("");
    const [prevPage, setPrevPage] = useState<string>("");
    const history = useHistory()

    async function handleSubmit(event: FormEvent){
        console.log("clicou")
        event.preventDefault();
        await api.get(`people/?search=${input}`).then(response =>{
            setCharacters(response.data.results)
            setNextPage(response.data.next)
            setPrevPage(response.data.prev)
        })
    }
    
    async function nextPageEvent(){
        const response = await api.get(`people/${nextPage.split("/")[5]}`)
        setCharacters(response.data)
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
                    {characters.map(character =>{
                        return (
                        <Grid item direction = "row" style={{...styles.searchContainer, marginTop: 5}}>
                            <Input value={character.name} onClick= {()=>{alert()}} disabled style= {{...styles.input, width: '60%'}} disableUnderline/>
                            <Button onClick={()=>history.push(`character/${character.url.split("/")[5]}`)}style = {{backgroundColor: 'black'}} endIcon = {<ArrowForwardRounded color="secondary" fontSize= "large"/>}/>
                        </Grid>
                        )
                    })}
                </Grid>
            </Grid>            
    )
}

export default Main
