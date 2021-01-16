import React, {useState, FormEvent, ChangeEvent} from 'react'
import {useHistory} from 'react-router-dom'

export default function SearchCaracter(){
    
    const [input, setInput] = useState<string>('');
    const history = useHistory();

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        alert(input)
        history.push('/to');
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