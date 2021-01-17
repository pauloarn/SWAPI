import React, {useState, FormEvent, ChangeEvent} from 'react'
import api from '../services/api'
import {Characters} from '../types/Character'
export default function SearchCaracter(){
    
    const [characters, setCharacters] = useState<Characters[]>([]);
        
    const [input, setInput] = useState<string>('');

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        await api.get(`people/?search=${input}`).then(response =>{
            setCharacters(response.data.results)
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setInput(e.target.value);
    }
    return(
        <form className = "todo-form" onSubmit = {handleSubmit}>
            <input 
                type="text" 
                placeholder = "Procure um personagem do Universo" 
                value={input} 
                name='text' 
                className = "search-input"
                onChange = {handleChange}
            />
            <button className = "search-button" onSubmit={handleSubmit}>Procurar</button>
        </form>
    )
}