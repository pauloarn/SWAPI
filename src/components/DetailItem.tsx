import React from 'react'
import { Grid, ButtonBase, Typography} from '@material-ui/core'
import styles from '../styles/pages/Details'

interface DetailProps{
    field: string,
    value: string    
}

export default function DetailItem({field, value}: DetailProps) {
    return (        
        <Grid container>
            <Typography style={styles.detailsTxt}>{field} </Typography>
            <Typography style={{...styles.detailsTxt, fontWeight: 'bold'}}>{value}</Typography>
        </Grid>
    )
}
