import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import IconNew from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'

import DialogName from '../../common/dialogs/name'
import DiagramsTable from './components/table'
import { getDiagrams, createDiagram, deleteDiagram } from '../../service'


class Home extends React.Component {

  state = {
    items: [],
    modalOpened: false,
  }

  componentDidMount() {
    this.getDiagrams()
  }

  getDiagrams = () => {
    getDiagrams()
      .then(items => this.setState({ items }))
  }

  createDiagram = () => {
    this.setState({ modalOpened: true })
  }

  handleClose = (data) => {
    this.setState({ modalOpened: false })
    if (data && data.name) {
      createDiagram(data)
        .then(() => {
          this.getDiagrams()
        })
    }
  }

  openDiagram = (id) => {
    this.props.history.push(`/diagram/${id}`)
  }

  deleteDiagram = (id) => {
    deleteDiagram(id)
      .then(() => this.getDiagrams())
  }

  render() {
    const buttonCreate = (
      <Button
        raised
        color="primary"
        onClick={this.createDiagram}>
          <IconNew /> Create a new diagram
      </Button>
    )

    return (
      <div>

        <DialogName
          open={this.state.modalOpened}
          handleClose={this.handleClose}
        />

        { this.state.items.length
          ? (
            <div>
              {buttonCreate}
              <DiagramsTable
                deleteDiagram={this.deleteDiagram}
                openDiagram={this.openDiagram}
                items={this.state.items}
              />
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Typography type="display2" gutterBottom align="center">
                Oops, no diagrams here! Create one now!
              </Typography>
              {buttonCreate}
            </div>
          )
      }

      </div>
    )
  }
}

export default withRouter(Home)
