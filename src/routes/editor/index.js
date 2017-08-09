import React from 'react'
import { getDiagram, updateDiagram } from '../../service'

import Diagram from './Diagram'

const NotFound = ({ id }) => (
  <span>
    Item com id: {id}, não encontrado!
  </span>
)


export default class extends React.Component {
  state = {
    error: false,
    diagram: {},
  }

  componentDidMount() {
    getDiagram(this.props.match.params.id)
      .then(diagram => {
        this.diagram.serialize(diagram.model)
        this.setState({ diagram })
      })
      .catch(error => this.setState({ error }))
  }

  saveDiagram = () => {
    const model = this.diagram.serialize()
    updateDiagram({ ...this.state.diagram, model }).then(console.log)
  }

  render() {
    const { error, diagram } = this.state

    // debugger

    if (error)
      return <NotFound id={this.props.match.params.id} />

    return (
      <div className="editor-area">
        <button onClick={this.saveDiagram}>salvar</button>
        <Diagram ref={(ref) => { this.diagram = ref }} model={diagram.model}  />
      </div>
    )
  }
}
