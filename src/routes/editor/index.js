import React from 'react'
import Button from 'material-ui/Button'
import IconNew from 'material-ui-icons/Add'
import IconSave from 'material-ui-icons/Save'

import DialogCreate from './dialogs/create'
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
    dialogCreate: {
      open: true
    },
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
    updateDiagram({ ...this.state.diagram, model })
  }

  createNode = () => {
    this.diagram.create()
    this.diagram.forceUpdate()
  }

  render() {
    const { error, diagram } = this.state

    // debugger

    if (error)
      return <NotFound id={this.props.match.params.id} />

    return (
      <div>

        <DialogCreate open={this.state.dialogCreate.open} handleClose={console.log} />

        <Button
          raised
          color="primary"
          style={{ marginRight: 10 }}
          onClick={this.createNode}>
            <IconNew /> Create
        </Button>

        <Button
          raised
          color="primary"
          onClick={this.saveDiagram}>
            <IconSave /> Save
        </Button>

        <div className="editor-area">
          <Diagram ref={(ref) => { this.diagram = ref }} model={diagram.model}  />
        </div>
      </div>
    )
  }
}
