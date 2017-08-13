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
      open: false,
      data: {}, // when edit mode
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

  createNode = ({ type, ...newData } = {}) => {
    const { data, editMode } = this.state.dialogCreate
    this.setState({ dialogCreate: { open: false } })

    if (editMode) {
      data.extras = { ...newData }
      this.diagram.forceUpdate()
    } else {
      console.log('create', type, newData)
      this.diagram.create(type, newData)
      this.diagram.forceUpdate()
    }
  }

  openDialogCreate = (data) => {
    this.setState({
      dialogCreate: {
        open: true,
        data,
        editMode: !!data,
      }
    })
  }

  render() {
    const { error, diagram, dialogCreate } = this.state

    if (error)
      return <NotFound id={this.props.match.params.id} />

    return (
      <div>

        <DialogCreate
          open={dialogCreate.open}
          data={dialogCreate.data}
          editMode={dialogCreate.editMode}
          handleClose={this.createNode}
          cancel={() => this.setState({ dialogCreate: { open: false }})}
        />

        <Button
          raised
          color="accent"
          style={{ marginRight: 10 }}
          onClick={() => this.openDialogCreate()}>
            <IconNew /> Create
        </Button>

        <Button
          raised
          color="primary"
          onClick={this.saveDiagram}>
            <IconSave /> Save
        </Button>

        <div className="editor-area">
          <Diagram
            ref={(ref) => { this.diagram = ref }}
            model={diagram.model}
            openDialogCreate={this.openDialogCreate}
          />
        </div>
      </div>
    )
  }
}
