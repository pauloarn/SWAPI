import React from 'react';
import Routes from './routes'
import './styles/global.css'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFF00"
    },
    secondary: {
      main: "#ffffff"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}
export default App