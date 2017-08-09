import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider } from 'material-ui/styles'
import createMuiTheme from 'material-ui/styles/theme'
// import SRD from 'storm-react-diagrams'

import './App.css'
import Routes from './routes'


injectTapEventPlugin()

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme()}>
        <Routes />
      </MuiThemeProvider>
    )
  }
}

export default App
