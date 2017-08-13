import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog'
import { TwitterPicker } from 'react-color'
import Divider from 'material-ui/Divider'

import TypeOptions from './typeOptions'
import ColorPicker from './colorPicker'

const DividerWithMargin = () => <Divider style={{ margin: '15px 0' }} />

// to respect component life cyles
const Maybe = (props) => props.open && <DialogCreate {...props} />

class DialogCreate extends React.Component {

  constructor(props) {
    super(props)
    const { data = { extras: {} } } = props

    this.state = {
      name: data.extras.name || '',
      size: data.extras.size || 150,
      colorBackground: data.extras.colorBackground || '#fff',
      colorBorder: data.extras.colorBorder || '#000',
      colorText: data.extras.colorText || '#000',
    }
  }

  handleSubmit = what => {
    this.props.handleClose({ 
      type: this.state.type,
      name: this.state.name,
      size: this.state.size,
      colorBackground: this.state.colorBackground,
      colorBorder: this.state.colorBorder,
      colorText: this.state.colorText,
      editMode: this.props.editMode,
    })
  }

  disabledSubmit = () => {
    const { name, size } = this.state
    const nameWrong = (!name || !name.length)
    const sizeWrong = (!size || !size.length)

    return nameWrong && sizeWrong
  }

  render() {
    const { editMode, data } = this.props
    const { colorBackground, colorBorder, colorText } = this.state
    // debugger

    return (
      <Dialog open={this.props.open} onRequestClose={this.props.cancel}>
        <DialogTitle>
          { editMode ? 'Edit node' : 'Create a new node' }
        </DialogTitle>

        <DialogContent style={{ width: 500 }}>

          <TypeOptions
            value={this.state.type}
            onChange={type => this.setState({ type })}
            disabled={editMode}
          />

          <TextField
            label="Name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            margin="normal"
          />

          <DividerWithMargin />

          <TextField
            label="Size"
            value={this.state.size}
            onChange={event => this.setState({ size: event.target.value })}
            margin="normal"
          />

          <DividerWithMargin />

          <ColorPicker
            label="Background color"
            onChange={colorBackground => this.setState({ colorBackground })}
            color={colorBackground}
          />

          <DividerWithMargin />

          <ColorPicker
            label="Border color"
            onChange={colorBorder => this.setState({ colorBorder })}
            color={colorBorder}
          />

          <DividerWithMargin />

          <ColorPicker
            label="Text color"
            onChange={colorText => this.setState({ colorText })}
            color={colorText}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={this.disabledSubmit()}>
            { editMode ? 'Edit' : 'Create' }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default Maybe
