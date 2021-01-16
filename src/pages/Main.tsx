import React, { useEffect, useState, FormEvent, ChangeEvent} from 'react'
import Search from '../components/Search'
import api from '../services/api'
import {useHistory, Link} from 'react-router-dom'
import axios from 'axios'
import { Console } from 'console'
import { relative } from 'path'

interface Characters{
    name: string,
    films: string[],
    url: string
}

function Main() {
    const [characters, setCharacters] = useState<Characters[]>([]);
        
    const [input, setInput] = useState<string>('');
    const history = useHistory();

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        await api.get(`people/?search=${input}`).then(response =>{
            setCharacters(response.data.results)
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setInput(e.target.value);
    }

    async function getFilmName(film: string) {
            const movie = film.split("/");
            await api.get(`films/${movie[5]}`).then(response =>{
               return(response.data.title)
            })
    }

    return (
        <div> 
            <form className = "todo-form" onSubmit = {handleSubmit}>
                <input 
                    type="text" 
                    placeholder = "Procure um personagem do Universo" 
                    value={input} 
                    name='text' 
                    className = "search-input"
                    onChange = {handleChange}
                    autoFocus
                />
                <button className = "search-button" onSubmit={handleSubmit}>Procurar</button>
            </form>
            {characters.map(characters =>{
                return (
                    <div>
                        <Link to={`character/${characters.url.split("/")[5]}`}>{characters.name}</Link>
                        {characters.films.map((films) =>{
                            return(
                                <h5>{(films)}</h5>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Main