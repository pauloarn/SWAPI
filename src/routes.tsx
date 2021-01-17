import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom"
import Main from './pages/Main'
import Character from './pages/Character'
import Starship from './pages/Starship'
import Vehicle from './pages/Vehicle';
import Movie from './pages/Movie';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component = {Main}/>
                <Route path = "/character/:id" exact component = {Character}/>
                <Route path = "/starship/:id" exact component = {Starship}/>
                <Route path = "/vehicle/:id" exact component = {Vehicle}/>
                <Route path = "/movie/:id" exact component = {Movie}/>
            </Switch>
        </BrowserRouter>       
    )
}
export default Routes