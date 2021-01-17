import React from 'react'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { ArrowBackRounded} from '@material-ui/icons'

function BackButton() {
    const history = useHistory();
    return (
        <Button onClick={()=>history.goBack()}style = {{backgroundColor: 'black'}} endIcon = {<ArrowBackRounded color="secondary" fontSize= "large"/>}/>   
    )
}

export default BackButton
