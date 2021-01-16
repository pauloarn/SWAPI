import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom"
import Main from './pages/Main'
import Character from './pages/Character'
import Starship from './pages/Starship'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component = {Main}/>
                <Route path = "/character/:id" exact component = {Character}/>
                <Route path = "/starship/:id" exact component = {Starship}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes