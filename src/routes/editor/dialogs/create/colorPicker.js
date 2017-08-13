import React from 'react'
import { TwitterPicker } from 'react-color'
import Menu, { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'


const BlockColor = ({ background }) => (
  <div style={{ 
      width: 30,
      height: 30,
      marginRight: 10,
      background,
      display: 'inline-block',
      border: '1px solid #ccc',
    }}
  />
)

export default class extends React.Component {

  state = {
    open: false,
    anchorEl: undefined,
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BlockColor background={this.props.color} />
        <Typography type="body2">
          {this.props.label}
        </Typography>
        
        <Button onClick={this.handleClick} style={{ margin: '0 10px' }} color="accent">
          Change color
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          style={{ margin: '67px 0 0 50px', boxShadow: 'none', background: 'none' }}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <TwitterPicker
            open={false}
            style={{ border: '1px solid #ccc' }}
            color={this.props.color}
            colors={['#fff', '#000', '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e74c3c', '#f1c40f', '#95a5a6', '#2c3e50']}
            onChange={color => this.props.onChange(color.hex)}
          />
        </Menu>
      </div>
    )
  }
}