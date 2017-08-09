import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import AppWrapper from './app'
import Home from './home'
import About from './about'
import Editor from './editor'


export default class extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AppWrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/diagram/:id" component={Editor} />
        </AppWrapper>
      </BrowserRouter>
    )
  }
}
