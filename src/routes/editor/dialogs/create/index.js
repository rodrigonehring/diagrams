import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog'

import TypeOptions from './typeOptions'


export default class extends React.Component {
  state = { name: '' }

  handleChange = (e, value) => this.setState({ name: value })

  handleCancel = () => this.props.handleClose()

  handleSubmit = what => {
    this.setState({ name: '' })
    this.props.handleClose({ name: this.state.name })
  }

  typeChange = () => {}

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.handleCancel}>
        <DialogTitle>
          Create a new node
        </DialogTitle>
        <DialogContent style={{ width: 500 }}>

          <TypeOptions onChange={this.typeChange} />

          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={!this.state.name.length}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
