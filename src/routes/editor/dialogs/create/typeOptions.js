import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}))

const options = [
  'square',
  'triangle',
  'diamond',
]

class SimpleListMenu extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 1,
  }

  componentWillMount() {
    this.props.onChange(options[this.state.selectedIndex])
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false })
    this.props.onChange(options[index])
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const classes = this.props.classes

    if (this.props.disabled) return null

    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Type of the block"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Type of the block"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          style={{ width: 300 }}
        >
          {options.map((option, index) =>
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          )}
        </Menu>
      </div>
    )
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(SimpleListMenu)
